<template>
  <equations />
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Equations from "@/components/Equations.vue";

@Component({ components: { Equations } })
export default class Calculator extends Vue {}
</script>
