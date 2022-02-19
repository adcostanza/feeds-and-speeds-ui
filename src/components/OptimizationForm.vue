<template>
  <div>
    <v-row>
      <v-col cols="6">
        <v-form ref="form" v-model="valid" lazy-validation>
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
            return-object
          ></v-select>
          <v-select
            v-model="material"
            :items="potentialMaterials"
            item-text="name"
            label="Material"
            return-object
          ></v-select>
          <v-row
            v-for="[key, field] of Object.entries(minMaxFields)"
            :key="key"
          >
            <v-col cols="4"
              ><v-text-field
                :label="`${field.name} (Min)`"
                v-model="minMaxFields[key].min"
                :rules="[requiredRule('Min')]"
              ></v-text-field
            ></v-col>
            <v-col cols="4">
              <v-text-field
                :label="`${field.name} (Max)`"
                v-model="minMaxFields[key].max"
                :rules="[requiredRule('Max')]"
              ></v-text-field
            ></v-col>
            <v-col cols="4">
              <v-text-field
                :label="`${field.name} (Count)`"
                v-model="minMaxFields[key].count"
                :rules="[requiredRule('Count')]"
              ></v-text-field
            ></v-col>
          </v-row>
          <v-text-field
            v-for="[key, field] of Object.entries(numberFields)"
            v-model="field.value"
            :rules="[requiredRule(field.name)]"
            :label="field.name"
            required
            :key="key"
          ></v-text-field>
          <v-switch
            v-model="showEquations"
            label="Show Equations"
            color="success"
            hide-details
          ></v-switch>
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
            @click="deleteOptimization"
            style="margin: 18px"
          >
            <v-icon>mdi-delete</v-icon>Delete
          </v-btn>
        </v-form>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import Component from "vue-class-component";
import { Prop, Vue } from "vue-property-decorator";
import { Machine } from "@/utils/machine";
import { Cutter } from "@/utils/cutter";
import { Material } from "@/utils/material";
import { decimalNumber } from "@/utils/directives";
import { Optimization } from "@/utils/optimization";

@Component({ directives: { decimalNumber } })
export default class OptimizationForm extends Vue {
  @Prop({ required: true }) optimization!: Optimization;
  @Prop({ required: true }) potentialCutters!: Cutter[];
  @Prop({ required: true }) potentialMaterials!: Material[];
  @Prop({ required: true }) updateOptimization!: (
    optimization: Optimization
  ) => void;
  @Prop({ required: true }) deleteOptimization!: () => void;

  valid = true;
  name = "New Optimization";
  machine: Machine = null;
  cutter: Cutter = null;
  material: Material = null;
  allMath = {};
  allValues = {};

  minMaxFields = {
    chipload: { name: "Chipload", min: 0, max: 0, count: 1 },
    woc: { name: "Width of Cut", min: 0, max: 0, count: 1 },
    doc: { name: "Depth of Cut", min: 0, max: 0, count: 1 },
  };
  numberFields = {
    rpm: { name: "RPM", value: 0 },
    maxAcceptableDeflection: {
      name: "Maximum Acceptable Deflection %",
      value: 0,
    },
  };

  created() {
    //@ts-ignore
    this.name = this.optimization.name;
    this.machine = this.optimization.machine;
    this.cutter = this.optimization.cutter;
    this.material = this.optimization.material;
    for (const numberField of Object.keys(this.numberFields)) {
      this.numberFields[numberField].value = this.optimization[numberField];
    }
  }

  requiredRule(name: string) {
    return (v) => {
      if (v === "") {
        return `${name} is required`;
      } else if (isNaN(v) || isNaN(parseFloat(v))) {
        return `${name} must be a number`;
      } else if (v < 0) {
        return `${name} must be positive`;
      }
    };
  }

  validate() {
    //@ts-ignore
    this.$refs.form.validate();
    this.updateOptimization({
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
