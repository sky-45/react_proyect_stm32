import React from 'react'
import axios from 'axios';
import Plotly from "plotly.js"
import createPlotlyComponent from 'react-plotly.js/factory';

const Plot = createPlotlyComponent(Plotly);

class AcelChart extends React.Component {    
  
  state = {
    line1: {
      x: [],
      y: [],
      name: 'Line 1',
      //fill: 'tozeroy',
    },
    line2: {
        x: [],
        y: [],
        name: 'Line 1',
        //fill: 'tozeroy',
      },
      line3: {
        x: [],
        y: [],
        name: 'Line 1',
        //fill: 'tozeroy',
      },
        
    layout: {
      datarevision: 0,
      width: 1200, height: 300, 
      yaxis: { autorange: false, range: [0, 255] },
      title: 'Voltaje medido por el Acelerometro',
    },
    revision: 0,
  }
  componentDidMount() {
    setInterval(this.increaseGraphic, 2000);
  } 

  increaseGraphic = () => { 
    const { line1, layout, revision } = this.state;
    //axios.get('http://127.0.0.1:8000/rand_continue_acel')
    axios.get('https://sensor-ms-fastapi.herokuapp.com/last_acel')
      .then(res => {
        const persons = res.data;
        //this.state.line1.y.push((persons["value"]*3.3)/255);
        this.state.line1.x.push(persons["datetime"]);
        this.state.line1.y.push(persons["valueX"]);

        this.state.line2.x.push(persons["datetime"]);
        this.state.line2.y.push(persons["valueY"]);
        
        this.state.line3.x.push(persons["datetime"]);
        this.state.line3.y.push(persons["valueZ"]);
        
        try{
          const temp = this.state.line1.x.length;
         if(temp > 10){
            this.state.line1.x.shift();
            this.state.line1.y.shift();
            this.state.line2.x.shift();
            this.state.line2.y.shift();
            this.state.line3.x.shift();
            this.state.line3.y.shift();
            
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
                this.state.line2,
                this.state.line3,
                
          ]}
          layout={this.state.layout}
        />
        <div id="myDiv"></div>
        </div>

      );// end return
    }
  }
  
export default AcelChart;

