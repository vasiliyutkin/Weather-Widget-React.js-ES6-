import React from 'react';
import Tab from './Tab';
import Empty from './Empty';
import WeatherInfo from './WeatherInfo';

var req = {
    root: 'http://api.openweathermap.org/data/2.5/weather',
    appid: '44db6a862fba0b067b1930da0d769e98'
};

export default React.createClass({
  componentWillMount: function() {
    var state = this._getSavedState();
      if (!state) {
        return;
      }
      this.setState(state);
  },
  
  getInitialState: function() {
    return {
      city: "",
      activeCity: "",
      weather: "",
      tabs: ["London", "Paris"]
    }
  },
  
  _saveCurrentState: function() {
      setTimeout(function() {
        localStorage.setItem('state', JSON.stringify(this.state));
      }.bind(this), 0)
  },

  _onCityChange: function(e) {
    this.setState({
      city: e.target.value
    });
  },

  _getSavedState: function() {
    var state = localStorage.getItem('state');
      if (!state) {
        return false;
      }
    try {
      return JSON.parse(state);
        } catch (err) {
          return false;
        }
    },

  _getWeather: function (city) {
      return $.get(req.root+'?q='+city+'&appid='+req.appid);
    },

  _retrieveWeather: function(city) {
    this.setState({
      activeCity: city
    });
    this._saveCurrentState();
    this._getWeather(city).then(function(result) {
        this.setState({
          weather: {
              main: result.main,
              wind: result.wind
          }
        });
    this._saveCurrentState();
    }.bind(this));
  },

  _remove: function(index) {
    var cities = this.state.tabs.slice();
    var _removedCity = cities.splice(index, 1);
      this.setState({
        tabs: cities
      });
    this._saveCurrentState();
    if (_removedCity[0] === this.state.activeCity) {
      this.state.activeCity = this.state.tabs[0];
      this._retrieveWeather(this.state.activeCity);
    }
  },

  _submitHandler: function(e) {
    e.preventDefault();
    for (var i = 0; i < this.state.tabs.length; i++) {
      if(this.state.city.toLowerCase() === this.state.tabs[i].toLowerCase()) {
        this.setState({
          activeCity: this.state.city,
          city: ""
        });
      this._retrieveWeather(this.state.city);
      this._saveCurrentState();
        return false;
      }
    };
    var newState = this.state.tabs.slice();
      newState.push(this.state.city);
      this.setState({
        activeCity: this.state.city,
        city: "",
        tabs: newState
      });
      this._retrieveWeather(this.state.city);
      this._saveCurrentState();
  },

  render: function() {
    var tabs = this.state.tabs;
    return ( 
      <div>
      <div className='row'>
        <div className="col-md-4">
        <form onSubmit={this._submitHandler}>
          <div className="input-group">
            <input type="text" className="form-control" value={this.state.city} placeholder="City Name" onChange={this._onCityChange}/>
            <span className="input-group-btn">
              <button className="btn btn-default">ADD CITY</button> 
            </span> 
          </div> 
        </form> 
      </div> 
      </div>
      <br />
      <div className='row'>
        <div clasHTabsName='col-md-12'>
            <ul className="nav nav-tabs"> 
                {tabs.map(function(city, i) {
                  return <Tab isActive={city === this.state.activeCity} on_retrieveWeather={this._retrieveWeather} on_removeTab={this._remove} key={i} index={i} city={city} />
                }.bind(this))} 
            </ul>
        </div>
      </div>
      <div>
        {this.state.tabs.length ? <div><WeatherInfo data={this.state.weather}/></div> : <Empty />}
      </div>
    </div>
    )
  }
  
});
