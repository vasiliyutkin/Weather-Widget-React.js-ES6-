import React from 'react';
import Widget from './Widget';


export default React.createClass({
  render() {
    return (
      <div>
        <header>
          <h1>React Widget</h1>
        </header>
        <Widget />
      </div>
    )
  }
});
