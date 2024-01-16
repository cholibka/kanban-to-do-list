// fake data generator
export const getItems = (count, offset = 0) =>
    Array.from({ length: count }, (v, k) => k).map((k) => ({
        id: `item-${k + offset}`,
        content: `item ${k + offset}`,
    }));

export const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
};

export const move = (
    source,
    destination,
    droppableSource,
    droppableDestination
) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
};

const grid = 8;

export const getItemStyle = (isDragging, draggableStyle, isDone) => ({
    userSelect: "none",
    padding: grid * 2,
    margin: `0 0 1svh 0`,
    background: isDragging ? "#e1e1e1" : isDone ? "#dbdbdb" : "#ececec",
    minHeight: "90px",
    maxHeight: "120px",
    borderRadius: 20,
    boxShadow: "0.1svw 0.1svh 0.1svw 0.1svh rgba(0, 0, 0, .2)",
    ...draggableStyle,
    height: isDragging ? "120px" : isDone ? "90px" : "90px",
});

export const getListStyle = (isDraggingOver) => ({
    background: isDraggingOver ? "#f6f6f6" : "white",
    marginRight: "2svw",
    marginBottom: "5svh",
    borderRadius: 5,
    padding: "2svw",
    boxShadow: "1svw 1svh 2svw 0.5svh rgba(0, 0, 255, .2)",
    display: "flex",
    flex: "1 1 auto",
    flexDirection: "column",
    overflow: "scroll",
    overflowY: "auto",
    overflowX: "hidden",
});
