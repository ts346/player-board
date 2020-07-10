export enum WidgetTypes {
  time = "time",
  joke = "joke",
<<<<<<< HEAD
  celebrity = "celebrity",
  typegame = "multiplayer typing game",
  lyricgame = "lyric game",
  graphicmodel = "3D model"
=======
  leaderboard = "leaderboard",
  celebrity = "celebrity",
>>>>>>> 19d631964ae8cc6dde5c4d43e7ad988bd8fc5abf
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
