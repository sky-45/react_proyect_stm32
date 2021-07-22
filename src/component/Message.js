import React from 'react'
import Chart_sensor from './Chart_sensor';
import Acel_chart from './Acel_chart';
//
export default function Message() {
    return (
        <div>
            <p>Medidas de sensores</p>
            <Chart_sensor/>
            <Acel_chart/>
            
            
        </div>
    )
}