// @ts-ignore
import React from "react";
import './style.css'

const Button = (props:any) => {
    return (
        <div>
        <button data-cy={props.datacy} onClick={props.onClick? props.onClick: ""} className={props.class}>
            {props.text}
        </button>
        </div>
    )
} 

export default Button