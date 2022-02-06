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
        v-for="numberField of numberFields"
        v-model.number="numberField.property"
        :rules="[requiredRule(numberField.name)]"
        :label="numberField.name"
        required
        :key="numberField.property"
      ></v-text-field>
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
import { DefaultMachine, Machine } from "@/utils/machine";
import { Cutter, DefaultCutters } from "@/utils/cutter";
import { DefaultMaterials, Material } from "@/utils/material";

@Component
export default class CalculatorForm extends Vue {
  @Prop({ required: true }) calculator!: Calculator;
  @Prop({ required: true }) updateCalculator!: (calculator: Calculator) => void;
  @Prop({ required: true }) deleteCalculator!: () => void;

  valid = true;
  name = "New Calculator";
  machine: Machine = DefaultMachine;
  cutter: Cutter = DefaultCutters[0];
  material: Material = DefaultMaterials[0];

  numberFields = [
    { property: "chipload", name: "Chipload" },
    { property: "woc", name: "Width of Cut" },
    { property: "doc", name: "Depth of Cut" },
    { property: "rpm", name: "RPM" },
    {
      property: "maxAcceptableDeflection",
      name: "Maximum Acceptable Deflection %",
    },
  ];

  created() {
    this.name = this.calculator.name;
    this.machine = this.calculator.machine;
    this.cutter = this.calculator.cutter;
    for (const numberField of this.numberFields) {
      this[numberField.property] = this.calculator[numberField.property];
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
        this.chipload,
        this.woc,
        this.doc,
        this.rpm,
        this.maxAcceptableDeflection
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
