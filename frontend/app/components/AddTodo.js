import React from "react";
import classNames from 'classnames';
// Import custom components.
import * as TodoActions from "../actions/Todo";
import TodoStore from "../stores/TodoStore";
import DeleteCompleteTodo from './DeleteCompleteTodo';
import HideTodo from './HideTodo';
const ENTER_KEY = 13;

/**
 * AddTodo component rensponsible for adding new todo task to the list.
 */
export default class AddTodo extends React.Component {
  /**
   * Constructor of the component.
   */
  constructor() {
    // Call super constructor.
    super();
    // Set the default state of the component.
    this.state = {
      todoText: null, // Input field value.
      valid: true // Input field validator mixin.
    };
  }

  /**
   * Function to handle the input field value change.
   * @param  {object} e [Input field action event object]
   */
  _handleInputFieldChange(e) {
    this.setState({
      todoText: e.target.value,
      valid: true
    });
  }

  /**
   * Create task, this function used by two events, enter hit and button press.
   * @param  {object} e [Input field action event object or null]
   */
  _createTask(e) {
    if (e.keyCode && e.keyCode !== ENTER_KEY) {
      return;
    }

    // Validation to make sure that value is defined, and not the empty.
    if (!(e.target.value || this.state.todoText)) {
      this.setState({
        valid: false
      })
      return;
    }
    // Call todo create action.
    TodoActions.create(e.target.value || this.state.todoText);
    // Reset the state.
    this.setState({todoText: null, valid: true});
  }

  /**
   * Component render function.
   * @return {string} [HTML content view of the component]
   */
  render() {
    let { todoText, valid } = this.state;
    return (
        <div className="ui left aligned basic segment">
          <div className={classNames("ui column row action fluid input", {"field error" : !valid })}>
            <input type="text" name="task" value={todoText} placeholder="Add task" onChange={this._handleInputFieldChange.bind(this)} onKeyDown={this._createTask.bind(this)}/>
            <button className="ui green right labeled icon button" onClick={this._createTask.bind(this)}>
              <i className="plus icon"></i>
              Add task
            </button>
          </div>
          <div className="ui horizontal divider">Or</div>
          <div className="ui two column row basic segment grid">
            <HideTodo hide={this.props.hide.bind(this)}/>
            <DeleteCompleteTodo/>
          </div>
        </div>
    );
  }
}

// Define the required props of the component.
AddTodo.propTypes = {
  hide: React.PropTypes.func.isRequired
}
