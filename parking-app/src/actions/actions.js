export const CREATE_TASK = "CREATE_TASK";
export const DELETE_TASK = "DELETE_TASK";
export const DELETE_ALL_TASK = "DELETE_ALL_TASK";
export function createTaskAction(
  taskId,
  taskDate,
  taskTime,
  taskHours,
  taskSlot,
  userId
) {
  return {
    type: CREATE_TASK,
    tasks: {
      receipt_id: generateId(),
      id: taskId,
      date: taskDate,
      time: taskTime,
      hours: taskHours,
      slot: taskSlot,
      user_id: userId
    }
  };
}

export function deleteTaskAction(id) {
  return {
    type: DELETE_TASK,
    id
  };
}
export function deleteAllTasks() {
  return {
    type: DELETE_ALL_TASK
  };
}
export function generateId() {
  return (
    Math.random()
      .toString(36)
      .substring(2) + new Date().getTime().toString(36)
  );
}
