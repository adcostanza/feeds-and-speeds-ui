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
import { DefaultCutters, Cutter, CutterMaterial } from "@/utils/cutter";
import CutterForm from "@/components/CutterForm.vue";

@Component({ components: { CutterForm } })
export default class Cutters extends Vue {
  cutters: Record<string, Cutter> = DefaultCutters.reduce(
    (acc, ea) => ({
      ...acc,
      [ea.name]: ea,
    }),
    {}
  );

  created() {
    const storedCutters = localStorage.getItem("cutters");
    if (storedCutters !== null) {
      this.cutters = JSON.parse(storedCutters);
    } else {
      localStorage.setItem("cutters", JSON.stringify(this.cutters));
    }
  }

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
    localStorage.setItem("cutters", JSON.stringify(this.cutters));
  }

  addNewCutter() {
    this.cutters = {
      ...this.cutters,
      "New Cutter": new Cutter(
        "New Cutter",
        CutterMaterial.carbide,
        0.25,
        0.75,
        3,
        0.25,
        1
      ),
    };
  }
}
</script>
