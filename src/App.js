import React, { Component } from 'react';
import Home from './components/Home/Home.js';
import Particles from 'react-particles-js';

import './App.css';

const particlesOptions = {
    particles: {
        number: {
            value: 60,
            density: {
                enable: true,
                value_area: 800,
            }
        },
        size: {
            value: 3,
            random: true,
        },
        line_linked: {
            color: '#EE4B6A'
        },
        move: {
            enable: true,
            speed: 3,
            direction: 'none',
            random: false,
            straight: false,
            out_mode: "out",
            bounce: false,
            attract: {
                enable: false,
                rotateX: 1200,
                rotateY: 1200
            }
        }
    }

}


class App extends Component {

  render() {
    return (
      <div className="App">
        <Particles className='particles' params={particlesOptions}/>
        <Home/>
      </div>
    );
  }
}


export default App;
