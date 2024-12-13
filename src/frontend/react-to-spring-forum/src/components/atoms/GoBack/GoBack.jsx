import { ArrowLeft } from 'lucide-react';
import {useNavigate} from "react-router-dom";
import s from './style.module.css';

function GoBack() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(-1);
    }

    return (
        <button onClick={handleClick} className={s.button}>
            <ArrowLeft size={28} strokeWidth={1.75} />
        </button>
    );
}

export default GoBack;