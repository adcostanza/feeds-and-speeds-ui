<template>
  <div>
    <v-toolbar color="primary" dark>
      <v-icon style="margin-right: 8px">mdi-repeat-variant</v-icon>
      <v-toolbar-title>Optimizations Configuration</v-toolbar-title>
    </v-toolbar>
    <v-card elevation="2">
      <v-expansion-panels>
        <v-expansion-panel
          v-for="(optimization, i) in Object.values(optimizations)"
          :key="i"
        >
          <v-expansion-panel-header
            >{{ optimization.name }}
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <optimization-form
              :optimization="optimization"
              :update-optimization="updateOptimization(optimization.name)"
              :delete-optimization="deleteOptimization(optimization.name)"
              :potential-cutters="potentialCutters"
              :potential-materials="potentialMaterials"
            />
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card>
    <v-card>
      <v-btn
        color="success"
        class="mr-4"
        @click="addNewOptimization"
        style="margin: 18px"
        ><v-icon>mdi-plus</v-icon>Add New Optimization</v-btn
      >
    </v-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { Optimization, optimizationsStore } from "@/utils/optimization";
import OptimizationForm from "@/components/OptimizationForm.vue";
import { Machine, machineStore } from "@/utils/machine";
import { Material, materialsStore } from "@/utils/material";
import { Cutter, cuttersStore } from "@/utils/cutter";

@Component({ components: { OptimizationForm } })
export default class Optimizations extends Vue {
  optimizations: Record<string, Optimization> = optimizationsStore.get().reduce(
    (acc, ea) => ({
      ...acc,
      [ea.name]: ea,
    }),
    {}
  );

  defaultMachine: Machine = machineStore.get();
  potentialMaterials: Material[] = materialsStore.get();
  potentialCutters: Cutter[] = cuttersStore.get();

  get defaultMaterial() {
    return this.potentialMaterials[0];
  }

  get defaultCutter() {
    return this.potentialCutters[0];
  }

  updateOptimization(name: string): (optimization: Optimization) => void {
    return (optimization: Optimization) => {
      if (optimization.name !== name) {
        delete this.optimizations[name];
      }
      this.optimizations = {
        ...this.optimizations,
        [optimization.name]: optimization,
      };
    };
  }

  deleteOptimization(name: string): () => void {
    return () => {
      delete this.optimizations[name];
      this.optimizations = { ...this.optimizations };
    };
  }

  @Watch("optimizations", { deep: true })
  optimizationsUpdated(): void {
    optimizationsStore.set(Object.values(this.optimizations));
  }
  addNewOptimization() {
    this.optimizations = {
      ...this.optimizations,
      "New Optimization": {
        name: "New Optimization",
        machine: this.defaultMachine,
        cutter: this.defaultCutter,
        material: this.defaultMaterial,
        chipload: { min: 0.001, max: 0.005, count: 5 },
        woc: {
          min: this.defaultCutter.diameter * 0.01,
          max: this.defaultCutter.diameter * 1,
          count: 5,
        },
        doc: {
          min: this.defaultCutter.diameter * 0.01,
          max: this.defaultCutter.diameter * 2,
          count: 5,
        },
        constraints: [
          "machineForcePercent < 0.25",
          "availablePowerPercent < 0.25",
          "maxDeflectionPercent < 0.1",
          "feedrate < 180",
        ],
        rpm: 18000,
        maxAcceptableDeflection: 0.001,
      },
    };
  }
}
</script>
