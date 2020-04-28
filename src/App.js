import React from 'react';
import logo from './logo.svg';
import './App.css';
import DisplayResult from './DisplayResult';

const API_KEY = 'GnghzjsAa8ysdkQkMWKjycL8He2YHMp5Y05aagGP'

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      bool: true,
      asteroidInputVal: '',
      name: '',
      nasaJplUrl: '',
      isPotentiallyHazardousAsteroid: '',
      showResponse: false
    }
  }

  changeValue(evt){
    this.setState({asteroidInputVal: evt.target.value})

    if (evt.target.value.length > 0){
      this.setState({bool: false})
    }else{
      this.setState({bool: true})
    }
  }

  handleSubmit(evt){
    let url = `https://api.nasa.gov/neo/rest/v1/neo/`+this.state.asteroidInputVal+`?api_key=`+API_KEY
    fetch(url)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            name: result.name,
            nasaJplUrl: result.nasa_jpl_url,
            isPotentiallyHazardousAsteroid: result.is_potentially_hazardous_asteroid,
            showResponse: true
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  handleRandomSubmit(evt){
    fetch('https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=DEMO_KEY')
      .then(res => res.json())
      .then(
        (result) => {
          let ids = result.near_earth_objects.map((obj) => obj.id)
          let random_id = ids[Math.floor(Math.random() * ids.length)];

          this.setState({asteroidInputVal: random_id})
          let url = `https://api.nasa.gov/neo/rest/v1/neo/`+random_id+`?api_key=`+API_KEY
          fetch(url)
            .then(res => res.json())
            .then(
              (result) => {
                this.setState({
                  name: result.name,
                  nasaJplUrl: result.nasa_jpl_url,
                  isPotentiallyHazardousAsteroid: result.is_potentially_hazardous_asteroid,
                  showResponse: true
                });
              }
            )
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render(){
    return (
      <div className="App">
        <input type="text"
               value={this.state.asteroidInputVal}
               placeholder="Enter Asteroid ID"
               onChange={inputValue => this.changeValue(inputValue)}/>
        <button type="submit" onClick={() => this.handleSubmit()} disabled={this.state.bool}>Submit</button>
        <br />
        <button type="submit" onClick={() => this.handleRandomSubmit()}>Random Asteroid</button>

        <DisplayResult name={this.state.name} nasaJplUrl={this.state.nasaJplUrl} isPotentiallyHazardousAsteroid={this.state.isPotentiallyHazardousAsteroid} showResponse={this.state.showResponse} />
      </div>
    );
  }
}

export default App;
