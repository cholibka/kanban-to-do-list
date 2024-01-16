import { Droppable, Draggable } from "react-beautiful-dnd";
import "./App.css";
import Card from "./Card";

export default function CardListElement({
    getListStyle,
    getItemStyle,
    droppableId,
    list,
}) {
    const formatString = (value) => {
        let str = value.replace(/([A-Z])/g, " $1").trim();
        str = str.charAt(0).toUpperCase() + str.slice(1);

        return str;
    };
    return (
        <div className="list-module">
            <p className="list-name">{formatString(droppableId)}</p>
            <Droppable droppableId={droppableId}>
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        style={getListStyle(snapshot.isDraggingOver)}
                    >
                        {list.map((item, index) => (
                            <Draggable
                                key={item.id}
                                draggableId={item.id}
                                index={index}
                            >
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        style={getItemStyle(
                                            snapshot.isDragging,
                                            provided.draggableProps.style,
                                            droppableId === "done"
                                                ? true
                                                : false
                                        )}
                                    >
                                        <Card
                                            content={item.content}
                                            who="xyz"
                                            isDone={
                                                droppableId === "done"
                                                    ? true
                                                    : false
                                            }
                                        />
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    );
}
