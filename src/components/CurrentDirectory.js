import React, { Component } from 'react';

class CurrentDirectory extends Component {
  render() {
    const { currentDir } = this.props;

    return (
      <div>
        <h5> CurrentDirectory: </h5>
        <p>{currentDir}</p>
        <p>The current directory will be placed here</p>
        <hr />
      </div>
    );
  }
}

export default CurrentDirectory;
