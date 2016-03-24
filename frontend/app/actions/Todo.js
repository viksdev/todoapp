import TodoDispatcher from "../dispatcher/Todo";
import TodoConstants from "../constants/TodoActions";
import axios from 'axios';
import Config from 'Config';

/**
 * Action to fetch all the data form the backend server.
 */
export function index () {
  // Make a call to the backend.
  axios.get([Config.backend, 'todos'].join('/')).then(({data}) => {
    // Dispatch the fetch tasks action.
    TodoDispatcher.dispatch({
      actionType: TodoConstants.TODO_INDEX,
      task: data
    });
  }).catch((err) => {
    // No error handler added to the application.
    console.log('error occur', err);
  });
}

/**
 * Action to handle the task creation.
 * @param {string} task [Task description]
 */
export function create(task) {
  axios.post([Config.backend, 'todos'].join('/'), { task }).then(({data}) => {
    // Dispatch the action.
    TodoDispatcher.dispatch({
      actionType: TodoConstants.TODO_CREATE,
      task: data
    });
  }).catch((err) => {
    // No error handler added to the application.
    console.log('error occur', err);
  });
};

/**
 * Update todo task.
 * @param  {integer} id   [The id of the task]
 * @param  {string} task  [The task description]
 */
export function update(id, task) {
  axios.put([Config.backend, 'todos', id].join('/'), { task }).then(() => {
    // Dispatch the action to the listener.
    TodoDispatcher.dispatch({
      actionType: TodoConstants.TODO_UPDATE,
      id,
      task
    });
  }).catch((err) => {
    // No error handler added to the application.
    console.log('error occur', err);
  });
};

/**
 * Toggle the complete status of the task.
 * @param  {integer}  id         [The id of the todo task]
 * @param  {Boolean} isComplete  [Current status value of the task]
 */
export function toggleComplete(id, isComplete) {
  axios.put([Config.backend, 'todos', id].join('/'), { isComplete: !isComplete }).then(({data}) => {
    // Dispact the action.
    TodoDispatcher.dispatch({
      actionType: isComplete ? TodoConstants.TODO_UNDO_COMPLETE : TodoConstants.TODO_COMPLETE,
      id: id
    });
  }).catch((err) => {
    // No error handler added to the application.
    console.log('error occur', err);
  });
}

/**
 * Delete todo task.
 * @param  {integer}  id [The id of the todo task]
 */
export function destroy(id) {
  axios.delete([Config.backend, 'todos', id].join('/')).then(() => {
    // Dispatch the action.
    TodoDispatcher.dispatch({
      actionType: TodoConstants.TODO_DELETE,
      id
    });
  }).catch((err) => {
    // No error handler added to the application.
    console.log('error occur', err);
  });
}

/**
 * Endpoint call to remove all completed tasks.
 */
export function destroyCompleted() {
  // Send fake id, just in case to use the same endpoint.
  axios.delete([Config.backend, 'todos', Date.now()].join('/'), {
    params: {
      complete: true
    }
  }).then(() => {
    // Dispatch the action.
    TodoDispatcher.dispatch({
      actionType: TodoConstants.TODO_DELETE_COMPLETED
    });
  }).catch((err) => {
    // No error handler added to the application.
    console.log('error occur', err);
  });
}
