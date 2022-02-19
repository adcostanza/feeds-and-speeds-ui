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
      @click="deleteMaterial"
      style="margin: 18px"
    >
      <v-icon>mdi-delete</v-icon>Delete
    </v-btn>
  </v-form>
</template>

<script lang="ts">
import Component from "vue-class-component";
import { Prop, Vue } from "vue-property-decorator";
import { Material } from "@/utils/material";

@Component
export default class MaterialForm extends Vue {
  @Prop({ required: true }) material!: Material;
  @Prop({ required: true }) updateMaterial!: (material: Material) => void;
  @Prop({ required: true }) deleteMaterial!: () => void;

  name = "";
  kFactor = 10;

  created() {
    this.name = this.material.name;
    this.kFactor = this.material.kFactor;
  }

  valid = true;
  name = "";
  requiredRule(name: string) {
    return (v) => !!v || `${name} is required`;
  }

  validate() {
    //@ts-ignore
    this.$refs.form.validate();
    this.updateMaterial({ name: this.name, kFactor: this.kFactor });
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
