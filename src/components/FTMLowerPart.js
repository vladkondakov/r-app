import React from 'react';
import 'bootstrap/dist/css/bootstrap.css' 
import CurrentDirectory from './CurrentDirectory';
import exampleStructure from '../structure.json';
import exampleFolderStructure from '../folderStructure.json';
import exampleFolderStructure2 from '../folderStructure2.json';
import ListItem from './ListItem.js';

class FTMLowerPart extends React.Component {
  state = {
    fullStructure: [],
    currentDir: '',
    requestAddress: 'http://cris.icc.ru/fm2?id=',
    exampleFolderStructure: exampleFolderStructure,
    exampleFolderStructure2: exampleFolderStructure2
  };

  componentDidMount() {
    // this.getFolderStructure(this.props.userName);
    this.setState({
      currentDir: `S:/users/${this.props.user}`,
      fullStructure: exampleStructure
    });
  }

  updateFolderState = (structure, folder) => {
    const newFullStructure = structure.map(item => {
      if (item.attr.id === folder.attr.id) {
        if (folder.state === 'closed') {
          this.setState({
            currentDir: folder.attr.originalPath
          });
          item.state = 'opened';
        } else {
          const currentDir = folder.attr.originalPath;
          const lastIndex = currentDir.lastIndexOf('/');
          const upperDir = currentDir.substring(0, lastIndex);
          this.setState({
            currentDir: upperDir
          });
          item.state = 'closed';
          item.structure = this.closeSubFolders(item);
        }
      } else {
        if (item.hasOwnProperty('structure') && item.state === 'opened') {
          this.updateFolderState(item.structure, folder);
        }
      }

      return item;
    });

    this.setState({
      fullStructure: newFullStructure
    });
  };

  closeSubFolders = folder => {
    const newFolderStructure = folder.structure.map(item => {
      if (item.state === 'opened') {
        item.state = 'closed';
        if (item.hasOwnProperty('structure')) {
          this.closeSubFolders(item);
        }
      }

      return item;
    });

    return newFolderStructure;
  };

  handleClickFolder = folder => {
    const { fullStructure } = this.state;

    this.updateFolderState(fullStructure, folder);

    if (!folder.hasOwnProperty('structure')) {
      const { fullStructure } = this.state;
      const folderStructure = this.getFolderStructure(folder.attr.id);

      folder.structure = folderStructure;
      this.updateFullStructure(fullStructure, folder);
    }
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

  updateFullStructure = (structure, folder) => {
    const newFullStructure = structure.map(item => {
      if (item.attr.id === folder.attr.id) {
        item.structure = folder.structure;
      } else {
        if (item.hasOwnProperty('structure') && item.state === 'opened') {
          this.updateFullStructure(item.structure, folder);
        }
      }

      return item;
    });

    this.setState({
      fullStructure: newFullStructure
    });
  };

  getFolderStructure = id => {
    const { exampleFolderStructure, exampleFolderStructure2 } = this.state;

    if (exampleFolderStructure) {
      this.setState({
        exampleFolderStructure: null
      });
      return exampleFolderStructure;
    } else {
      return exampleFolderStructure2;
    }

    // return getStructure(`${this.state.requestAddress}${id}`);
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

  renderItem = item => {
    if (item.structure && item.state === 'opened') {
      return (
        <div key={item.attr.id}>
          <ListItem
            key={item.attr.id}
            onClick={this.handleClickItem.bind(this, item)}
            item={item}
          />
          <ul class="list-group">
            {item.structure.map(c => (
              <li key={c.attr.id} style={{paddingLeft: '5%', listStyleType: 'none'}}>{this.renderItem(c)}</li>
            ))}
          </ul>
        </div>
      );
    } else {
      return (
        <ListItem
          key={item.attr.id}
          onClick={this.handleClickItem.bind(this, item)}
          item={item}
        />
      );
    }
  };

  renderStructure = structure => {
    return structure.map(item => this.renderItem(item));
  };
}

export default FTMLowerPart;
