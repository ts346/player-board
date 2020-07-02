import React, { useEffect, useState } from "react";
import { Button, Drawer } from "@material-ui/core";
import { useDrop, XYCoord } from "react-dnd";
import { WidgetTypes, ItemTypes, DragItem } from "../types";
import { IWidgetProps, Widget } from "./Widgets/Widget";
import { AdventureLogo } from "./AdventureLogo";
import { WidgetButton } from "./WidgetButton";
import update from "immutability-helper";
import { v4 as uuidv4 } from "uuid";

enum drawerTypes {
  widgets = "widgets",
}

export const Board: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerType, setDrawerType] = useState<drawerTypes | null>(null);
  const [widgets, setWidgets] = useState<{ [key: string]: IWidgetProps }>({});

  useEffect(() => {
    setIsDrawerOpen(!!drawerType);
  }, [drawerType]);

  const moveWidget = (id: string, left: number, top: number) => {
    setWidgets(
      update(widgets, {
        [id]: {
          $merge: { left, top },
        },
      })
    );
  };

  const onClickWidgetItem = (type: WidgetTypes) => () => {
    const newWidgetId = uuidv4();

    const newWidgets: {
      [key: string]: IWidgetProps;
    } = {
      [newWidgetId]: {
        id: newWidgetId,
        type,
        top: 0,
        left: 0,
      },
    };

    setWidgets(update(widgets, { $merge: newWidgets }));
  };

  const renderDrawerContent = () => {
    if (drawerType === drawerTypes.widgets) {
      return (
        <div>
          <div
            className="library-item"
            onClick={onClickWidgetItem(WidgetTypes.time)}
          >
            time
          </div>
          <div
            className="library-item"
            onClick={onClickWidgetItem(WidgetTypes.joke)}
          >
            joke
          </div>
        </div>
      );
    }
  };

  const [, drop] = useDrop({
    accept: [ItemTypes.WIDGET],
    drop(item: DragItem, monitor) {
      const delta = monitor.getDifferenceFromInitialOffset() as XYCoord;
      if (!delta) return;
      const left = Math.round(item.left + delta.x);
      const top = Math.round(item.top + delta.y);

      if (item.type === ItemTypes.WIDGET) {
        moveWidget(item.id, left, top);
      }

      return undefined;
    },
  });

  return (
    <div
      ref={drop}
      style={{
        display: "flex",
        width: "100%",
        minHeight: "100vh",
        position: "relative",
        flexDirection: "column",
      }}
    >
      <AdventureLogo
        widget={
          <WidgetButton onClick={() => setDrawerType(drawerTypes.widgets)} />
        }
      />

      {Object.values(widgets).map((widget, index) => {
        return <Widget key={widget.id} {...widget} />;
      })}

      <Drawer
        variant="persistent"
        anchor="right"
        open={isDrawerOpen}
        onClose={() => setDrawerType(null)}
      >
        <div style={{ width: 400, padding: 10 }}>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button
              style={{
                minWidth: 20,
                color: "red",
              }}
              variant="contained"
              onClick={() => setDrawerType(null)}
            >
              x
            </Button>
          </div>
          {renderDrawerContent()}
        </div>
      </Drawer>
    </div>
  );
};
