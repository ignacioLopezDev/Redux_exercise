import { useSelector, useDispatch } from "react-redux";
import { deleteTask } from "../features/task/taskSlice";
import { Link } from "react-router-dom";

function TaskList() {
  // Dispatch
  const dispatch = useDispatch();

  // UseSelector - state
  const tasks = useSelector((state) => state.task);
  console.log(tasks);
  console.log(tasks.length);

  // HandleDelete
  const handleDelete = (id) => {
    dispatch(deleteTask(id));
  };

  return (
    <div>
      <header>
        <h1>Cantidad de Tasks: {tasks.length}</h1>
        <Link to="create-newTask">Create new Task</Link>
      </header>
      {tasks.map((task) => (
        <div key={task.id}>
          <h3>{task.title}</h3>
          <div>
            <p>{task.description}</p>
            <button onClick={() => handleDelete(task.id)}>delete</button>
            <Link to={`/edit-task/${task.id}`}>Edit</Link>
          </div>
        </div>
      ))}
    </div>
  );
}
export default TaskList;
