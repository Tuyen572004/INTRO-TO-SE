import s from "./style.module.css";
import Spinner from "react-bootstrap/Spinner";

function Loading() {
    return (
        <div className={s.loading_container}>
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </div>
    )
}

export default Loading;