import { GameStage } from '~/components/mind-game/GameController';

export interface LeaderTableItem {
  name: string;
  time: string;
}

export default abstract class GameStore {
  startTime: Date = new Date();
  endTime?: Date;

  protected constructor(public width: number, public height: number) {}
  abstract restoreStage(): GameStage;
  abstract createGameBoard(): void;
  abstract getCardPair(id: number): number;
  abstract openCard(id: number, showTime: number): void;
  abstract isGameFinished(): boolean;
  getCardsAmount() {
    return Math.floor((this.width * this.height) / 2) * 2;
  }
  getTimer(): string {
    const dateDiff = Math.floor(
      ((this.endTime || new Date()).getTime() - this.startTime.getTime()) / 1000,
    );
    const seconds = dateDiff % 60;
    return Math.floor(dateDiff / 60) + ':' + (seconds < 10 ? '0' : '') + seconds;
  }
  abstract getLeaderTable(): LeaderTableItem[];
  abstract saveToLeaderTable(name: string): void;
}
