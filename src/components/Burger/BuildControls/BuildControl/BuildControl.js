import React from 'react'
import classes from './BuildControl.module.css';

const buildControl = (props) => {
    const classesLess = [classes.Button, classes.Less].join(' ')
    const classesMore = [classes.Button, classes.More].join(' ')
    return (
        <div className={classes.BuildControl}>
            <div className={classes.Label}>{props.label}</div>
            <button className={classesLess} onClick={props.removed} disabled={props.disabled}>Less</button>
            <button className={classesMore} onClick={props.added}>More</button>
        </div>
    )
}

export default buildControl