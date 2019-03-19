import React from 'react';

import FTMUpperPart from './FTMUpperPart';
import FTMLowerPart from './FTMLowerPart';
import 'bootstrap/dist/css/bootstrap.css';

class FileToolManager extends React.Component {
  state = {
    user: 'jny'
  };

  render() {
    return (
      <div className="container">
        <FTMUpperPart />
        <FTMLowerPart user={this.state.user} />
      </div>
    );
  }
}

export default FileToolManager;
