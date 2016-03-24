import React from 'react';
import _ from 'lodash';
import TodoStore from '../stores/TodoStore';
import TodoItem from './TodoItem';
import * as TodoActions from '../actions/Todo';

/**
 * TodoList component to manage the todo tasks.
 */
export default class TodoList extends React.Component {
  /**
   * Component constructor.
   */
  constructor() {
    super();
    this.state = {
      todos: TodoStore.load() || []
    };
  }

  componentDidMount() {
    // Add todo tasks change listener on this component.
    TodoStore.addChangeListener(this._onChange.bind(this));
    TodoActions.index();
  }

  componentWillUnmount() {
    // Remove the listener than component is unmount.
    TodoStore.removeChangeListener(this._onChange.bind(this));
  }

  // On change event handler.
  _onChange() {
    this.setState({
      todos: TodoStore.load() || []
    })
  }

  render() {
      let { todos } = this.state;

      // If the filter is set, let's filter the todo items and not render them.
      if (this.props.filter) {
          todos = todos.filter((item) => {
            return !item.isComplete;
          })
      }
      // Create the list of TodoItems.
      todos = todos.map((item) => {
        return (
          <TodoItem key={item._id} todo={item} />
        )
      });
      // Define the string to render when there is no items.
      let NoContent = !_.size(todos) ? (<div className='ui center aligned'>There is no items in the todo list.</div>) : null;

      return (
        <div className="ui piled segment">
          <div className="ui middle aligned divided list">
            {NoContent}
            {todos}
          </div>
        </div>
      );
  }
}

// Required props.
TodoList.propTypes = { filter: React.PropTypes.bool.isRequired }
TodoList.defaultProps = { filter: false }
