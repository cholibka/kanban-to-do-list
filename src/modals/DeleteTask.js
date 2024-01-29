import Modal from "./Modal";
import "react-day-picker/dist/style.css";
import { ReactComponent as Delete } from "../assets/delete.svg";
import { ReactComponent as LeftArrow } from "../assets/arrow-uturn-left.svg";

export default function DeleteTask({ onSubmit, isOpen, onClose, formData }) {
    const formState = formData;

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(formState);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <label>
                Deleting task <b>{formData.name}</b>
            </label>
            <p>
                Are you sure you want to delete task <b>{formData.name}</b>{" "}
                doing by <b>{formData.who}</b> date range <b>{formData.date}</b>
                ?
            </p>
            <button
                className="link-btn task-btn right-btn"
                onClick={handleSubmit}
            >
                <Delete />
                <p className="new-task-text"> Delete</p>
            </button>
            <button className="link-btn task-btn right-btn" onClick={onClose}>
                <LeftArrow />
                <p className="new-task-text"> Cancel</p>
            </button>
        </Modal>
    );
}
