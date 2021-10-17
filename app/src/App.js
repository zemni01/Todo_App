import React, { useState, useEffect } from 'react';
import todos from './apis';
import Form from './components/Form';
import Section from './components/Section';
import List from './components/List';

const appTitle = 'Houssem To-Do App';


const App = () => {
    const [todolist, settodolist] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const { data } = await todos.get("/todos");
            settodolist(data); 
        }
        fetchData();
    }, []);

    const addTodo = async (item) => {
        const { data } = await todos.post("/todos/", item);
        settodolist((oldList) => [...oldList, data]);
    };

    const removeTodo = async (id) => {
        await todos.delete("/todos/" + id); 
        settodolist((oldList) => oldList.filter((item) => item._id !== id));
    }

    const editTodo = async (id, item) => {
        const { data } = await todos.put(`/todos/${id}`, item);
        console.log(data);
    };

    return (
        <div className='ui container center aligned'>
            <Section>    
                <h1>{appTitle}</h1>
            </Section>
            <Section>
                <Form addTodo={addTodo} />
            </Section>
            <Section>
                <List 
                    editTodoListProp={editTodo}
                    removeTodoListProp={removeTodo} 
                    list={todolist} 
                />
            </Section>
        </div>
    );
};


export default App;