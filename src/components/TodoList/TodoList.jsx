import React, {useState} from "react";
import AddTodo from "../AddTodo/AddTodo";
import Todo from "../Todo/Todo";
import styles from './TodoList.module.css';

export default function TodoList({ filter }) {
    const [todos, setTodos] = useState(
        [
            { id: '123', text: '장보기', status: 'active' },
            { id: '124', text: '치킨먹기', status: 'active' },
        ]
    );
    const handleAdd = (newTodo) => {setTodos([...todos, newTodo])}
    const handleUpdate = (updatedTodo) => setTodos(todos.map(t => t.id === updatedTodo.id ? updatedTodo : t));
    const handleDelete = (deletedTodo) => setTodos(todos.filter((t) => t.id !== deletedTodo.id));

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
                    </Todo>)
                }
            </ul>
            <AddTodo onAdd={handleAdd}></AddTodo>
        </section>
    );
}

function getFilteredItems(todos, filter) {
    if (filter === 'all') {
        return todos;
    }

    return todos.filter(todo => todo.status === filter);
}
