import React from "react";
const axios = require("axios").default;
const RemoveTaskButton = ({ id, tasks, setTasks }) => {
	const removeTask = () => {
		setTasks(tasks.filter((task) => task._id["$oid"] !== id));
		axios({
			method: "post",
			url: "http://127.0.0.1:8000/delete",
			data: {
				id: id,
			},
		});
	};

	return (
		<button onClick={removeTask} className="remove-btn">
			<i className="fas fa-trash"></i>
		</button>
	);
};

export default RemoveTaskButton;
