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
import { Calculator, DefaultCalculators } from "@/utils/calculator";
import CalculatorForm from "@/components/CalculatorForm.vue";
import { DefaultMachine, Machine } from "@/utils/machine";
import { DefaultMaterials, Material } from "@/utils/material";
import { Cutter, DefaultCutters } from "@/utils/cutter";

@Component({ components: { CalculatorForm } })
export default class Calculators extends Vue {
  calculators: Record<string, Calculator> = DefaultCalculators.reduce(
    (acc, ea) => ({
      ...acc,
      [ea.name]: ea,
    }),
    {}
  );

  defaultMachine: Machine = null;
  defaultMaterial: Material = null;
  defaultCutter: Cutter = null;

  created() {
    const storedCalculators = localStorage.getItem("calculators");
    if (storedCalculators !== null) {
      this.calculators = JSON.parse(storedCalculators);
    } else {
      localStorage.setItem("calculators", JSON.stringify(this.calculators));
    }

    this.defaultMachine =
      JSON.parse(localStorage.getItem("machine")) || DefaultMachine;
    const storedMaterials = JSON.parse(localStorage.getItem("materials"));
    this.defaultMaterial = storedMaterials
      ? storedMaterials[0]
      : DefaultMaterials[0];
    const storedCutters = JSON.parse(localStorage.getItem("cutters"));
    this.defaultCutter = storedCutters ? storedCutters[0] : DefaultCutters[0];
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
    localStorage.setItem("calculators", JSON.stringify(this.calculators));
  }

  addNewCalculator() {
    console.log(this.defaultCutter);
    this.calculators = {
      ...this.calculators,
      "New Calculator": new Calculator(
        "New Calculator",
        this.defaultMachine,
        this.defaultCutter,
        this.defaultMaterial,
        0.002,
        this.defaultCutter.diameter * 0.5,
        this.defaultCutter.diameter * 2,
        18000,
        0.001
      ),
    };
  }
}
</script>
