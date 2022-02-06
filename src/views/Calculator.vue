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
import { DefaultCalculators, Calculator } from "@/utils/calculator";
import CalculatorForm from "@/components/CalculatorForm.vue";

@Component({ components: { CalculatorForm } })
export default class Calculators extends Vue {
  calculators: Record<string, Calculator> = DefaultCalculators.reduce(
    (acc, ea) => ({
      ...acc,
      [ea.name]: ea,
    }),
    {}
  );

  created() {
    const storedCalculators = localStorage.getItem("calculators");
    if (storedCalculators !== null) {
      this.calculators = JSON.parse(storedCalculators);
    } else {
      localStorage.setItem("calculators", JSON.stringify(this.calculators));
    }
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
    this.calculators = {
      ...this.calculators,
      "New Calculator": new Calculator("New Calculator", 10),
    };
  }
}
</script>
