import React, { useEffect, useState } from "react";


//create your first component
const Home = () => {
	const [text, setText] = useState('')
	const [search, setSearch] = useState([])
	const handleChange = (e) => {
		setText(e.target.value);
	};

	const handleKeyDown = (e) => {
		if (e.key === 'Enter') {

			setSearch([...search, text]);
			setText('');

		}

	};


	const handleDelete = (index) => {
		setSearch(search.filter((_, i) => i !== index));
	}


	return (
		<div className="text">
			<h1 className="todoList">Todo list!</h1>
			<div className="container">
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
								{item}
								<button className="delete" onClick={() => handleDelete(index)}>✘</button>
							</li>
						))
					)}
				</ul>
			</div>
		</div>
	);
};
export default Home