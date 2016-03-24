import React from 'react';
import * as TodoActions from '../actions/Todo';
import classNames from 'classnames';
import EditTodo from './EditTodo';
import _ from 'lodash';

/**
 * TodoItem component. That component is responsible to render the todo item list.
 */
export default class TodoItem extends React.Component {
  /**
   * The constuctor of the component.
   */
  constructor() {
    super();
    // Set the state as editing to false.
    this.state = {
      isEditing: false
    };
  }

  /**
   * Change the state to edit when the element is in edit mode.
   */
  _editState() {
    this.setState({
      isEditing: true
    });
  }

  /**
   * Destroy the todo item.
   */
  _destroy() {
    TodoActions.destroy(this.props.todo._id);
  }

  /**
   * Function to change the status of the todo task.
   */
  _toggleComplete() {
    let { _id, isComplete } = this.props.todo;
    TodoActions.toggleComplete(_id, isComplete);
  }

  /**
   * Function to change the edit back to normal.
   */
  _finishEdit() {
    this.setState({
      isEditing: false
    });
  }

  /**
   * Render the component.
   * @return {string} [HTML content view.]
   */
  render() {

    let { task, isComplete } = this.props.todo;
    let ItemContent = null;
    let Styles = this.state.isEditing ? {display: 'none'} : {};
    
    // Load different view on different state.
    if (this.state.isEditing) {
      ItemContent = <EditTodo todo={this.props.todo} done={this._finishEdit.bind(this)}/>
    } else {
      let cross = isComplete ? { textDecoration: 'line-through' } : {};
      ItemContent = (<div className="ui checkbox page left aligned" style={_.extend({marginTop: '10px'}, cross)}>
        <input type="checkbox" checked={isComplete} onChange={this._toggleComplete.bind(this)} />
        <label>{task}</label>
      </div>);
    }

    return (
      <div className="item">
        <div style={Styles} className="ui red color vertical animated button right floated content" tabIndex="0" onClick={this._destroy.bind(this)}>
          <div className="hidden content">Delete</div>
          <div className="visible content">
            <i className="remove icon"></i>
          </div>
        </div>
        <div style={_.extend(_.clone(Styles), isComplete ? {display: 'none'} : {})} className="ui yellow color vertical animated button right floated content" tabIndex="0" onClick={this._editState.bind(this)}>
          <div className="hidden content">Edit</div>
          <div className="visible content">
            <i className="edit icon"></i>
          </div>
        </div>
        <div className="content" style={{fontWeight: 'bold'}}>
          {ItemContent}
        </div>
      </div>
    );
  }

}
