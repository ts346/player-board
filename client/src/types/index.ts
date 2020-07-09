export enum WidgetTypes {
  time = "time",
  joke = "joke",
  celebrity = "celebrity",
  typegame = "multiplayer typing game",
  lyricgame = "lyric game"
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
