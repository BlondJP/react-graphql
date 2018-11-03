import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {persons : [
      {name: 'JP', age: 27},
      {name: 'ML', age: 26},
      {name: 'Billou', age: 21}
  ]};
  }



  switchNameHandler = () => {
    console.log('switchNameHandler called')

    let age = this.state.persons[2].age + 1;

    this.setState({
      persons : [
        {name: 'JP', age: 27},
        {name: 'ML', age: 26},
        {name: 'Billou', age: age}
    ]
    })
  }

  nameChangeHandler = (event) => {
    console.log('nameChangeHandler')

    let name = this.state.persons[1].age + 'Bozkurt';

    console.log(event.target.value)

    this.setState({
      persons : [
        {name: 'JP', age: '27'},
        {name: event.target.value, age: '26'},
        {name: 'Billou', age: 21}
    ]
    })
  }

  render() {
    return (
      <div className="App">

        <button onClick={this.switchNameHandler}>Augmenter l'age de billou</button>

        <input type="text" placeholder="nouveau nom" onChange={this.nameChangeHandler} />

        <Person 
        age={this.state.persons[0].age} 
        name={this.state.persons[0].name}
        click={this.switchNameHandler}
        change={this.nameChangeHandler}
        />
        <Person
        age={this.state.persons[1].age}
        name={this.state.persons[1].name}
        change={this.nameChangeHandler}
        />
        <Person
        age={this.state.persons[2].age}
        name={this.state.persons[2].name}
        change={this.nameChangeHandler}
        />
      </div>
    );
  }
}

export default App;
