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
      name: 'Valor de X',
      //fill: 'tozeroy',
    },
    line2: {
        x: [],
        y: [],
        name: 'Valor de Y',
        //fill: 'tozeroy',
      },
      line3: {
        x: [],
        y: [],
        name: 'Valor de Z',
        //fill: 'tozeroy',
      },
        
    layout: {
      datarevision: 0,
      width: 1200, height: 300, 
      yaxis: { autorange: false, range: [-130, 130] },
      title: 'Voltaje medido por el Acelerometro',
    },
    revision: 0,
  }
  componentDidMount() {
    setInterval(this.increaseGraphic, 800);
  } 

  increaseGraphic = () => { 
    const { line1, layout, revision } = this.state;
    //axios.get('http://127.0.0.1:8000/rand_continue_acel')
    axios.get('https://sensor-ms-fastapi.herokuapp.com/last_acel')
      .then(res => {
        const persons = res.data;
        //this.state.line1.y.push((persons["value"]*3.3)/255);
        var now_date = new Date();
        var now_time = now_date.toISOString();
        
        var x_val = persons["valueX"];
        var y_val = persons["valueY"];
        var z_val = persons["valueZ"];
        if(x_val > 127) {
            x_val = x_val - 256;
        }
        if(y_val > 127) {
            y_val = y_val - 256;
        }
        if(z_val > 127) {
            z_val = z_val - 256;
        }
        
        this.state.line1.x.push(now_time);
        this.state.line1.y.push(x_val);

        this.state.line2.x.push(now_time);
        this.state.line2.y.push(y_val);
        
        this.state.line3.x.push(now_time);
        this.state.line3.y.push(z_val);
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

