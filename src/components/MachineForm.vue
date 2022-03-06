<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-toolbar color="primary" dark>
      <v-icon style="margin-right: 8px">mdi-robot</v-icon>
      <v-toolbar-title>Machine Configuration</v-toolbar-title>
    </v-toolbar>
    <v-card elevation="2" style="margin-bottom: 18px">
      <v-card-title>Machine</v-card-title>
      <div style="padding: 20px; padding-top: 0px">
        <v-text-field
          v-model="machine.name"
          :rules="[requiredRule('Name')]"
          label="Name"
          required
        ></v-text-field>

        <v-text-field
          v-model.number="machine.maximumMachineForce"
          :rules="[requiredRule('Maximum Machine Force')]"
          label="Maximum Machine Force (lbf)"
          required
        ></v-text-field>
      </div>
    </v-card>
    <v-card elevation="2" style="margin-bottom: 18px">
      <v-card-title>Router</v-card-title>
      <div style="padding: 20px; padding-top: 0px">
        <v-text-field
          v-model.number="machine.router.inputVoltage"
          :rules="[requiredRule('Input Voltage')]"
          label="Input Voltage (V)"
          required
        ></v-text-field>
        <v-text-field
          v-model.number="machine.router.inputCurrent"
          :rules="[requiredRule('Input Current')]"
          label="Input Current (A)"
          required
        ></v-text-field>
        <v-text-field
          v-model.number="machine.router.efficiency"
          :rules="[requiredRule('Efficiency')]"
          label="Efficiency (Decimal)"
          required
        ></v-text-field>
        <v-text-field
          v-model.number="machine.router.ratedSpeed"
          :rules="[requiredRule('Rated Speed')]"
          label="Rated Speed (RPM)"
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
      <v-btn color="success" class="mr-4" @click="clear" style="margin: 18px">
        Clear to Default
      </v-btn>

      <!--      <v-btn color="error" class="mr-4" @click="reset"> Reset Form </v-btn>-->

      <!--      <v-btn color="warning" @click="resetValidation"> Reset Validation </v-btn>-->
    </v-card>
  </v-form>
</template>

<script lang="ts">
import Component from "vue-class-component";
import { Vue } from "vue-property-decorator";
import { Machine, machineStore } from "@/utils/machine";

@Component
export default class MachineForm extends Vue {
  public machine: Machine = machineStore.get();

  valid = true;
  name = "";

  requiredRule(name: string) {
    return (v) => !!v || `${name} is required`;
  }

  validate() {
    //@ts-ignore
    this.$refs.form.validate();
    machineStore.set(this.machine);
  }

  clear() {
    machineStore.clear();
    this.machine = machineStore.get();
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
