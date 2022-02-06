<template>
  <div>
    <v-toolbar color="primary" dark>
      <v-icon style="margin-right: 8px">mdi-cog</v-icon>
      <v-toolbar-title>Settings</v-toolbar-title>
    </v-toolbar>
    <v-card>
      <v-btn
        color="success"
        class="mr-4"
        @click="addNewMaterial"
        style="margin: 18px"
        ><v-icon>mdi-download</v-icon>Download Settings File</v-btn
      >
      <v-btn
        color="success"
        class="mr-4"
        @click="addNewMaterial"
        style="margin: 18px"
      ><v-icon>mdi-upload</v-icon>Upload Settings File</v-btn
      >
    </v-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { DefaultMaterials, Material } from "@/utils/material";
import MaterialForm from "@/components/MaterialForm.vue";

@Component
export default class Settings extends Vue {}
</script>
