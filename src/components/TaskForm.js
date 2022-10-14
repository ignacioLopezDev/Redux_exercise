import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, editTask } from "../features/task/taskSlice";
import { useNavigate, useParams, Link } from "react-router-dom";
import { v4 as uuid } from "uuid";

function TaskForm() {
  // *UseSelector
  const tasks = useSelector((state) => state.task);
  // * Params
  const params = useParams();

  // *Navigate
  const navigate = useNavigate();

  // * UseDispatch
  const dispatch = useDispatch();

  // * UseState - New Task
  const [task, setTask] = useState({
    title: "",
    description: "",
  });

  //* UseEffect de Editar o New
  useEffect(() => {
    if (params.id) {
      setTask(tasks.find((task) => task.id === params.id));
    }
  }, []);

  // * HandleChange
  const handleChange = (e) =>
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });

  // * HandleSubmit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (params.id) {
        dispatch(editTask(task))
    } else {
      dispatch(
        addTask({
          id: uuid(),
          ...task,
          // ...task es el action.payload capturado (title: , description:) + id:..
        })
      );
    }

    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="title"
        type="text"
        placeholder="title"
        onChange={handleChange}
        value={task.title}
      />
      <textarea
        name="description"
        placeholder="write your task.."
        onChange={handleChange}
        value={task.description}
      ></textarea>
      <button>save</button>
      <Link to="/">Regresar</Link>
    </form>
  );
}

export default TaskForm;
