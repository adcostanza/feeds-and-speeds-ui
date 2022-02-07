<template>
  <MachineForm />
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import MachineForm from "@/components/MachineForm.vue";

@Component({
  components: { MachineForm },
})
export default class Machine extends Vue {}
</script>
