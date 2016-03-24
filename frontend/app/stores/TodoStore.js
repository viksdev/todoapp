import {
  EventEmitter
} from "events";
import TodoDispatcher from '../dispatcher/Todo';
import TodoConstants from '../constants/TodoActions';
import _ from 'lodash';

const CHANGE_EVENT = "change";

/**
 * Todo store, to store all the modifications to the data.
 */
class TodoStore extends EventEmitter {
  /**
   * Constructor definition.
   */
  constructor() {
    super();
    this.todos = [];
  }

  /**
   * Function to fetch all the existing todos.
   * @return {array} [The array of todo objects]
   */
  load() {
    return this.todos;
  }

  // Set initial.
  index(tasks) {
    this.todos = tasks;
  }

  // Create.
  create(task) {
    this.todos.push(task);
  }

  // Update.
  update({ id, task }) {
    let element = _.find(this.todos, { _id: id });
    element.task = task;
  }

  // Toggle complete task status.
  toggleComplete({ id }) {
    let element = _.find(this.todos, { _id: id });
    element.isComplete = !element.isComplete;
  }

  // Destroy single task.
  destroy(_id) {
    this.todos = _.reject(this.todos, { _id });
  }

  // Destroy all completed tasks.
  destroyCompleted() {
    this.todos = _.reject(this.todos, {
      isComplete: true
    });
  }

  // Helper function to return the total count of the todo tasks.
  getTotalCount() {
    return _.size(this.todos);
  }

  // Helper function to get completed tasks count.
  getCompletedCount() {
    return _.size(_.filter(this.todos, {
      isComplete: true
    }));
  }

  // Helper function to get the number of the left tasks.
  getLeftCount() {
    return _.size(_.filter(this.todos, {
      isComplete: false
    }));
  }

  // Add change listener.
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  // Remove change listener.
  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
}

const TodoInstance = new TodoStore();

// Register all dispatcher action methods.
TodoDispatcher.register((payload) => {
  switch (payload.actionType) {
    case TodoConstants.TODO_INDEX:
      TodoInstance.index(payload.task);
      break;

    case TodoConstants.TODO_CREATE:
      TodoInstance.create(payload.task);
      break;

    case TodoConstants.TODO_UPDATE:
      TodoInstance.update(payload);
      break;

    case TodoConstants.TODO_DELETE:
      TodoInstance.destroy(payload.id);
      break;

    case TodoConstants.TODO_UNDO_COMPLETE:
      TodoInstance.toggleComplete(payload);
      break;

    case TodoConstants.TODO_COMPLETE:
      TodoInstance.toggleComplete(payload);
      break;

    case TodoConstants.TODO_DELETE_COMPLETED:
      TodoInstance.destroyCompleted();
      break;

    default:
  }
  // Emit the update message to task change listeners.
  TodoInstance.emit(CHANGE_EVENT);
});

// Export todo store instance.
export default TodoInstance;
