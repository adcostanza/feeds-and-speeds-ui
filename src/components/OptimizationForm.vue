<template>
  <div>
    <v-row>
      <v-col cols="12">
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="name"
            :rules="[(v) => !!v || 'Name is required']"
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
          <v-switch
            v-model="maximizeMMR"
            label="Maximize MMR"
            color="success"
            :disabled="true"
          ></v-switch>
          <v-textarea
            name="input-7-1"
            label="Constraints"
            v-model="constraints"
            hint="Separated by newline"
          ></v-textarea>
          <v-chip
            color="primary"
            v-for="constraint of constraints.split('\n')"
            :key="constraint"
            class="ma-2"
          >
            {{ constraint }}
          </v-chip>
          <v-text-field
            v-for="[key, field] of Object.entries(numberFields)"
            v-model="field.value"
            :rules="[requiredRule(field.name)]"
            :label="field.name"
            required
            :key="key"
          ></v-text-field>

          <v-btn
            :disabled="!valid"
            color="success"
            class="mr-4"
            @click="save"
            style="margin: 18px"
          >
            Save
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
    <v-row>
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th
                v-for="key of Object.keys(optimization.results[0])"
                :key="key"
                class="text-left"
              >
                {{ key }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="[i, result] of optimization.results.entries()" :key="i">
              <td
                v-for="[key, resultValue] of Object.entries(result)"
                :key="key"
              >
                {{ resultValue }}
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
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
import {
  executeOptimization,
  MinMaxField,
  Optimization,
} from "@/utils/optimization";

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
  maximizeMMR = true;
  constraints = "";

  minMaxFields: Record<string, MinMaxField> = {
    chipload: { name: "Chipload", min: 0.001, max: 0.001, count: 1 },
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
    this.constraints = this.optimization.constraints.join("\n");
    for (const numberField of Object.keys(this.numberFields)) {
      this.numberFields[numberField].value = this.optimization[numberField];
    }
    for (const minMaxField of Object.keys(this.minMaxFields)) {
      this.minMaxFields[minMaxField].min = this.optimization[minMaxField].min;
      this.minMaxFields[minMaxField].max = this.optimization[minMaxField].max;
      this.minMaxFields[minMaxField].count =
        this.optimization[minMaxField].count;
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
      } else {
        return true;
      }
    };
  }

  save() {
    //@ts-ignore
    this.$refs.form.validate();
    const results = executeOptimization({
      minMaxFields: this.minMaxFields,
      numberFields: this.numberFields,
      cutter: this.cutter,
      material: this.material,
      machine: this.machine,
      constraintStrings: this.constraints.split("\n"),
    });

    this.updateOptimization({
      name: this.name,
      machine: this.machine,
      cutter: this.cutter,
      material: this.material,
      chipload: { ...this.minMaxFields.chipload },
      woc: { ...this.minMaxFields.woc },
      doc: { ...this.minMaxFields.doc },
      constraints: this.constraints.split("\n"),
      rpm: this.numberFields.rpm.value,
      maxAcceptableDeflection: this.numberFields.maxAcceptableDeflection.value,
      results: results,
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
