import { useState } from "react";
import TodoListHead from "./TodoListHead";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCircleMinus,
} from "@fortawesome/free-solid-svg-icons";
type Task = {
  id: number;
  name: string;
  isComplete: boolean;
};
const TodolistWrapper = () => {
  const [taskList, setAddTaskList] = useState<Task[]>([]);

  const isEmpty = taskList.length === 0;
  const handleAddTask = (taskName: string) => {
    if (taskName.trim()) {
      const newTodo = {
        id: Date.now(),
        name: taskName,
        isComplete: false,
      };
      const updatedTaskList = [...taskList, newTodo];
      const reorderedTaskList = orderedTask(updatedTaskList);
      setAddTaskList(reorderedTaskList);
    }
  };

  const handleClearTask = () => {
    setAddTaskList([]);
  };

  const handleDeleteTask = (id: number) => {
    setAddTaskList(taskList.filter((_, i) => i !== id));
  };

  const handleCheckTask = (id: number) => {
    const updatedTaskList = taskList.map((task) => {
      if (task.id === id) {
        return { ...task, isComplete: !task.isComplete };
      }
      return task;
    });
    const reorderedTaskList = orderedTask(updatedTaskList);
    setAddTaskList(reorderedTaskList);
  };

  const orderedTask = (taskList: Task[]) => {
    const incompleteTasks = taskList.filter((task) => !task.isComplete);
    const completedTasks = taskList.filter((task) => task.isComplete);

    const reorderedTaskList = [...incompleteTasks, ...completedTasks];
    return reorderedTaskList;
  };

  return (
    <>
      <TodoListHead
        addTask={handleAddTask}
        clearTask={handleClearTask}
      ></TodoListHead>
      <div>
        {!isEmpty && (
          <ul>
            {taskList.map((task, index) => (
              <li
                key={index}
                className={`list-item ${task.isComplete ? "checkedList" : ""}`}
              >
                <div className="list">
                  <button
                    type="button"
                    className="btn"
                    onClick={() => handleCheckTask(task.id)}
                  >
                    <FontAwesomeIcon
                      icon={faCircleCheck}
                      className={
                        task.isComplete ? "iconCheck checked" : "iconCheck"
                      }
                    />{" "}
                  </button>
                  <span>{task.name}</span>
                  <div className="deleteButton">
                    <button
                      type="button"
                      className="btn "
                      onClick={() => handleDeleteTask(index)}
                    >
                      <FontAwesomeIcon
                        icon={faCircleMinus}
                        className="iconDelete"
                      />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
        {isEmpty && (
          <ul>
            <li>
              <div className="empty">Nothing to-do yet.</div>
            </li>
          </ul>
        )}
      </div>
    </>
  );
};

export default TodolistWrapper;
