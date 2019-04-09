import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import CurrentDirectory from './CurrentDirectory';
import FoldersList from './FoldersList';
import FilesList from './FilesList';
import load from '../utils/load';

class FTMLowerPart2 extends React.Component {
  state = {
    lastFolder: '',
    fullStructure: [],
    currentDir: '',
    requestAddress: 'http://cris.icc.ru/fm2?id='
  };

  componentDidMount() {
    const fS = this.getFolderStructure(this.props.user);

    this.setState({
      currentDir: `S:/users/${this.props.user}`,
      fullStructure: fS
    });
  }

  handleClickFolder = folder => {
    //sadd if condition
    const folderStructure = this.getFolderStructure(folder.attr.id);

    this.setState({
      lastFolder: folder.attr.id,
      fullStructure: folderStructure,
      currentDir: folder.attr.originalPath
    });
  };

  handleClickItem = (item, event) => {
    event.preventDefault();

    if (item.attr.rel !== 'folder') {
      this.setState({
        currentDir: item.attr.originalPath
      });
      return;
    }

    this.handleClickFolder(item);
  };

  getFolderStructure = id => {
    // Вызов метода из модуля, где написан get - запрос
    return load(`${this.state.requestAddress}${id}`);
  };

  render() {
    const { fullStructure, currentDir } = this.state;

    return (
      <div className="jumbotron">
        <CurrentDirectory currentDir={currentDir} />
        {this.renderStructure(fullStructure)}
      </div>
    );
  }

  renderStructure = structure => {
    let structureFiles = [];
    let structureFolders = [];

    structure.forEach(function(curr, index, initial_array) {
      if (curr.attr.rel === 'folder') {
        structureFolders.push(curr);
      } else {
        structureFiles.push(curr);
      }
    });
    return (
      <div>
        <FoldersList
          lastFolderID={this.state.lastFolder}
          structure={structureFolders}
          onClick1={this.handleClickItem}
          onClick2={this.getFolderStructure}
        />
        <FilesList structure={structureFiles} onClick={this.handleClickItem} />
      </div>
    );
  };
}

export default FTMLowerPart2;
