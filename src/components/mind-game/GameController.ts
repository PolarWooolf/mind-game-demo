import GameStore from '~/components/mind-game/GameStore';

export enum GameStage {
  PREGAME,
  STARTED,
  ENDED,
}

const SHOW_OPENED_CARD_TIME = 5; // TODO make configurable

export default class GameController<T extends GameStore> {
  private store: T;
  stage: GameStage;
  saved: boolean = false;
  constructor(store: T) {
    this.store = store;
    this.stage = store.restoreStage();
  }
  startGame() {
    if (this.stage !== GameStage.PREGAME && this.stage !== GameStage.ENDED) {
      throw new IllegalGameStateException();
    }
    this.stage = GameStage.STARTED;
    this.store.createGameBoard();
    this.saved = false;
  }
  openCard(id: number) {
    if (this.stage !== GameStage.STARTED) {
      throw new IllegalGameStateException();
    }
    this.store.openCard(id, SHOW_OPENED_CARD_TIME);
    if (this.store.isGameFinished()) {
      setTimeout(() => (this.stage = GameStage.ENDED), SHOW_OPENED_CARD_TIME * 1000);
    }
  }
  saveToLeaderTable(name: string) {
    if (this.stage !== GameStage.ENDED || this.saved) {
      throw new IllegalGameStateException();
    }
    this.store.saveToLeaderTable(name);
    this.saved = true;
  }
  getTimer() {
    return this.store.getTimer();
  }
  getCardPair(id: number) {
    return this.store.getCardPair(id);
  }
  getLeaderTable() {
    return this.store.getLeaderTable();
  }
  getCardsAmount() {
    return this.store.getCardsAmount();
  }
}

// tslint:disable-next-line:max-classes-per-file
export class IllegalGameStateException extends Error {}
