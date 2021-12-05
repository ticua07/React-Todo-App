import { useState, useEffect } from "react";
import "./App.css";
import Tasks from "./components/Tasks";
const axios = require("axios").default;

function App() {
	const [tasks, setTasks] = useState([]);
	useEffect(() => {
		axios.get("http://127.0.0.1:8000").then((res) => {
			setTasks(res.data["products"]);
		});
	}, []);

	// * Task Counter because otherwise tasks id may repeat
	// * And cause react to act wierdly
	const [tasksCounter, setTasksCounter] = useState(tasks.length);
	const [input, setInputValue] = useState("");
	const inputTask = document.getElementById("inputTask");
	const addTask = () => {
		if (input.trim() === "") {
			document.getElementById("error").style.display = "inline"; // show error
			return;
		}

		// otherwise hide error if successful
		document.getElementById("error").style.display = "none";
		const r = axios({
			method: "post",
			url: "http://127.0.0.1:8000/create",
			data: {
				task: inputTask.value,
			},
		}).then((res) => {
			setTasks(
				tasks.concat({
					_id: { $oid: res.data.id },
					task: inputTask.value,
				})
			);
			setInputValue("");
		});
	};

	return (
		<div className="App">
			<fieldset className="box">
				<legend>Todo</legend>

				<input
					type="text"
					placeholder="Task"
					id="inputTask"
					value={input}
					onChange={(e) => {
						setInputValue(e.target.value);
					}}
				/>
				<button onClick={addTask}>Add Task</button>
				<br />
				<span id="error" className="error">
					No se puede añadir tarea vacia
				</span>

				<Tasks tasks={tasks} setTasks={setTasks} />
			</fieldset>
		</div>
	);
}

export default App;
