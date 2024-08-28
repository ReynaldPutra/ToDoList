import { useState } from "react";

interface Props {
  addTask: (taskName: string) => void;
  clearTask: () => void;
}
const TodoListHead: React.FC<Props> = ({ addTask, clearTask }) => {
  const [formVisible, setformVisible] = useState(false);
  const [addVisible, setaddVisible] = useState<boolean>(true);
  const [taskName, setTaskName] = useState("");
  const [errorVisible, setErrorVisible] = useState<boolean>(false);
  const [errorString, seterrorString] = useState("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (taskName.length > 100) {
      setErrorVisible(true);
      seterrorString("Title must be shorter than or equal to 100 characters.");
    } else if (!taskName.trim()) {
      setErrorVisible(true);
      seterrorString("Title cannot be empty.");
    } else {
      setErrorVisible(false);
      addTask(taskName);
      setformVisible(false);
      setaddVisible(true);
      setTaskName("");
    }
  };
  const handleClearTask = () => {
    clearTask();
    setShowModal(false);
  };
  const openModal = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };

  const cancelCreate = () => {
    setformVisible(false);
    setaddVisible(true);
    setErrorVisible(false);
    setTaskName("");
  };

  return (
    <div>
      <div className="Todo">
        <h3 className="header">Things you should be doing today...</h3>
        <div className="TodoBtn">
          {addVisible && (
            <button
              type="button"
              className="btn btn-primary me-2"
              onClick={() => {
                setformVisible(true);
                setaddVisible(false);
              }}
            >
              Add New
            </button>
          )}
          <button type="button" className="btn btn-danger" onClick={openModal}>
            Clear
          </button>
        </div>
      </div>
      {formVisible && (
        <form className="TodoForm" onSubmit={addTodo}>
          <input
            type="text"
            className="form-control input-text"
            placeholder="Add new to-do title..."
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />
          <div className="TodoBtn">
            <button
              type="button"
              className="btn btn-secondary me-2"
              onClick={cancelCreate}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Create
            </button>
          </div>
        </form>
      )}
      {errorVisible && <div className="err">{errorString}</div>}
      <div
        className={`modal fade ${showModal ? "show d-block" : ""}`}
        tabIndex={-1}
        style={{ display: showModal ? "block" : "none" }}
        aria-labelledby="exampleModalLabel"
        aria-hidden={!showModal}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-body">Confirm to clear all todos?</div>
            <div className="modal-footer">
              <div className="btnModal">
                <button
                  type="button"
                  className="btn btn-cancel"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-confirm"
                  onClick={handleClearTask}
                >
                  Clear All
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoListHead;
