<template>
    <b-col :sm="2" :style="{ width: (100 / width) + ' %' }">
      <div class="card-placeholder">
        <b-btn v-if="pairId !== -1" @click="$emit('click')" block size="sm" :variant="pairId ? 'success' : null"><b-icon :icon="ICONS[pairId]" /></b-btn>
      </div>
    </b-col>
</template>

<script lang="ts">
  import { Component, Vue } from 'nuxt-property-decorator';

  @Component({
    props: {
      pairId: {
        type: Number
      },
      width: {
        type: Number,
        default: 6
      },
    }
  })
  export default class Card extends Vue {
    width!: number;
    pairId!: Number;
    ICONS = [
      'question',
      'alarm',
      'archive',
      'at',
      'award',
      'bag',
      'bar-chart',
      'battery-charging',
      'bell',
      'book-half',
      'bookmark',
      'briefcase-fill',
      'brush',
      'bucket',
      'building',
      'calendar',
      'camera',
      'camera-video',
      'lock',
    ];
  }
</script>

<style>
  .card-placeholder {
    padding: 15px 0;
    display: block;
    height: 61px;
  }
</style>
