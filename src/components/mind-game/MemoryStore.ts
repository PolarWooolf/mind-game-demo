import { GameStage } from '~/components/mind-game/GameController';
import GameStore, { LeaderTableItem } from '~/components/mind-game/GameStore';

export default class MemoryStore extends GameStore {
  private gameBoard: number[] = []; // an array with pair IDs
  private openedCards: number[] = [];
  startTime: Date = new Date();
  endTime?: Date;
  timeoutId?: NodeJS.Timeout;
  constructor(public width: number, public height: number) {
    super(width, height);
  }
  restoreStage(): GameStage {
    return GameStage.PREGAME;
  }
  createGameBoard(): void {
    this.gameBoard = [];
    for (let i = 1; i <= this.getCardsAmount() / 2; i++) {
      this.gameBoard.push(Math.floor(i));
      this.gameBoard.push(Math.floor(i));
    }
    // for (let i = 1; i <= this.getCardsAmount() / 2 - 1; i++) {
    //   this.gameBoard.push(Math.floor(-1));
    //   this.gameBoard.push(Math.floor(-1));
    // }
    // this.gameBoard.push(Math.floor(1));
    // this.gameBoard.push(Math.floor(1));
    MemoryStore.shuffle(this.gameBoard);
    this.startTime = new Date();
    this.endTime = undefined;
  }
  private static shuffle<T>(arr: T[]): void {
    for (let i = arr.length - 1; i >= 0; i--) {
      const randomElement = Math.floor(Math.random() * (i + 1));
      const tmpVal = arr[i];
      arr[i] = arr[randomElement];
      arr[randomElement] = tmpVal;
    }
  }
  getCardPair(id: number): number {
    if (this.gameBoard[id] === -1) {
      return -1;
    }
    // if (this.openedCards.indexOf(id) < 0) {
    //   return 0;
    // }
    return this.gameBoard[id];
  }
  openCard(id: number, showTime: number): void {
    if (this.openedCards.length > 1 || this.openedCards.indexOf(id) >= 0) {
      return;
    }
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
    this.openedCards.push(id);
    this.timeoutId = setTimeout(() => this.closeCards(), showTime * 1000 + 1);
    if (this.openedCards.length === 1) {
      return;
    }
    if (this.gameBoard[id] !== this.gameBoard[this.openedCards[0]]) {
      return;
    }
    setTimeout(() => this.removeCards(), showTime * 1000, this);
    if (this.isGameFinished()) {
      this.endTime = new Date();
    }
  }
  private removeCards() {
    this.openedCards.forEach(id => (this.gameBoard[id] = -1));
    this.openedCards = [];
  }
  private closeCards() {
    this.openedCards = [];
  }
  isGameFinished(): boolean {
    for (let i = 0; i < this.gameBoard.length; i++) {
      if (this.gameBoard[i] !== -1 && this.openedCards.indexOf(i) === -1) {
        return false;
      }
    }
    return true;
  }
  getLeaderTable(): LeaderTableItem[] {
    if (!window || !window.localStorage) {
      return [];
    }
    return JSON.parse(window.localStorage.getItem('mindGameLeaderTable') || '[]');
  }

  saveToLeaderTable(name: string): void {
    const leaderTable: LeaderTableItem[] = this.getLeaderTable();
    leaderTable.push({
      name,
      time: this.getTimer(),
    });
    leaderTable.sort((a: LeaderTableItem, b: LeaderTableItem) => {
      const timeA = parseInt(a.time.split(':')[0], 10) * 60 + parseInt(a.time.split(':')[1], 10);
      const timeB = parseInt(b.time.split(':')[0], 10) * 60 + parseInt(b.time.split(':')[1], 10);
      return timeA - timeB;
    });
    window.localStorage.setItem('mindGameLeaderTable', JSON.stringify(leaderTable));
  }
}
