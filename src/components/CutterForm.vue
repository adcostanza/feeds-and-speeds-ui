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
import { Cutter } from "@/utils/cutter";

@Component
export default class CutterForm extends Vue {
  @Prop({ required: true }) cutter!: Cutter;
  @Prop({ required: true }) updateCutter!: (cutter: Cutter) => void;
  @Prop({ required: true }) deleteCutter!: () => void;

  valid = true;
  name = "New Cutter";

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

  created() {
    this.name = this.cutter.name;
    this.machine = this.cutter.machine;
    this.cutter = this.cutter.cutter;
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
    this.updateCutter(
      new Cutter(
        this.name,
        this.machine,
        this.cutter,
        this.material,
        this.numberFields.chipload,
        this.numberFields.woc,
        this.numberFields.doc,
        this.numberFields.rpm,
        this.numberFields.maxAcceptableDeflection
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
