import React from 'react'
import ChartSensor from './ChartSensor';
import AcelChart from './AcelChart';
import AcelDeg from './AcelDeg';
//<AcelChart/>
export default function Message() {
    return (
        <div>
            <p>Medidas de sensores</p>
            <ChartSensor/>
            <AcelChart/>
            <AcelDeg/>
            
            
        </div>
    )
}