<template>
  <div>
    <v-toolbar color="primary" dark>
      <v-icon style="margin-right:8px">mdi-cube</v-icon>
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
            />
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { DefaultMaterials, Material } from "@/utils/material";
import MaterialForm from "@/components/MaterialForm.vue";

@Component({ components: { MaterialForm } })
export default class Materials extends Vue {
  materials: Record<string, Material> = DefaultMaterials.reduce(
    (acc, ea) => ({
      ...acc,
      [ea.name]: ea,
    }),
    {}
  );

  created() {
    const storedMaterials = localStorage.getItem("materials");
    if (storedMaterials !== null) {
      this.materials = JSON.parse(storedMaterials);
    } else {
      localStorage.setItem("materials", JSON.stringify(this.materials));
    }
  }

  updateMaterial(name: string): (material: Material) => void {
    return (material: Material) => {
      if (material.name !== name) {
        delete this.materials[name];
      }
      this.materials = { ...this.materials, [material.name]: material };
    };
  }

  @Watch("materials", { deep: true })
  materialsUpdated(): void {
    localStorage.setItem("materials", JSON.stringify(this.materials));
  }
}
</script>
