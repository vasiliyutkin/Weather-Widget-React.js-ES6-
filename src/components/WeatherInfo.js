import React from 'react';


export default React.createClass({
   propTypes: {
        wind: React.PropTypes.object.isRequired,
        main: React.PropTypes.object.isRequired
    },
    render: function() {
      var weather,
          main = this.props.data.main,
          wind = this.props.data.wind,
          imgSrc = 'dist/images/logo.png';
        
        if (!this.props.data) {
          weather = (
              <h1>Hi mate! Choose your City right Now!</h1>
          )
        } else {
          weather = (
            <div>
              <div className='image'>
                <img alt='weatherImg' src={imgSrc} />
              </div>
              <br /> <br />
              <div className='main'>
                <p><span className='spanner'>Humidity:</span> <span className='label label-default'>{main.humidity}</span></p>
                <p><span className='spanner'>Pressure:</span> <span className='label label-default'>{main.pressure}</span></p>
                <p><span className='spanner'>Overall temperature:</span> <span className='label label-default'>{main.temp}</span></p>
                <p><span className='spanner'>Max_Temp:</span> <span className='label label-default'>{main.temp_max}</span></p>
                <p><span className='spanner'>Min_Temp:</span> <span className='label label-default'>{main.temp_min}</span></p>
              </div> 
              <div className='wind'>
                <p><span className='spanner'>Wind in Degrees:</span> <span className='label label-default'>{wind.deg}</span></p>
                <p><span className='spanner'>Wind Speed:</span> <span className='label label-default'>{wind.speed}</span></p>            
              </div>
            </div>
          )  
        };        
      return ( 
        <div className='wrapper'> 
          <div>{ weather }</div>
        </div>
      );
    }
});