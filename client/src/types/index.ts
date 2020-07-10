export enum WidgetTypes {
  time = "time",
  joke = "joke",
  leaderboard = "leaderboard",
  celebrity = "celebrity",
  balances = "balances",
  bear_faucet = "bear_faucet",
  bear_transfer = "bear_transfer",
  audio_player = "audio_player",
}

export const ItemTypes = {
  BOX: "BOX",
  TRACK: "TRACK",
  WIDGET: "WIDGET",
};

export interface DragItem {
  type: string;
  id: string;
  top: number;
  left: number;
}

export enum ACTIONS {
  dragAndDropFile = "drag and drop file",
  selectFromFolder = "select from folder",
  //   selectFromLibrary = "select from library",
}
