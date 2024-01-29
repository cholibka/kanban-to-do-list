import "./App.css";
import { ReactComponent as Face } from "./assets/face.svg";
import { ReactComponent as Delete } from "./assets/delete.svg";
import { ReactComponent as Edit } from "./assets/edit.svg";
import { useState } from "react";
import UpsertTask from "./modals/UpsertTask";
import DeleteTask from "./modals/DeleteTask";

export default function Card({ content, who, isDone, date }) {
    const [isEditTaskOpen, setEditTaskOpen] = useState(false);
    const [isDeleteTaskOpen, setDeleteTaskOpen] = useState(false);
    const [editTaskFormData, setEditTaskFormData] = useState({
        name: content,
        who: who,
        date: date,
    });

    const handleOpenEditTaskModal = () => {
        setEditTaskOpen(true);
    };

    const handleCloseEditTaskModal = () => {
        setEditTaskOpen(false);
    };
    const handleEditFormSubmit = (data) => {
        setEditTaskFormData(data);
        handleCloseEditTaskModal();
    };

    const handleOpenDeleteTaskModal = () => {
        setDeleteTaskOpen(true);
    };

    const handleCloseDeleteTaskModal = () => {
        setDeleteTaskOpen(false);
    };
    const handleDeleteFormSubmit = (data) => {
        handleCloseDeleteTaskModal();
    };

    return (
        <>
            <UpsertTask
                isOpen={isEditTaskOpen}
                onSubmit={handleEditFormSubmit}
                onClose={handleCloseEditTaskModal}
                formData={editTaskFormData}
                setFormData={setEditTaskFormData}
                isNew={false}
            />
            <DeleteTask
                isOpen={isDeleteTaskOpen}
                onSubmit={handleDeleteFormSubmit}
                onClose={handleCloseDeleteTaskModal}
                formData={editTaskFormData}
            />
            <div className="card-item">
                <div
                    className={
                        isDone
                            ? "svg-done card-action-buttons"
                            : "card-action-buttons"
                    }
                >
                    <button
                        className="link-btn card-btn"
                        onClick={(!isDone && handleOpenEditTaskModal) || null}
                    >
                        <Edit />
                    </button>
                    <button
                        className="link-btn card-btn"
                        onClick={(!isDone && handleOpenDeleteTaskModal) || null}
                    >
                        <Delete />
                    </button>
                </div>
                <p
                    className={
                        isDone
                            ? "text-line card-done-text card-content-text"
                            : "card-content-text"
                    }
                >
                    {content}
                </p>
                <div className="card-content-assigment">
                    <Face className={isDone ? "svg-done" : null} />
                    <p
                        className={
                            isDone
                                ? "card-assigment-text card-done-text"
                                : "card-assigment-text"
                        }
                    >
                        {who}
                    </p>
                </div>
            </div>
        </>
    );
}
