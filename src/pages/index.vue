<template>
  <b-row>
    <b-col sm="12" md="6" offset-md="3" lg="4" offset-lg="4">
      <mind-game />
    </b-col>
  </b-row>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

import MindGame from '~/components/mind-game/MindGame.vue';

@Component({
  components: {
    MindGame,
  },
})
export default class extends Vue {}
</script>

<style>
</style>
