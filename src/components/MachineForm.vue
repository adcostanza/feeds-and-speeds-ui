<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-card elevation="2" style="margin-bottom: 18px">
      <v-card-title>Machine Configuration</v-card-title>
      <div style="padding: 20px; padding-top: 0px">
        <v-text-field
          v-model="machine.name"
          :counter="10"
          :rules="nameRules"
          label="Name"
          required
        ></v-text-field>

        <v-text-field
          v-model.number="machine.maximumMachineForce"
          :rules="emailRules"
          label="Maximum Machine Force (lbf)"
          required
        ></v-text-field>
      </div>
    </v-card>
    <v-card elevation="2" style="margin-bottom: 18px">
      <v-card-title>Router Configuration</v-card-title>
      <div style="padding: 20px; padding-top: 0px">
        <v-text-field
          v-model.number="machine.router.inputVoltage"
          :counter="10"
          :rules="nameRules"
          label="Input Voltage"
          required
        ></v-text-field>
        <v-text-field
          v-model.number="machine.router.inputCurrent"
          :counter="10"
          :rules="nameRules"
          label="Input Current"
          required
        ></v-text-field>
        <v-text-field
          v-model.number="machine.router.efficiency"
          :counter="10"
          :rules="nameRules"
          label="Efficiency"
          required
        ></v-text-field>
        <v-text-field
          v-model.number="machine.router.ratedSpeed"
          :counter="10"
          :rules="nameRules"
          label="Rated Speed"
          required
        ></v-text-field>
      </div>
    </v-card>
    <v-card elevation="2">
      <v-btn
        :disabled="!valid"
        color="success"
        class="mr-4"
        @click="validate"
        style="margin: 18px"
      >
        Submit
      </v-btn>

      <!--      <v-btn color="error" class="mr-4" @click="reset"> Reset Form </v-btn>-->

      <!--      <v-btn color="warning" @click="resetValidation"> Reset Validation </v-btn>-->
    </v-card>
  </v-form>
</template>

<script lang="ts">
import Component from "vue-class-component";
import { Vue } from "vue-property-decorator";
import { DefaultMachine, Machine } from "@/utils/machine";

@Component
export default class MachineForm extends Vue {
  public machine: Machine = DefaultMachine;

  valid = true;
  name = "";
  nameRules = [
    (v) => !!v || "Name is required",
    (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
  ];
  email = "";
  emailRules = [
    (v) => !!v || "E-mail is required",
    (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
  ];
  select = null;
  items = ["Item 1", "Item 2", "Item 3", "Item 4"];
  checkbox = false;

  validate() {
    //@ts-ignore
    this.$refs.form.validate();
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
