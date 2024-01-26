import { useEffect, useRef, useState } from "react";
import "../App.css";
import { ReactComponent as Close } from "../assets/close.svg";

const Modal = ({ isOpen, onClose, children }) => {
    const [isModalOpen, setModalOpen] = useState(isOpen);
    const modalRef = useRef(null);

    useEffect(() => {
        setModalOpen(isOpen);
    }, [isOpen]);

    useEffect(() => {
        const modalElement = modalRef.current;
        if (modalElement) {
            if (isModalOpen) modalElement.showModal();
            else modalElement.close();
        }
    }, [isModalOpen]);

    const handleCloseModal = () => {
        if (onClose) {
            onClose();
        }
        setModalOpen(false);
    };

    const handleKeyDown = (event) => {
        if (event.key === "Escape") {
            handleCloseModal();
        }
    };

    return (
        <dialog ref={modalRef} onKeyDown={handleKeyDown} className="modal">
            <button className="link-btn right-btn" onClick={handleCloseModal}>
                <Close />
            </button>
            {children}
        </dialog>
    );
};
export default Modal;
