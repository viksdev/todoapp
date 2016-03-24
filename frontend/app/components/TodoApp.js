import React from 'react';
import TodoListComponent from './TodoList';
import AddTodoComponent from './AddTodo';
import StatsComponent from './Stats';
import TodoStore from '../stores/TodoStore';

/**
 * The main TodoApp component. The filtering of the completed tasks was maded
 * in native react behavior by sending state values from the main component to
 * the child. This part implemented in that way just to show the understanding
 * of that behavior.
 */
export default class TodoApp extends React.Component {
  /**
   * Constructor implementation.
   */
  constructor() {
    super();
    this.state = {
      filter: false
    }
  }

  /**
   * Hide completed task callback.
   */
  _hideCompleted() {
    this.setState({
      filter: !this.state.filter
    });
  }

  /**
   * Render component
   * @return {string} [HTML view of the component]
   */
  render() {
    return (
      <div className="ui left aligned container grid" style={{marginTop: '50px'}}>
        <div className="two column row">
          <div className="column">
            <StatsComponent/>
          </div>
          <div className="column">
            <AddTodoComponent hide={this._hideCompleted.bind(this)}/>
          </div>
        </div>
        <div className="column row">
          <TodoListComponent filter={this.state.filter}/>
        </div>
      </div>
    );
  }
}
