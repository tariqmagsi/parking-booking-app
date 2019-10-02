import { DELETE_TASK, CREATE_TASK, DELETE_ALL_TASK } from "../actions/actions";

function task_reducer(state = [], action) {
  switch (action.type) {
    case DELETE_TASK:
      return state.filter(r => r.id !== action.id);
    case CREATE_TASK:
      return state.concat([action.tasks]);
    case DELETE_ALL_TASK:
      return [];
    default:
      return state;
  }
}

export default task_reducer;
