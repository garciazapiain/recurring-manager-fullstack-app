// @ts-ignore
import React from "react";
import './style.css'

const Button = (props:any) => {
    console.log(props)
    return (
        <div>
        <button onClick={props.onClick? props.onClick: ""} className={props.class}>
            {props.text}
        </button>
        </div>
    )
} 

export default Button