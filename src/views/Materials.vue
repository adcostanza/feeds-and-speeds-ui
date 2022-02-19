<template>
  <div>
    <v-toolbar color="primary" dark>
      <v-icon style="margin-right: 8px">mdi-cube</v-icon>
      <v-toolbar-title>Materials Configuration</v-toolbar-title>
    </v-toolbar>
    <v-card elevation="2">
      <v-expansion-panels>
        <v-expansion-panel
          v-for="(material, i) in Object.values(materials)"
          :key="i"
        >
          <v-expansion-panel-header
            >{{ material.name }}
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <material-form
              :material="material"
              :update-material="updateMaterial(material.name)"
              :delete-material="deleteMaterial(material.name)"
            />
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card>
    <v-card>
      <v-btn
        color="success"
        class="mr-4"
        @click="addNewMaterial"
        style="margin: 18px"
        ><v-icon>mdi-plus</v-icon>Add New Material</v-btn
      >
    </v-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { Material, materialsStore } from "@/utils/material";
import MaterialForm from "@/components/MaterialForm.vue";

@Component({ components: { MaterialForm } })
export default class Materials extends Vue {
  materials: Record<string, Material> = materialsStore.get().reduce(
    (acc, ea) => ({
      ...acc,
      [ea.name]: ea,
    }),
    {}
  );

  updateMaterial(name: string): (material: Material) => void {
    return (material: Material) => {
      if (material.name !== name) {
        delete this.materials[name];
      }
      this.materials = { ...this.materials, [material.name]: material };
    };
  }

  deleteMaterial(name: string): () => void {
    return () => {
      delete this.materials[name];
      this.materials = { ...this.materials };
    };
  }

  @Watch("materials", { deep: true })
  materialsUpdated(): void {
    materialsStore.set(Object.values(this.materials));
  }

  addNewMaterial() {
    this.materials = {
      ...this.materials,
      "New Material": { name: "New Material", kFactor: 10 },
    };
  }
}
</script>
