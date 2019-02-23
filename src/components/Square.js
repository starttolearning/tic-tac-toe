import React from 'react'

const Square = (props) => (< button className={props.winnerColored} onClick={props.onClick}> {props.value}</button >)

export default Square;