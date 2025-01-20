import React, { useEffect, useState } from "react";

// create your first component
const Home = () => {
  const [text, setText] = useState([]); // Lista de tareas
  const [search, setSearch] = useState(""); // Tarea a agregar
  const username = "Lucrecia-15";

  const handleDelete = async (id) => {
    try {
      // Elimina solo la tarea correspondiente
      await fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
        method: "DELETE",
        body: JSON.stringify({ id }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Filtra las tareas localmente
      const newTodos = text.filter((todo) => todo.id !== id);
      setText(newTodos); // Actualiza el estado con las tareas restantes
      console.log("Tarea eliminada:", id); // Para verificar la eliminación
    } catch (err) {
      console.error("Error al eliminar tarea:", err);
    }
  };

  const AllDelete = async () => {

    await fetch(`https://playground.4geeks.com/todo/users/${username}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    setText([]);// Vacía el estado de las tareas
    createTodoList()
    console.log("Todas las tareas han sido eliminadas");
  }


  const addTask = async () => {
    if (search !== "") {
      const response = await fetch(
        `https://playground.4geeks.com/todo/todos/${username}`,
        {
          method: "POST",
          body: JSON.stringify({
            label: search,
            is_done: false,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      bringHomework(); // Vuelve a traer las tareas después de agregar la nueva
      setSearch(""); // Limpia el campo de entrada
    }
  };

  useEffect(() => {
    bringHomework();
  }, []);

  const bringHomework = async () => {
    // Aquí para obtener las tareas
    const response = await fetch(
      `https://playground.4geeks.com/todo/users/${username}`
    );
    if (response.ok) {
      const data = await response.json();
      setText(data.todos);
    } else {
      createTodoList();
      console.error("Error al traer las tareas:", response.statusText); //actualizo el estado de la API
    }
  };

  const createTodoList = async () => {
    // Para crear la lista de tareas si no existe
    const response = await fetch(
      `https://playground.4geeks.com/todo/users/${username}`,
      { method: "POST" }
    );
    const data = await response.json();
  };

  return (
    <div className="text">
      <h1 className="todoList">Todo list!</h1>
      <input
        type="text"
        className="write"
        placeholder="Escriba aquí!"
        value={search}
        onChange={(event) => setSearch(event.target.value)} // Actualiza el estado de la tarea
        onKeyDown={(event) => {
          if (event.key === "Enter" && search !== "") {
            console.log("Ahora agrego la tarea en la API");
            addTask();
          }
        }}
      />
      <ul>
        {text.map((texts) => {
          return (
            <li className="list" key={texts.id}>
              {texts.label}{" "}
              <button className="Button" onClick={() => {
                console.log("Eliminar la tarea: " + texts.id);
                handleDelete(texts.id); // Elimina la tarea al hacer clic usando su ID
              }}
              >
                X
              </button>
            </li>
          );
        })}
      </ul>
      <button className="AllDelete" onClick={AllDelete}>
        Delete All
      </button>
    </div>
  );
};

export default Home;
