import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';

class FoldersList extends React.Component {
  render() {
    const { structure } = this.props.structure;
    return <div className="jumbotron">{this.renderStructure(structure)}</div>;
  }

  renderItem = item => {
    const { onClick1 } = this.props.onClick1;
    return (
      <div
        className="card"
        onClick={() => {
          onClick1(item);
        }}
      >
        <div className="body">{item.attr.data}</div>
      </div>
    );
  };

  renderStructure = structure => {
    const { lastFolderID } = this.props.lastFolderID;
    const { onClick2 } = this.props.onClick2;
    return (
      <div>
        <div
          className="card"
          onClick={() => {
            onClick2(lastFolderID);
          }}
        >
          <div className="body">...</div>
        </div>
        <div>{structure.map(item => this.renderItem(item))}</div>
      </div>
    );
  };
}

export default FoldersList;
