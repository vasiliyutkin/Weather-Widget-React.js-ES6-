import React from 'react';


export default React.createClass({
     propTypes: {
        _removeTab : React.PropTypes.func.isRequired
        _retrieveWeather : React.PropTypes.func.isRequired
    },  

    _retrieveWeatherData: function() {
        this.props.on_retrieveWeather(this.props.city);
    },
    
    _removeCity: function(e) {
        e.stopPropagation();
        this.props.on_removeTab(this.props.index);
    },
    
    render: function() {
        return (
         <li role='presentation' className={this.props.isActive ? 'active' : ''} onClick={this._retrieveWeatherData}>
            <a href='#'>{this.props.city}<i className='glyphicon glyphicon-remove' onClick={this._removeCity}>
              </i>
            </a>
         </li>
        );
    }
});