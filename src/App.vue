<template>
  <v-app id="inspire">
    <v-system-bar app>
      <v-spacer></v-spacer>

      <v-icon>mdi-square</v-icon>

      <v-icon>mdi-circle</v-icon>

      <v-icon>mdi-triangle</v-icon>
    </v-system-bar>

    <v-navigation-drawer v-model="drawer" app>
      <v-sheet color="grey lighten-4" class="pa-4">
        <v-list-item-title class="text-h6">Feeds & Speeds</v-list-item-title>
      </v-sheet>

      <v-divider></v-divider>

      <v-list nav dense>
        <v-list-item-group v-model="selectedItem" color="primary">
          <v-list-item v-for="(item, i) in items" :key="i" :to="item.to">
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container class="py-8 px-6" fluid>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class extends Vue {
  cards = ["Today", "Yesterday"];
  drawer = null;
  items = [
    { text: "Machine", icon: "mdi-robot", to: "/" },
    { text: "Materials", icon: "mdi-cube", to: "/materials" },
    { text: "Cutters", icon: "mdi-saw-blade", to: "/cutters" },
    { text: "Calculator", icon: "mdi-calculator", to: "/calculator" },
    { text: "Optimization", icon: "mdi-repeat-variant", to: "/optimization" },
    { text: "Settings", icon: "mdi-cog", to: "/settings" },
  ];
  selectedItem = "";
}
</script>
