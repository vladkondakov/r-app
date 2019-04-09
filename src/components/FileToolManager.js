import React from 'react';

import FTMUpperPart from './FTMUpperPart';
import FTMLowerPart2 from './FTMLowerPart2';
import 'bootstrap/dist/css/bootstrap.css';

class FileToolManager extends React.Component {
  state = {
    user: 'root'
  };

  render() {
    return (
      <div className="container">
        <FTMUpperPart />
        <FTMLowerPart2 user={this.state.user} />
      </div>
    );
  }
}

export default FileToolManager;
