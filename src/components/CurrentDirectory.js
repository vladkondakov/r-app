import React, { Component } from 'react';

class CurrentDirectory extends Component {
  render() {
    const { currentDir } = this.props;

    return (
      <div>
        <h4> CurrentDirectory: </h4>
        <p>{currentDir}</p>
        <hr />
      </div>
    );
  }
}

export default CurrentDirectory;
