import React from 'react';

class ListItem extends React.Component {
  render() {
    // console.log(this.props);
    const { item, onClick } = this.props;
    return (
      <div>
        <button onClick={onClick}>{item.data}</button>
      </div>
    );
  }
}

export default ListItem;
