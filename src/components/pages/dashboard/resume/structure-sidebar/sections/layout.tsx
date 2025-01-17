"use client";

import {Columns3} from "lucide-react";
import {useFieldArray, useFormContext} from "react-hook-form";
import {DragDropContext, DropResult, Droppable} from "@hello-pangea/dnd";
import SectionTitle from "@/components/shared/section-title";
import {LayoutDragList} from "../layout-drag-list";

export const LayoutSection = () => {
  const {control} = useFormContext<ResumeData>();

  const {
    fields: mainFields,
    move: moveMainField,
    insert: insertMainField,
    remove: removeMainField,
  } = useFieldArray({
    control,
    name: "structure.layout.mainSections",
  });

  const {
    fields: sidebarFields,
    move: moveSidebarField,
    insert: insertSidebarField,
    remove: removeSidebarField,
  } = useFieldArray({
    control,
    name: "structure.layout.sidebarSections",
  });

  const onDragEnd = ({source, destination}: DropResult) => {
    if (!destination) return;

    if (source.droppableId !== destination.droppableId) {
      switch (destination.droppableId) {
        case "mainFields":
          insertMainField(destination.index, sidebarFields[source.index]);
          removeSidebarField(source.index);
          break;
        case "sidebarFields":
          insertSidebarField(destination.index, mainFields[source.index]);
          removeMainField(source.index);
          break;
      }

      return;
    }

    if (source.droppableId === "mainFields") {
      moveMainField(source.index, destination.index);
    } else {
      moveSidebarField(source.index, destination.index);
    }
  };

  return (
    <div>
      <SectionTitle title="Structure" icon={Columns3} />

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <Droppable droppableId="mainFields">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                <LayoutDragList title="Main" fields={mainFields} />
                {provided.placeholder}
              </div>
            )}
          </Droppable>

          <Droppable droppableId="sidebarFields">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                <LayoutDragList title="Sidebar" fields={sidebarFields} />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>
    </div>
  );
};
