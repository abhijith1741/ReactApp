import React, { useState } from "react";
import { ReactComponent as Delete } from "../../images/delete.svg";
import { ReactComponent as Revert } from "../../images/revert.svg";
import { ReactComponent as Tick } from "../../images/tick-green.svg";
import styled from "styled-components";
import Style from "./style.css"

function Todo() {
	const [tasks, setTask] = useState([]);
	const [input, setInput] = useState("");
	const [Completed, setComplete] = useState([]);
	const [counter, setCounter] = useState(1);

	let displayTask = () => {
		return tasks.map((task) => {
			return (
				<Li key={task.id}>
					<input type="radio" onClick={() => completedTask(task.id)} />
					{task.id}, {task.name}
					<Delete className="delete" onClick={() => deleteTask(task.id)}/>
				</Li>
			);
		});
	};

	let addTask = () => {
		setCounter((prevState) => prevState + 1);
		let newItem = {
			id: counter,
			name: input,
		};
        if(input){
            setTask([...tasks, newItem]);
		    setInput("");
        }
		
		console.log(tasks);
	};

	let deleteTask = (id) => {
		let filteredTask = tasks.filter((task) => {
			return task.id !== id;
		});
		setTask(filteredTask);
	};

	let completedTask = (id) => {
		let newItem = {};
		let filteredComplete = tasks.filter((task) => {
			return task.id == id;
		});
		filteredComplete.map((item) => {
			return (newItem.name = item.name), (newItem.id = item.id);
		});
		let filteredTask = tasks.filter((task) => {
			return task.id !== id;
		});
		setComplete([...Completed, newItem]);
		setTask(filteredTask);
		console.log("completed", Completed);
	};

	let displayCompleted = () => {
		return Completed.map((item) => {
			console.log("item", item);
			return (
				<li key={item.id}>
					<input type="radio" />
					<Tick />
					{item.id}, {item.name}
					<Revert onClick={() => revertItem(item.id)} />
					<Delete onClick={() => deleteCompletedTask(item.id)} />
				</li>
			);
		});
	};

	let deleteCompletedTask = (id) => {
		let filteredItem = Completed.filter((item) => {
			return item.id !== id;
		});
		setComplete(filteredItem);
	};
	let revertItem = (id) => {
		let new_item = {};
		let revertedItem = Completed.filter((item) => {
			return item.id == id;
		});
		revertedItem.map((item) => {
			return (new_item.id = item.id), (new_item.name = item.name);
		});
		let compltedItem = Completed.filter((item) => {
			return item.id !== id;
		});
		setComplete(compltedItem);
		setTask([...tasks, new_item]);
	};
	return (
		<Box>
			<h1>Todo List</h1>
			<ul>{displayTask()}</ul>
			<input
				placeholder="Type a new task"
				onChange={(e) => setInput(e.target.value)}
				value={input}
			/>
			<button onClick={addTask}>Add Task</button>
			<h1>Completed Task</h1>
			<ul>{displayCompleted()}</ul>
		</Box>
	);
}
const Box = styled.div`
	text-align: center;
	border: 1px solid black;
	margin: 42px 120px;
	width: 70%;
`;
const Li = styled.li`
    position: relative;
    right: 100px;
    
    list-style: none;
`;

const Ul = styled.ul`
width: "30px",
height: "15px",
position: "relative",
left: "100px",
`

export default Todo;
