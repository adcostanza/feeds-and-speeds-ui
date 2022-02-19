<template>
  <div>
    <v-toolbar color="primary" dark>
      <v-icon style="margin-right: 8px">mdi-calculator</v-icon>
      <v-toolbar-title>Calculators Configuration</v-toolbar-title>
    </v-toolbar>
    <v-card elevation="2">
      <v-expansion-panels>
        <v-expansion-panel
          v-for="(calculator, i) in Object.values(calculators)"
          :key="i"
        >
          <v-expansion-panel-header
            >{{ calculator.name }}
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <calculator-form
              :calculator="calculator"
              :update-calculator="updateCalculator(calculator.name)"
              :delete-calculator="deleteCalculator(calculator.name)"
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
        @click="addNewCalculator"
        style="margin: 18px"
        ><v-icon>mdi-plus</v-icon>Add New Calculator</v-btn
      >
    </v-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { Calculator, calculatorsStore } from "@/utils/calculator";
import CalculatorForm from "@/components/CalculatorForm.vue";
import { Machine, machineStore } from "@/utils/machine";
import { Material, materialsStore } from "@/utils/material";
import { Cutter, cuttersStore } from "@/utils/cutter";

@Component({ components: { CalculatorForm } })
export default class Calculators extends Vue {
  calculators: Record<string, Calculator> = calculatorsStore.get().reduce(
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

  updateCalculator(name: string): (calculator: Calculator) => void {
    return (calculator: Calculator) => {
      if (calculator.name !== name) {
        delete this.calculators[name];
      }
      this.calculators = { ...this.calculators, [calculator.name]: calculator };
    };
  }

  deleteCalculator(name: string): () => void {
    return () => {
      delete this.calculators[name];
      this.calculators = { ...this.calculators };
    };
  }

  @Watch("calculators", { deep: true })
  calculatorsUpdated(): void {
    calculatorsStore.set(Object.values(this.calculators));
  }

  addNewCalculator() {
    this.calculators = {
      ...this.calculators,
      "New Calculator": {
        name: "New Calculator",
        machine: this.defaultMachine,
        cutter: this.defaultCutter,
        material: this.defaultMaterial,
        chipload: 0.002,
        woc: this.defaultCutter.diameter * 0.5,
        doc: this.defaultCutter.diameter * 2,
        rpm: 18000,
        maxAcceptableDeflection: 0.001,
      },
    };
  }
}
</script>
