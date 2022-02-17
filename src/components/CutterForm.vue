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
        v-model="material"
        :items="materials"
        item-text="state"
        item-value="abbr"
        label="Select"
        persistent-hint
        return-object
        single-line
      ></v-select>

      <v-text-field
        v-for="numberField of Object.keys(numberFields)"
        v-model.number="numberFields[numberField].value"
        :rules="[requiredRule(numberFields[numberField].name)]"
        :label="numberFields[numberField].name"
        required
        :key="numberFields[numberField].name"
      ></v-text-field>
      <v-text-field
        v-model.number="youngsModulus"
        :disabled="true"
        label="Young's Modulus"
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
      @click="deleteCutter"
      style="margin: 18px"
    >
      <v-icon>mdi-delete</v-icon>Delete
    </v-btn>
  </v-form>
</template>

<script lang="ts">
import Component from "vue-class-component";
import { Prop, Vue } from "vue-property-decorator";
import { Cutter, CutterMaterial, getYoungsModulus } from "@/utils/cutter";

@Component
export default class CutterForm extends Vue {
  @Prop({ required: true }) cutter!: Cutter;
  @Prop({ required: true }) updateCutter!: (cutter: Cutter) => void;
  @Prop({ required: true }) deleteCutter!: () => void;

  valid = true;
  name = "New Cutter";
  material = CutterMaterial.carbide;
  materials = Object.values(CutterMaterial);

  numberFields = {
    diameter: { name: "Diameter", value: 0 },
    length: { name: "Flute Length", value: 0 },
    flutes: { name: "Number of Flutes", value: 0 },
    shankDiameter: { name: "Shank Diameter", value: 0 },
    overallStickout: {
      name: "Overall Stickout",
      value: 0,
    },
  };

  get youngsModulus() {
    return getYoungsModulus(this.material);
  }
  created() {
    this.name = this.cutter.name;
    this.material = this.cutter.material;
    for (const numberField of Object.keys(this.numberFields)) {
      this.numberFields[numberField].value = this.cutter[numberField];
    }
  }

  requiredRule(name: string) {
    return (v) => !!v || `${name} is required`;
  }

  validate() {
    //@ts-ignore
    this.$refs.form.validate();
    this.updateCutter({
      name: this.name,
      material: this.material,
      diameter: this.numberFields.diameter.value,
      length: this.numberFields.length.value,
      flutes: this.numberFields.flutes.value,
      shankDiameter: this.numberFields.shankDiameter.value,
      overallStickout: this.numberFields.overallStickout.value,
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
