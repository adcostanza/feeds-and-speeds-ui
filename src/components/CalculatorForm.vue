<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <div style="padding: 20px; padding-top: 0px">
      <v-text-field
        v-model="name"
        :rules="[requiredRule('Name')]"
        label="Name"
        required
      ></v-text-field>

      <v-text-field
        v-for="numberField of Object.keys(numberFields)"
        v-model.number="numberFields[numberField].value"
        :rules="[requiredRule(numberFields[numberField].name)]"
        :label="numberFields[numberField].name"
        required
        :key="numberField"
      ></v-text-field>
      <v-simple-table>
        <template v-slot:default>
          <thead>
          <tr>
            <th class="text-left">Calculation</th>
            <th class="text-left">Equation</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="[key, value] of Object.entries(allValues)" :key="key">
            <td>{{ key }}</td>
            <td>
              {{ value }}
            </td>
          </tr>
          </tbody>
        </template>
      </v-simple-table>
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Calculation</th>
              <th class="text-left">Equation</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="key of Object.keys(allMath)" :key="key">
              <td>{{ key }}</td>
              <td>
                <div
                  v-katex="asTex(key)"
                  style="font-size: 16pt; padding: 4px"
                ></div>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
      <div
        v-katex="subbed('maxDeflectionPercent')"
        style="font-size: 16pt; padding: 4px"
      ></div>
    </div>
    <v-btn
      :disabled="!valid"
      color="success"
      class="mr-4"
      @click="validate"
      style="margin: 18px"
    >
      Submit
    </v-btn>
    <v-btn
      color="error"
      class="mr-4"
      @click="deleteCalculator"
      style="margin: 18px"
    >
      <v-icon>mdi-delete</v-icon>Delete
    </v-btn>
  </v-form>
</template>

<script lang="ts">
import Component from "vue-class-component";
import { Prop, Vue } from "vue-property-decorator";
import {
  allMathStrings,
  Calculator,
  fullySubbed,
  maxDeflection,
} from "@/utils/calculator";
import { Machine } from "@/utils/machine";
import { Cutter } from "@/utils/cutter";
import { Material } from "@/utils/material";
import nerdamer from "nerdamer";

@Component
export default class CalculatorForm extends Vue {
  @Prop({ required: true }) calculator!: Calculator;
  @Prop({ required: true }) updateCalculator!: (calculator: Calculator) => void;
  @Prop({ required: true }) deleteCalculator!: () => void;

  valid = true;
  name = "New Calculator";
  machine: Machine = null;
  cutter: Cutter = null;
  material: Material = null;

  get allMath() {
    return allMathStrings(
      this.numberFields.woc.value,
      this.cutter.diameter,
      this.cutter.shankDiameter
    );
  }

  get allValues() {
    const subs = {
      chipload: this.numberFields.chipload.value.toString(),
      woc: this.numberFields.woc.value.toString(),
      doc: this.numberFields.doc.value.toString(),
      rpm: this.numberFields.rpm.value.toString(),
      maxAcceptableDeflection:
        this.numberFields.maxAcceptableDeflection.value.toString(),
      cutterDiameter: this.cutter.diameter,
      materialKFactor: this.material.kFactor,
    };
    const subbed = Object.entries(this.allMath).reduce((acc, [key, math]) => {
      return {
        ...acc,
        [key]: nerdamer(math, subs).evaluate(),
      };
    }, {});

    console.log(subbed);
    return subbed;
  }

  asTex(key: string) {
    return nerdamer(this.allMath[key]).toTeX();
  }

  subbed(key: string) {
    //@ts-ignore
    return nerdamer(fullySubbed(key, this.allMath)).toTeX();
  }

  get calculatorInstance(): Calculator {
    if (this.machine && this.cutter && this.material) {
      return new Calculator(
        this.name,
        this.machine,
        this.cutter,
        this.material,
        this.numberFields.chipload.value,
        this.numberFields.woc.value,
        this.numberFields.doc.value,
        this.numberFields.rpm.value,
        this.numberFields.maxAcceptableDeflection.value
      );
    } else {
      return null;
    }
  }

  numberFields = {
    chipload: { name: "Chipload", value: 0 },
    woc: { name: "Width of Cut", value: 0 },
    doc: { name: "Depth of Cut", value: 0 },
    rpm: { name: "RPM", value: 0 },
    maxAcceptableDeflection: {
      name: "Maximum Acceptable Deflection %",
      value: 0,
    },
  };

  get computedNumberFields() {
    return {
      max_deflection: {
        name: "Max Deflection",
        value: this.calculatorInstance?.maxDeflection || null,
      },
    };
  }

  created() {
    //@ts-ignore
    this.name = this.calculator.name;
    this.machine = this.calculator.machine;
    this.cutter = this.calculator.cutter;
    for (const numberField of Object.keys(this.numberFields)) {
      this.numberFields[numberField].value = this.calculator[numberField];
    }
  }

  requiredRule(name: string) {
    return (v) => !!v || `${name} is required`;
  }

  validate() {
    //@ts-ignore
    this.$refs.form.validate();
    this.updateCalculator(
      new Calculator(
        this.name,
        this.machine,
        this.cutter,
        this.material,
        this.numberFields.chipload.value,
        this.numberFields.woc.value,
        this.numberFields.doc.value,
        this.numberFields.rpm.value,
        this.numberFields.maxAcceptableDeflection.value
      )
    );
  }

  reset() {
    //@ts-ignore
    this.$refs.form.reset();
  }
  resetValidation() {
    //@ts-ignore
    this.$refs.form.resetValidation();
  }
}
</script>
