import "../css/Widget.css";

import { ItemTypes, WidgetTypes } from "../../types";
import React, { useEffect, useState } from "react";

import TypeGameLogin from './Typing Game/login';
import LyricTypingGame from './Lyric Game/Game';

import { CelebrityWidget } from "./CelebrityWidget";
import { JokeWidget } from "./JokeWidget";
import { useDrag } from "react-dnd";

export interface IWidgetProps {
  type: WidgetTypes;
  top: number;
  left: number;
  id: string;
}

export const Widget = (props: IWidgetProps) => {
  const { top, left, id, type } = props;

  const [, drag] = useDrag({
    item: { id, left, top, type: ItemTypes.WIDGET },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      className="widget-container"
      style={{
        left,
        top,
      }}
    >
      {renderWidget(type)}
    </div>
  );
};

const renderWidget = (type: WidgetTypes) => {
  switch (type) {
    case WidgetTypes.time:
      return <WidgetTime />;
    case WidgetTypes.joke:
      return <JokeWidget />;
    case WidgetTypes.celebrity:
      return <CelebrityWidget />;
    case WidgetTypes.typegame:
      return <TypeGame/>;
    case WidgetTypes.lyricgame:
      return <LyricTypingGame/>;
    // add widget case here for new widget types
    default:
      return null;
  }
};

// example widget

const WidgetTime = () => {
  const [time, setTime] = useState("");

  useEffect(() => {
    setInterval(() => {
      const newTime = getFormattedTime();
      setTime(newTime);
    }, 100);
  }, []);

  return (
    <div>
      The time is <div>{time}</div>
    </div>
  );
};

const getFormattedTime = (): string => {
  const newDate = new Date(Date.now());

  return `${newDate.getHours()}:${newDate
    .getMinutes()
    .toString()
    .padStart(2, "0")}:${newDate
    .getSeconds()

    .toString()
    .padStart(2, "0")}:${newDate
    .getMilliseconds()

    .toString()
    .padStart(2, "0")}`;
};

const TypeGame = () => {
  return <TypeGameLogin/>
}

