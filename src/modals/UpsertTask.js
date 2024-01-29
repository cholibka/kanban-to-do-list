import { useEffect, useRef, useState } from "react";
import Modal from "./Modal";
import Select from "react-select";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { ReactComponent as Save } from "../assets/check.svg";

export default function UpsertTask({
    onSubmit,
    isOpen,
    onClose,
    formData,
    setFormData,
    isNew,
}) {
    const [selected, setSelected] = useState();
    const focusInputRef = useRef(null);
    const formState = formData;
    useEffect(() => {
        if (isOpen && focusInputRef.current) {
            setTimeout(() => {
                focusInputRef.current.focus();
            }, 0);
        }
    }, [isOpen]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(formState);
        setFormData({
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
        setFormData((prevFormData) => ({
            ...prevFormData,
            date: dates,
        }));
    };

    const btnString = () => {
        if (isNew) return "Add new task";
        else return "Edit task";
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
                <p className="new-task-text">{btnString()}</p>
            </button>
        </Modal>
    );
}
