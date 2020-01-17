import React, { Component } from 'react';
import './components/pnrForm'
import PnrForm from './components/pnrForm';
import NavBar from './components/navBar'

class App extends Component {
  constructor(props){     
    super(props)
    this.state = {
      pnr_detail: sessionStorage.getItem('pnr-detail')
    }
  }
  render(){
    console.log(sessionStorage.getItem('pnr-detail'));
    
    return (
      <div className="App">
        <NavBar />
        <PnrForm />
        
      </div>
    );
  }
  
}

export default App;
