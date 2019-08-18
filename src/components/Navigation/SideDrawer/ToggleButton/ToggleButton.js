import React from 'react'
import classes from './ToggleButton.module.css'

const toggleButton = (props) => (
    <div className={classes.ToggleButton} onClick={props.clicked}>
        <span/>
    </div>
)

export default toggleButton