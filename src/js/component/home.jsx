import React, { useEffect, useState } from "react";

//create your first component
const Home = () => {
	const [text, setText] = useState('');
	const [search, setSearch] = useState([]);
	const username = 'Lucrecia-15';

	const handleChange = (e) => {
		setText(e.target.value);
	};

	const handleKeyDown = (e) => {
		if (e.key === 'Enter') {
			const newTask = { label: text, is_done: false };
			setSearch(prevSearch => [...prevSearch, newTask]);
			setText('');
			addTask(newTask);
		}
	};

	const handleDelete = async (index) => {
		try {
			const newTodos = search.filter((_, i) => i !== index);
			setSearch(newTodos);
			// Actualización de tareas
			fetch(`https://playground.4geeks.com/todo/todos/${username}`, {
				method: "PUT",
				body: JSON.stringify(newTodos),
				headers: {
					"Content-Type": "application/json"
				}
			})
				.then(resp => resp.json())
				.then(data => {
					console.log(data); // Muestra la respuesta del servidor después de la actualización
				})
				.catch(error => {
					console.error("Error al sincronizar las tareas:", error);
				});
		} catch (err) {
			console.error("Error al eliminar tarea:", err);
		}
	};

	const AllDelete = async () => {
		setSearch([]);
		// La eliminación de todas las tareas
		fetch(`https://playground.4geeks.com/todo/todos/${username}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(resp => resp.json())
			.then(data => {
				console.log(data); // Muestra la respuesta del servidor
			})
			.catch(error => {
				console.error("Error al eliminar todas las tareas:", error);
			});
	}

	const addTask = () => {
		const newTask = { label: text, is_done: false };
		const updatedTodos = [...search, newTask];
		setSearch(updatedTodos);
		setText('');

		const options = {
			method: "PUT",
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(updatedTodos)
		};

		// Aquí para para agregar tareas
		fetch(`https://playground.4geeks.com/todo/todos/${username}`, options)
			.then(response => response.json())
			.then(data => {
				console.log("Tareas sincronizadas:", data);
			})
			.catch(err => console.error("Error al agregar tarea:", err));
	};

	const bringHomework = async () => {
		try {
			// Aquí para obtener las tareas
			const response = await fetch(`https://playground.4geeks.com/todo/todos/${username}`);
			if (response.ok) {
				const data = await response.json();
				setSearch(data);
			} else {
				await createTodoList();
				setSearch([]);
			}
		} catch (err) {
			console.error("Error al cargar las tareas:", err);
		}
	};

	const createTodoList = async () => {
		try {
			// Para crear la lista de tareas
			const response = await fetch(`https://playground.4geeks.com/todo/todos/${username}`, { method: "POST" });
			if (response.ok) {
				console.log("Lista de tareas creada con éxito");
			} else {
				console.error("Error al crear la lista de tareas:", response.status);
			}
		} catch (err) {
			console.error("Error al crear la lista de tareas:", err);
		}
	};

	useEffect(() => {
		bringHomework();
	}, []);

	return (
		<div className="text">
			<h1 className="todoList">Todo list!</h1>
			<div className="container"><img src="https://img.freepik.com/foto-gratis/fondo-pantalla-abstracto-nebulosa-ultra-detallado-6_1562-751.jpg" alt="" />
				<div className="card-container glass-effect">
					<input
						type="text"
						className="write"
						placeholder="Escriba aquí!"
						value={text}
						onChange={handleChange}
						onKeyDown={handleKeyDown}
					/>
					<ul className="list">
						{search.length === 0 ? (
							<div className="tarea">"No hay tareas pendientes"</div>
						) : (
							search.map((item, index) => (
								<li key={index}>
									{item.label}
									<button className="delete" onClick={() => handleDelete(index)}>✘</button>
								</li>
							))
						)}
					</ul>
					<button className="AllDelete" onClick={AllDelete}>Delete All</button>
				</div>
			</div>
		</div>
	);
};

export default Home;
