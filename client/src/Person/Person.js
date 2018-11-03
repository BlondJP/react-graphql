import React, { Component } from 'react';
import './Person.css';

class Person extends Component {

    constructor(props) {
        super()
        console.log(props)
    }

    render() {
        return (
            <div className="person" onClick={this.props.click}  className="person">
              <h1>{this.props.name}</h1>
              <p>{this.props.age}</p>
              <p>{this.props.children}</p>

            <input type="text" onChange={this.props.change} value={this.props.name}/>

            </div>
          );
    }
}

export default Person;