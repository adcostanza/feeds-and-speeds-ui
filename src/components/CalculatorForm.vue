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
        v-model.number="kFactor"
        :rules="[requiredRule('K Factor')]"
        label="K Factor"
        required
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
import { Calculator } from "@/utils/equations";

@Component
export default class CalculatorForm extends Vue {
  @Prop({ required: true }) calculator!: Calculator;
  @Prop({ required: true }) updateCalculator!: (calculator: Calculator) => void;
  @Prop({ required: true }) deleteCalculator!: () => void;

  name = "";
  kFactor = 10;

  created() {
    this.name = this.calculator.name;
    this.kFactor = this.calculator.kFactor;
  }

  valid = true;
  name = "";
  requiredRule(name: string) {
    return (v) => !!v || `${name} is required`;
  }

  validate() {
    //@ts-ignore
    this.$refs.form.validate();
    this.updateCalculator(new Calculator(this.name, this.kFactor));
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
