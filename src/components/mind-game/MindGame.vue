<template>
  <b-row class="skeleton">
    <b-col sm="12" v-if="controller.stage === 0 || controller.stage === 2">
      <b-btn type="button" block  variant="outline-primary" @click="controller.startGame()">Начать</b-btn>
    </b-col>
    <b-col sm="12" v-if="controller.stage === 1">{{ controller.getTimer() }}</b-col>
    <b-col sm="12" v-if="controller.stage === 1">
      <b-row>
        <card v-for="i in itemsCount" :key="i" :pair-id="controller.getCardPair(i - 1)" :width="width" @click="controller.openCard(i - 1)"></card>
      </b-row>
    </b-col>
    <b-col sm="12" v-if="controller.stage === 2">
      <b-row>
        <b-col sm="12" v-if="!controller.saved">
          <b-form @submit.prevent="controller.saveToLeaderTable(name)">
            <b-input-group size="sm">
              <template v-slot:prepend>
                <b-input-group-text>Ваше имя:</b-input-group-text>
              </template>
              <b-input required autofocus v-model="name" />
              <b-input-group-addon>
                <b-input-group-text>{{ controller.getTimer() }}</b-input-group-text>
              </b-input-group-addon>
              <b-input-group-append>
                <b-btn type="submit" variant="success">Сохранить</b-btn>
              </b-input-group-append>
            </b-input-group>
          </b-form>
        </b-col>
      </b-row>
      <b-row v-for="item, i in controller.getLeaderTable()" :key="i">
        <b-col sm="6">
          <p>{{ item.name }}</p>
        </b-col>
        <b-col sm="6" align="right">
          <p>{{ item.time }}</p>
        </b-col>
      </b-row>
    </b-col>
  </b-row>
</template>

<script lang="ts">
  import { Component, Vue } from 'nuxt-property-decorator';
  import Card from '~/components/mind-game/Card.vue';
  import GameController from '~/components/mind-game/GameController';
  import GameStore from '~/components/mind-game/GameStore';
  import MemoryStore from '~/components/mind-game/MemoryStore';

  @Component({
    props: {
      height: {
        type: Number,
        default: 6
      },
      width: {
        type: Number,
        default: 6
      },
      storeType: {
        type: String,
        default: 'memory'
      },
    },
    components: {
      Card
    }
  })
  export default class MindGame extends Vue {
    width!: number;
    height!: number;
    itemsCount: number;
    storeType!: 'memory';
    controller: GameController<GameStore>;
    name: string = '';

    constructor() {
      super();
      switch (this.storeType) {
        case 'memory':
          this.controller = new GameController<MemoryStore>(new MemoryStore(this.width, this.height));
          break;
      }
      this.itemsCount = this.controller.getCardsAmount();
    }

    forceUpdate(): void {
      if (this.controller.stage === 1) {
        this.$forceUpdate();
      }
      setTimeout(() => this.forceUpdate(), 50);
    }

    mounted()  {
      setTimeout(() => this.forceUpdate(), 50)
    }
  }
</script>

<style>
  .skeleton > div {
    padding: 10px 0;
  }
</style>
