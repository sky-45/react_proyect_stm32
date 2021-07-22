import React from 'react'
import axios from 'axios';
import Plotly from "plotly.js"
import createPlotlyComponent from 'react-plotly.js/factory';

const Plot = createPlotlyComponent(Plotly);
class ChartSensor extends React.Component {    
  
  state = {
    line1: {
      x: [],
      y: [],
      name: 'Line 1',
      fill: 'tozeroy',
    },
    layout: {
      datarevision: 0,
      width: 1200, height: 300, 
      yaxis: { autorange: false, range: [0, 4] },
      title: 'Voltaje medido por el ADC',
    },
    revision: 0,
  }
  componentDidMount() {
    setInterval(this.increaseGraphic, 800);
  } 

  increaseGraphic = () => { 
    const { line1, layout, revision } = this.state;
    //axios.get('http://127.0.0.1:8000/last_adc')
    axios.get('https://sensor-ms-fastapi.herokuapp.com/last_adc')
    //axios.get('https://sensor-ms-fastapi.herokuapp.com/rand_continue_adc')
    
      .then(res => {
        const persons = res.data;
        const temp_chk = persons["datetime"];
        //console.log(temp_chk+"aaa")
        var now_date = new Date();
        var now_time = now_date.toISOString();
        
        this.state.line1.x.push(now_time);
        this.state.line1.y.push((persons["value"]*3.3)/255);
        //this.state.line1.y.push(persons["value"]);
        
        try{
          const temp = this.state.line1.x.length;
         if(temp > 5){
            this.state.line1.x.shift();
            this.state.line1.y.shift();
          }
        }catch(e){
          //console.log(e);
        }
      })
    this.setState({ revision: this.state.revision + 1 });
    layout.datarevision = this.state.revision + 1;
  }

    render() {
      return (
        <div>
          <Plot
          data={[
                this.state.line1,
          ]}
          layout={this.state.layout}
        />
        <div id="myDiv"></div>
        </div>

      );// end return
    }
  }
  
export default ChartSensor;

