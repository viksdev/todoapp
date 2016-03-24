import React from 'react';
import TodoStore from '../stores/TodoStore';

/**
 * Stats component to show the statistics of the tasks.
 */
export default class Stats extends React.Component {
  /**
   * Constructor of the component.
   */
  constructor() {
    super();
    // Define default state values.
    this.state = {
      totalTasks: TodoStore.getTotalCount(),
      leftTasks: TodoStore.getLeftCount(),
      totalCompletedTasks: TodoStore.getCompletedCount()
    };
  }

  /**
   * Implements componentDidMount, attach the event handler to listen for task
   * update actions.
   */
  componentDidMount() {
    // Add the listener.
    TodoStore.addChangeListener(() => {
      // Update the state on task update action.
      this.setState({
        totalTasks: TodoStore.getTotalCount(),
        leftTasks: TodoStore.getLeftCount(),
        totalCompletedTasks: TodoStore.getCompletedCount()
      });
    });
  }

  /**
   * Component render.
   */
  render() {
    // Fetch statistic values.
    let { totalTasks, leftTasks, totalCompletedTasks } = this.state;

    return (
      <div className="ui three column very relaxed grid statistics" style={{marginTop: '30px'}}>
        <div className="column">
          <div className="yellow statistic">
            <div className="value">
              {leftTasks}
            </div>
            <div className="label">To do</div>
          </div>
        </div>
        <div className="ui vertical divider">
          &
        </div>
        <div className="column">
          <div className="green statistic">
            <div className="value">
              {totalCompletedTasks}
            </div>
            <div className="label">Completed</div>
          </div>
        </div>
        <div className="ui vertical divider">
          &
        </div>
        <div className="column">
          <div className="black statistic">
            <div className="value">
              {totalTasks}
            </div>
            <div className="label">Total tasks</div>
          </div>
        </div>
      </div>
    );
  }

}
