import React, {useEffect, useState} from "react";
import AddTodo from "../AddTodo/AddTodo";
import Todo from "../Todo/Todo";
import styles from './TodoList.module.css';

export default function TodoList({ filter }) {
    const [todos, setTodos] = useState(() => readTodosFromLocalStorage());

    const handleAdd = (newTodo) => {setTodos([...todos, newTodo])}
    const handleUpdate = (updatedTodo) => setTodos(todos.map(t => t.id === updatedTodo.id ? updatedTodo : t));
    const handleDelete = (deletedTodo) => setTodos(todos.filter((t) => t.id !== deletedTodo.id));

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    const filtered = getFilteredItems(todos, filter);
    return (
        <section className={styles.container}>
            <ul className={styles.list}>
                {
                    filtered.map(item =>
                        <Todo
                            key={item.id}
                            todo={item}
                            onUpdate={handleUpdate}
                            onDelete={handleDelete}
                        >
                        </Todo>
                    )
                }
            </ul>
            <AddTodo onAdd={handleAdd}></AddTodo>
        </section>
    );
}

function readTodosFromLocalStorage() {
    console.log("일한다.... 일..");
    const todos = localStorage.getItem('todos');
    return todos ? JSON.parse(todos) : [];
}

function getFilteredItems(todos, filter) {
    if (filter === 'all') {
        return todos;
    }

    return todos.filter(todo => todo.status === filter);
}
