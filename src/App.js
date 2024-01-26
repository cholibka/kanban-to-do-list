import React, { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import {
    getItems,
    reorder,
    move,
    getListStyle,
    getItemStyle,
} from "./functions";
import CardListElement from "./CardListElement";
import "./App.css";
import { ReactComponent as Left } from "./assets/chevron-left.svg";
import { ReactComponent as Right } from "./assets/chevron-right.svg";
import { ReactComponent as Add } from "./assets/add.svg";
import AddTask from "./modals/AddTask";

export default function App() {
    const [toDo, setToDo] = useState(getItems(10));
    const [doing, setDoing] = useState(getItems(10, 10));
    const [done, setDone] = useState(getItems(10, 20));
    const [date, setDate] = useState(new Date());
    const [isAddTaskOpen, setAddTaskOpen] = useState(false);
    const [addTaskFormData, setAddTaskFormData] = useState({
        name: "",
        who: null,
        date: null,
    });
    const [startDate, setStartDate] = useState(
        new Date(
            new Date().setDate(date.getDate() - date.getDay() + 1)
        ).toDateString()
    );
    const [endDate, setEndDate] = useState(
        new Date(
            new Date().setDate(date.getDate() - date.getDay() + 7)
        ).toDateString()
    );
    const listNames = ["toDo", "doing", "done"];

    const droppableList = {
        toDo: toDo,
        doing: doing,
        done: done,
    };

    const getList = (id) => droppableList[id];

    const onDragEnd = (result) => {
        const { source, destination } = result;

        // dropped outside the list
        if (!destination) {
            return;
        }

        if (source.droppableId === destination.droppableId) {
            const items = reorder(
                getList(source.droppableId),
                source.index,
                destination.index
            );

            let state = items;

            if (source.droppableId === listNames[0]) setToDo(state);
            else if (source.droppableId === listNames[1]) setDoing(state);
            else setDone(state);
        } else {
            const result = move(
                getList(source.droppableId),
                getList(destination.droppableId),
                source,
                destination
            );

            if (source.droppableId === listNames[0]) setToDo(result.toDo);
            else if (source.droppableId === listNames[1])
                setDoing(result.doing);
            else setDone(result.done);

            if (destination.droppableId === listNames[0]) setToDo(result.toDo);
            else if (destination.droppableId === listNames[1])
                setDoing(result.doing);
            else setDone(result.done);
        }
    };

    const ChangeDate = (direction) => {
        let current = new Date();

        console.log(date);
        if (direction === -1) current = date.setDate(date.getDate() - 7);
        else current = date.setDate(date.getDate() + 7);

        current = new Date(current);
        setDate(current);

        setStartDate(
            new Date(
                new Date().setDate(current.getDate() - current.getDay() + 1)
            ).toDateString()
        );
        setEndDate(
            new Date(
                new Date().setDate(current.getDate() - current.getDay() + 7)
            ).toDateString()
        );
    };

    const printDate = () => {
        return `${startDate} - ${endDate}`;
    };

    const handleOpenAddTaskModal = () => {
        setAddTaskOpen(true);
    };

    const handleCloseAddTaskModal = () => {
        setAddTaskOpen(false);
    };
    const handleFormSubmit = (data) => {
        setAddTaskFormData(data);
        handleCloseAddTaskModal();
    };
    return (
        <>
            <AddTask
                isOpen={isAddTaskOpen}
                onSubmit={handleFormSubmit}
                onClose={handleCloseAddTaskModal}
            />
            <div className="options-div">
                <div className="date-options">
                    <Left onClick={() => ChangeDate(-1)} />
                    <p className="date-text">{printDate()}</p>
                    <Right onClick={() => ChangeDate(1)} />
                </div>
                <button
                    className="link-btn task-btn"
                    onClick={handleOpenAddTaskModal}
                >
                    <p className="new-task-text">Add new task</p>
                    <Add />
                </button>
            </div>
            <div className="main-div">
                <DragDropContext onDragEnd={onDragEnd}>
                    {listNames.map((element) => (
                        <CardListElement
                            getItemStyle={getItemStyle}
                            getListStyle={getListStyle}
                            droppableId={element}
                            list={droppableList[element]}
                            key={element}
                        />
                    ))}
                </DragDropContext>
            </div>
        </>
    );
}
