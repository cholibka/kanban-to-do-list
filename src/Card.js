import "./App.css";
import { ReactComponent as Face } from "./assets/face.svg";
import { ReactComponent as Delete } from "./assets/delete.svg";
import { ReactComponent as Edit } from "./assets/edit.svg";

export default function Card({ content, who, isDone }) {
    return (
        <div className="card-item">
            <div
                className={
                    isDone
                        ? "svg-done card-action-buttons"
                        : "card-action-buttons"
                }
            >
                <button className="link-btn card-btn">
                    <Edit />
                </button>
                <button className="link-btn card-btn">
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
    );
}
