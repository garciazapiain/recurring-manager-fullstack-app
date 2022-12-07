// @ts-ignore
import React from "react";
import './style.css'

const Button = (props:any) => {
    return (
        <div>
        <button onClick={props.onClick? props.onClick: ""} className="button-generic">
            {props.text}
        </button>
        </div>
    )
} 

export default Button