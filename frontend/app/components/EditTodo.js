import React from 'react';
// Import todo application actions.
import * as TodoActions from '../actions/Todo';

// Define the constant for the enter key.
const ENTER_KEY = 13;
// Define the constant for the esc key.
const ESC_KEY = 27;
/**
 * EditTodo component. Responsible for editing the todo task.
 */
export default class EditTodo extends React.Component {

  /**
   * Contructor
   * @param  {object} props [Properties of the component]
   */
  constructor(props) {
    super(props);
    // Set the initial state.
    let { _id, task } = this.props.todo;
    this.state = { _id, task };
  }

  /**
   * Input field event handler.
   * @param  {object} item [Input event object]
   */
  _changeHandler(item) {
    this.setState({
      task: item.target.value
    })
  }

  /**
   * Update field event handler. This function used in several scenarios,
   * when you press enter key or use save button.
   * @param  {object} item [Input event object]
   */
  _update(item) {
    // If ESC is pressed make sure you close the edit form.
    if (item.keyCode && item.keyCode === ESC_KEY) {
      return this.props.done();
    }
    // Make sure if you press a key that it is ENTER.
    if (item.keyCode && item.keyCode !== ENTER_KEY) {
      return;
    }
    // Call update todo action handler.
    TodoActions.update(this.state._id, this.state.task);
    // Update the state of the parent component.
    this.props.done();
  }

  /**
   * Render method implementation.
   * @return {string} [HTML context view of this component]
   */
  render() {
    return (
      <div className="ui action fluid input focus">
        <input type="text" value={this.state.task} autoFocus ref={this.state.id}
        onChange={this._changeHandler.bind(this)} onKeyDown={this._update.bind(this)} />
        <button className="ui green right labeled icon button" onClick={this._update.bind(this)}>
          <i className="checkmark icon"></i>
          Update
        </button>
      </div>
    );
  }
}

// Define the required props of the component.
EditTodo.propTypes = {
  done: React.PropTypes.func.isRequired,
  todo: React.PropTypes.object.isRequired
}
