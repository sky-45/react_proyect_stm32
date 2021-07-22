import React from 'react'
import axios from 'axios';
import Plotly from "plotly.js"
import createPlotlyComponent from 'react-plotly.js/factory';

const Plot = createPlotlyComponent(Plotly);

class AcelDeg extends React.Component {    
  
  state = {
    line1: {
      x: [],
      y: [],
      name: 'Pitch',
      //fill: 'tozeroy',
    },
    line2: {
        x: [],
        y: [],
        name: 'Roll',
        //fill: 'tozeroy',
      },

        
    layout: {
      datarevision: 0,
      width: 1200, height: 500, 
      yaxis: { autorange: false, range: [-180,180] },
      title: 'Grado de pitch y roll',
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
        // values of X, Y and Z
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
        // sign of zval
        var z_sign = 0;
        if(z_val >= 0) {
            z_sign = 1;
        }
        else {
            z_sign = -1;
        }
        // sign of y

        //calculate pitch angle
        const pitch = Math.atan2(x_val, z_sign*Math.sqrt(Math.pow(y_val, 2) + Math.pow(z_val, 2)));
        //calculate roll angle
        const roll = Math.atan2(y_val, z_sign*Math.sqrt(Math.pow(x_val, 2) + Math.pow(z_val, 2)));
        // print pitch angle in degrees
        const pitch_deg = (pitch * 180) / Math.PI;
        // print roll angle in degrees
        const roll_deg = (roll * 180) / Math.PI;
        //console.log(pitch_deg, roll_deg);

        this.state.line1.x.push(now_time);
        this.state.line1.y.push(pitch_deg);

        this.state.line2.x.push(now_time);
        this.state.line2.y.push(roll_deg);

        try{
          const temp = this.state.line1.x.length;
         if(temp > 10){
            this.state.line1.x.shift();
            this.state.line1.y.shift();
            this.state.line2.x.shift();
            this.state.line2.y.shift();
            
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
                
          ]}
          layout={this.state.layout}
        />
        <div id="myDiv"></div>
        </div>

      );// end return
    }
  }
  
export default AcelDeg;

