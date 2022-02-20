<template>
  <div>
    <v-toolbar color="primary" dark>
      <v-icon style="margin-right: 8px">mdi-cog</v-icon>
      <v-toolbar-title>Settings</v-toolbar-title>
    </v-toolbar>
    <v-card>
      <v-btn color="success" class="mr-4" @click="download" style="margin: 18px"
        ><v-icon>mdi-download</v-icon>Download Settings File</v-btn
      >
      <v-btn color="success" class="mr-4" @click="upload" style="margin: 18px"
        ><v-icon>mdi-upload</v-icon>Upload Settings File</v-btn
      >
      <v-btn color="error" class="mr-4" @click="clear" style="margin: 18px"
        ><v-icon>mdi-close-circle-outline</v-icon>Clear Settings</v-btn
      >
    </v-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Settings extends Vue {
  keys = ["machine", "cutters", "materials", "calculators", "optimizations"];
  download() {
    const data = this.keys.reduce(
      (acc, key) => ({ ...acc, [key]: localStorage.getItem(key) }),
      {}
    );

    this.downloadAsFile(
      JSON.stringify(data),
      "feeds-and-speeds.json",
      "text/plain"
    );
  }

  downloadAsFile(content: string, fileName: string, contentType: string) {
    const a = document.createElement("a");
    const file = new Blob([content], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
  }

  clear() {
    for (const key of this.keys) {
      localStorage.removeItem(key);
    }
  }

  upload() {
    console.log("nada");
  }
}
</script>
