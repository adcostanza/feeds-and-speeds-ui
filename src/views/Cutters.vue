<template>
  <div>
    <v-toolbar color="primary" dark>
      <v-icon style="margin-right: 8px">mdi-cube</v-icon>
      <v-toolbar-title>Cutters Configuration</v-toolbar-title>
    </v-toolbar>
    <v-card elevation="2">
      <v-expansion-panels>
        <v-expansion-panel
          v-for="(cutter, i) in Object.values(cutters)"
          :key="i"
        >
          <v-expansion-panel-header
            >{{ cutter.name }}
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <cutter-form
              :cutter="cutter"
              :update-cutter="updateCutter(cutter.name)"
              :delete-cutter="deleteCutter(cutter.name)"
            />
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card>
    <v-card>
      <v-btn
        color="success"
        class="mr-4"
        @click="addNewCutter"
        style="margin: 18px"
        ><v-icon>mdi-plus</v-icon>Add New Cutter</v-btn
      >
    </v-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { Cutter, CutterMaterial, cuttersStore } from "@/utils/cutter";
import CutterForm from "@/components/CutterForm.vue";

@Component({ components: { CutterForm } })
export default class Cutters extends Vue {
  cutters: Record<string, Cutter> = cuttersStore.get().reduce(
    (acc, ea) => ({
      ...acc,
      [ea.name]: ea,
    }),
    {}
  );

  updateCutter(name: string): (cutter: Cutter) => void {
    return (cutter: Cutter) => {
      if (cutter.name !== name) {
        delete this.cutters[name];
      }
      this.cutters = { ...this.cutters, [cutter.name]: cutter };
    };
  }

  deleteCutter(name: string): () => void {
    return () => {
      delete this.cutters[name];
      this.cutters = { ...this.cutters };
    };
  }

  @Watch("cutters", { deep: true })
  cuttersUpdated(): void {
    cuttersStore.set(Object.values(this.cutters));
  }

  addNewCutter() {
    this.cutters = {
      ...this.cutters,
      "New Cutter": {
        name: "New Cutter",
        material: CutterMaterial.carbide,
        diameter: 0.25,
        length: 0.75,
        flutes: 3,
        shankDiameter: 0.25,
        overallStickout: 1,
      },
    };
  }
}
</script>
