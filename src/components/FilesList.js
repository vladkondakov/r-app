import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';

class FoldersList extends React.Component {

    render() {
        const { structure } = this.props.structure;
        return (
            <div className="jumbotron">
                {this.renderStructure(structure)}
            </div>
        );
    }

    renderItem = item => {
        const { onClick } = this.props.onClick;
        return (
            <div className="card" onClick={() => {
                onClick(item)
            }}>
                <div className="body">{item.attr.data}</div>
            </div>
        );
    }

    renderStructure = structure => {
        return (
            <div>
                {structure.map(item => this.renderItem(item))}
            </div>
        )
    };
}

export default FoldersList;