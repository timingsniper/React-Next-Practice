import React, { useEffect, useState } from "react";
import AddTodo from "../AddTodo/AddTodo";
import Todo from "../Todo/Todo";
import styles from "./TodoList.module.css"

export default function ToDoList({ filter }) {
  const [toDos, setToDos] = useState(() => readTodosFromLocalStorage());

  const handleAdd = (added) => {
    setToDos([...toDos, added]);
  }

  const handleUpdate = (updated) => {
    setToDos(toDos.map((t) => {
        return t.id === updated.id ? updated : t;
    }))
  }

  const handleDelete = (deleted) => {
    setToDos(toDos.filter(t => {
        return t.id !== deleted.id;
    }))
  }

  const getFilteredItems = (todos, filter) => {
    if(filter === "all") {
        return todos;
    }
    else {
        return todos.filter((t) => {
            return t.status === filter;
        })
    }
  }

  const filtered = getFilteredItems(toDos, filter);

  useEffect(() => {
    localStorage.setItem('toDos', JSON.stringify(toDos));

  }, [toDos]);

  return (
    <section className={styles.container}>
      <ul className={styles.list}>
        {filtered.map((item) => {
          return (
            <Todo
              key={item.id}
              todo={item}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />
          );
        })}
      </ul>
      <AddTodo onAdd={handleAdd} />
    </section>
  );
}

function readTodosFromLocalStorage() {
  const todos = localStorage.getItem('toDos');
  return todos ? JSON.parse(todos) : [];
}