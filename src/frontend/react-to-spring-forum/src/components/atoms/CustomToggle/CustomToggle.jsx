import React from 'react';
import s from "./style.module.css";
import {MoreHorizontal} from "lucide-react";

const CustomToggle = React.forwardRef(({ onClick }, ref) => (
    <button
        ref={ref}
        onClick={(e) => {
            e.stopPropagation();
            onClick(e);
        }}
        className={s.dropdownToggle}
    >
        <MoreHorizontal className={s.moreIcon} />
    </button>
));

export default CustomToggle;
