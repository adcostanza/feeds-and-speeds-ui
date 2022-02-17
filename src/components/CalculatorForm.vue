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
              <th class="text-left">Value</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="numberField of Object.keys(computedNumberFields)"
              :key="numberField"
            >
              <td>{{ computedNumberFields[numberField].name }}</td>
              <td>{{ computedNumberFields[numberField].value }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
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
import { Calculator } from "@/utils/calculator";
import { Machine } from "@/utils/machine";
import { Cutter } from "@/utils/cutter";
import { Material } from "@/utils/material";

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
  get calculatorInstance() {
    return new Calculator(
      this.calculator.name,
      this.calculator.machine,
      this.calculator.cutter,
      this.calculator.material,
      this.calculator.chipload,
      this.calculator.woc,
      this.calculator.doc,
      this.calculator.rpm,
      this.calculator.maxAcceptableDeflection
    );
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
        value: this.calculatorInstance.maxDeflection,
      },
      woc: { name: "Width of Cut", value: 0 },
      doc: { name: "Depth of Cut", value: 0 },
      rpm: { name: "RPM", value: 0 },
      maxAcceptableDeflection: {
        name: "Maximum Acceptable Deflection %",
        value: 0,
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
