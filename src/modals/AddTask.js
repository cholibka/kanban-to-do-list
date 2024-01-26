import { useEffect, useRef, useState } from "react";
import Modal from "./Modal";
import Select from "react-select";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { ReactComponent as Save } from "../assets/check.svg";

export default function AddTask({ onSubmit, isOpen, onClose }) {
    const [selected, setSelected] = useState();
    const focusInputRef = useRef(null);
    const [formState, setFormState] = useState({
        name: "",
        who: null,
        date: null,
    });

    useEffect(() => {
        if (isOpen && focusInputRef.current) {
            setTimeout(() => {
                focusInputRef.current.focus();
            }, 0);
        }
    }, [isOpen]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormState((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(formState);
        setFormState({
            name: "",
            who: null,
            date: null,
        });
    };

    const options = [
        { value: "chocolate", label: "Chocolate" },
        { value: "strawberry", label: "Strawberry" },
        { value: "vanilla", label: "Vanilla" },
    ];

    const chooseWeek = (week, dates) => {
        setSelected(dates);
        setFormState((prevFormData) => ({
            ...prevFormData,
            date: dates,
        }));
    };
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <label htmlFor="name">Task</label>
            <input
                ref={focusInputRef}
                id="name"
                name="name"
                value={formState.name}
                onChange={handleInputChange}
                required
                className="input-txt"
                placeholder="Task name..."
            />
            <label htmlFor="name">Assignee</label>
            <Select options={options} name="name" id="name" />
            <label htmlFor="date">Week</label>
            <DayPicker
                ISOWeek
                showOutsideDays
                showWeekNumber
                selected={selected}
                onWeekNumberClick={chooseWeek}
                id="date"
                name="date"
                styles={{
                    caption_label: { zIndex: -1 },
                }}
            />
            <button
                className="link-btn task-btn right-btn"
                onClick={handleSubmit}
            >
                <Save />
                <p className="new-task-text">Add new task</p>
            </button>
        </Modal>
    );
}
