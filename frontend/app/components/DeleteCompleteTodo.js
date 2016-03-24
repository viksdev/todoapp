import React from 'react';
import { destroyCompleted } from "../actions/Todo";

/**
 * DeleteCompleteTodo component responsible to clearing up todo
 * list by removing completed tasks.
 */
export default class DeleteCompleteTodo extends React.Component {
  /**
   * Main render function.
   * @return {string} [HTML context view of the component]
   */
  render() {
    return (
      <div className="column">
        <button className="ui right labeled icon button" onClick={destroyCompleted.bind(this)}>
          <i className="erase icon"></i>
          Clear completed
        </button>
      </div>
    );
  }

}
