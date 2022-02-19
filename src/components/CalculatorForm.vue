<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <div style="padding: 20px; padding-top: 0px">
      <v-text-field
        v-model="name"
        :rules="[requiredRule('Name')]"
        label="Name"
        required
      ></v-text-field>
      <v-select
        v-model="machine"
        :items="[machine]"
        item-text="name"
        label="Machine"
        :disabled="true"
      ></v-select>
      <v-select
        v-model="cutter"
        :items="potentialCutters"
        item-text="name"
        label="Cutter"
      ></v-select>
      <v-select
        v-model="material"
        :items="potentialMaterials"
        item-text="name"
        label="Material"
      ></v-select>
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
              <th class="text-left">Value</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="[key, value] of Object.entries(allValues)" :key="key">
              <td>{{ key }}</td>
              <td>
                <div
                  v-katex="asTex(key)"
                  style="font-size: 16pt; padding: 4px"
                ></div>
              </td>
              <td>
                {{ value }}
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
<!--      <div-->
<!--        v-katex="subbed('maxDeflectionPercent')"-->
<!--        style="font-size: 16pt; padding: 4px"-->
<!--      ></div>-->
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
import { allMathStrings, Calculator, fullySubbed } from "@/utils/calculator";
import { getOutputPower, Machine } from "@/utils/machine";
import { Cutter, getYoungsModulus } from "@/utils/cutter";
import { Material } from "@/utils/material";
import nerdamer from "nerdamer";

@Component
export default class CalculatorForm extends Vue {
  @Prop({ required: true }) calculator!: Calculator;
  @Prop({ required: true }) potentialCutters!: Cutter[];
  @Prop({ required: true }) potentialMaterials!: Material[];
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
    const subsFromInputs = {
      chipload: this.numberFields.chipload.value.toString(),
      woc: this.numberFields.woc.value.toString(),
      doc: this.numberFields.doc.value.toString(),
      rpm: this.numberFields.rpm.value.toString(),
      maxAcceptableDeflection:
        this.numberFields.maxAcceptableDeflection.value.toString(),
      cutterDiameter: this.cutter.diameter,
      materialKFactor: this.material.kFactor,
      cutterFlutes: this.cutter.flutes,
      maximumMachineForce: this.machine.maximumMachineForce,
      routerOutputPower: getOutputPower(this.machine.router),
      cutterOverallStickout: this.cutter.overallStickout,
      cutterYoungsModulus: getYoungsModulus(this.cutter.material),
    };

    const subbedWithInputs = Object.entries(this.allMath).reduce(
      (acc, [key, math]) => {
        return {
          ...acc,
          //@ts-ignore
          [key]: nerdamer(math, subsFromInputs).evaluate(),
        };
      },
      {}
    );

    const subbedWithOutputs = Object.entries(subbedWithInputs).reduce(
      (acc, [key, math]) => {
        return {
          ...acc,
          //@ts-ignore
          [key]: Number(nerdamer(math, acc).evaluate()),
        };
      },
      {}
    );

    return subbedWithOutputs;
  }

  asTex(key: string) {
    return nerdamer(this.allMath[key]).toTeX();
  }

  subbed(key: string) {
    //@ts-ignore
    return nerdamer(fullySubbed(key, this.allMath)).toTeX();
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

  created() {
    //@ts-ignore
    this.name = this.calculator.name;
    this.machine = this.calculator.machine;
    this.cutter = this.calculator.cutter;
    this.material = this.calculator.material;
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
    this.updateCalculator({
      name: this.name,
      machine: this.machine,
      cutter: this.cutter,
      material: this.material,
      chipload: this.numberFields.chipload.value,
      woc: this.numberFields.woc.value,
      doc: this.numberFields.doc.value,
      rpm: this.numberFields.rpm.value,
      maxAcceptableDeflection: this.numberFields.maxAcceptableDeflection.value,
    });
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
