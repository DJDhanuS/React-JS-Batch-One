import React from 'react';
import { TodoItem } from '.';

import axios from 'axios';

export default class Todos extends React.Component {
  state = {
    todos: [],
    newTodoText: ''
  };

  handleClick = (e) => {
    let { newTodoText } = this.state;
    axios.post('http://localhost:3030/todos/', {text: newTodoText, completed: false})
      .then(response => {
        this.setState({
          todos: response.data,
          newTodoText: ''
        });
      });
  }

  handleChange = (e) => {
    this.setState({
      newTodoText: e.target.value
    });
  }

  handleCheckbox = (i, e) => {
    let { todos } = this.state;
    todos[i].completed = !todos[i].completed;
    this.setState({
      todos: todos
    });
  }

  getCompletedTodos = () => {
    return this.state.todos.filter(todo => todo.completed).length;
  }

  deleteTodo = (i) => {
    let { todos } = this.state;
    todos.splice(i, 1);
    this.setState({
      todos
    });

    axios.delete(`http://localhost:3030/todos/${i}`)
      .then(response => {

      });
  }

  componentDidMount() {
    axios.get('http://localhost:3030/todos/')
      .then((response) => {
        this.setState({
          todos: response.data
        });
      });
  }

  render() {
    return (
      <div>
        <h2>Todos Component</h2>
        Enter todo: <input type="text" onChange={this.handleChange} value={this.state.newTodoText} />
        <button onClick={this.handleClick}>Add</button>
        
        <h3>Todos: ({this.getCompletedTodos()} / {this.state.todos.length})</h3>
        <ul>
          {
            this.state.todos.map((todo, i) => (
              <li>
                {/* <input type="checkbox" onClick={() => this.handleCheckbox(i)} checked={todo.completed} />
                {todo.text}
                <button onClick={() => this.deleteTodo(i)}>x</button> */}
                <TodoItem data={todo} id={i} del={this.deleteTodo} change={this.handleCheckbox} />
              </li>
            ))
          }
        </ul>
      </div>
    );
  }
}