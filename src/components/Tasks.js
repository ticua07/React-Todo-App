import React from "react";
import RemoveTaskButton from "./RemoveTaskButton";
import "./TasksCSS.css";
const axios = require("axios").default;

const Tasks = ({ tasks, setTasks }) => {
	const updateTask = (target, id) => {
		let clean_target = target.innerText.replace(/[\r\n]/g, "").trim();
		if (clean_target == "") {
			document.getElementById("error").innerText =
				"No se puede editar una nota con contenido vacio";
			document.getElementById("error").style.display = "inline";
			console.log(id);
			axios({
				method: "post",
				url: "http://127.0.0.1:8000/item",
				data: {
					id: String(id),
				},
			}).then((res) => {
				target.innerText = res.data.task;
			});
			return;
		}
		document.getElementById("error").style.display = "none";
		axios({
			method: "post",
			url: "http://127.0.0.1:8000/update",
			data: {
				id: id,
				newTask: clean_target,
			},
		});
	};

	return (
		<div>
			<ul>
				{tasks.map((task) => {
					//       task  id objectid
					console.log(task);
					let id = task._id.$oid;
					if (id === undefined) {
						return;
					}
					return (
						<div key={id}>
							<li
								contentEditable={true}
								onBlur={(r) => {
									updateTask(r.target, id);
								}}
								suppressContentEditableWarning={true} //* I know what i'm doing, Thanks for the warning though react
							>
								{task.task}
							</li>
							<RemoveTaskButton
								id={id}
								tasks={tasks}
								setTasks={setTasks}
							/>
						</div>
					);
				})}
			</ul>
		</div>
	);
};

export default Tasks;
