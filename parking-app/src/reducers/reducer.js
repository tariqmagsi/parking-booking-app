import { combineReducers } from "redux";
import task_reducer from "./task_reducer";

export default combineReducers({
  tasks: task_reducer
});
