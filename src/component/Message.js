import React from 'react'
import Chart_sensor from './ChartSensor';
import Acel_chart from './AcelChart';
//
export default function Message() {
    return (
        <div>
            <p>Medidas de sensores</p>
            <ChartSensor/>
            <AcelChart/>
            
            
        </div>
    )
}