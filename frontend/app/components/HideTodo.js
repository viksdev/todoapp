import React from 'react';

/**
 * HideTodo component responsible in hiding the completed tasks from the list.
 * This component event handler implemented in the native react way by
 * sending event handler from the parent component along the other childs.
 * This is made on purpose to show the understanding of this behavior.
 */
export default class HideTodo extends React.Component {
  /**
   * Component view render function.
   * @return {string} [Component HTML contnet view.]
   */
  render() {
    return (
      <div className="column" style={{lineHeight: '35px'}}>
        <div className="ui toggle checkbox item left floated">
           <input type="checkbox" onClick={this.props.hide.bind(this)} />
           <label>Hide completed tasks</label>
        </div>
      </div>
    );
  }
}

// Define the required props of the component.
HideTodo.propTypes = {
  hide: React.PropTypes.func.isRequired
}
