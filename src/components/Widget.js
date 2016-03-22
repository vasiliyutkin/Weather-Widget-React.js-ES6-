import React from 'react';
import AppForm from './AppForm';

export default React.createClass({
  render: function() {
  return ( 
    <div>
      <div>
        <div className="panel panel-primary">
          <div className="panel-heading">
            <h1 className="panel-title">Weather widget</h1>
          </div>  
          <div className="panel-body">
            <AppForm />
          </div>
        </div> 
      </div>
    </div>
  );
 }
});
