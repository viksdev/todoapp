// The constnt values of the possible todo actions.
export default [
  'TODO_CREATE',
  'TODO_UPDATE',
  'TODO_DELETE',
  'TODO_COMPLETE',
  'TODO_UNDO_COMPLETE',
  'TODO_INDEX',
  'TODO_DELETE_COMPLETED'
].reduce((obj, str) => { obj[str] = str; return obj; }, {})
