import React, { Component } from 'react';
import './App.css';

// HELPER
import { getTodoItemsFromLocalStorage, saveTodoItemsToLocalStorage } from './helper';

class App extends Component {

  state = {
    todoList: []
  }

  // React Life Cycle
  componentDidMount() {
    if (localStorage.getItem('todoList')) {
      this.setState({
        todoList: getTodoItemsFromLocalStorage('todoList')
      })
    }
  }

  addTodoItem = (event) => {
    var todoValue = event.target.elements.addTodo.value;

    console.log(todoValue);
    if (todoValue.length > 0) {
      this.setState({
        todoList: [...this.state.todoList, todoValue]
      }, () => {

        // Save to localStorage
        saveTodoItemsToLocalStorage('todoList', this.state.todoList);
      })

      event.target.reset();
    }
    event.preventDefault();
  }

  editTodoItem = (event, index) => {

  }

  deleteTodoItem = (event, index) => {
    var taskArray = [...this.state.todoList];
    taskArray.splice(index, 1);
    this.setState({ todoList: taskArray }, () => {

      // Save to localStorage
      saveTodoItemsToLocalStorage('todoList', this.state.todoList);
    });
  }

  render() {
    return (
      <div>
        <div className="jumbotron jumbotron-fluid py-2">
          <div className="container">
            <h1 className="display-2">
              Todo App
          </h1>
          </div>
        </div>

        <form className="mb-3" onSubmit={this.addTodoItem}>
          <div className="input-group mb-3">
            <input type="text" name="addTodo" className="form-control" placeholder="Please enter your task" autoComplete="off" />
            <div>
              <button type="submit" className="btn btn-outline-success"> Add Todo</button>
            </div>
          </div>
        </form>

        <ul className="list-group">
          {
            this.state.todoList.map((item, index) => {
              return <li className="list-group-item" key={index}>
                {item}

                <button className="btn btn-sm btn-outline-danger float-right" onClick={(event) => { this.deleteTodoItem(event, index) }}> <i className="fa fa-trash" aria-hidden="true"></i></button>
                {/* <button className="btn btn-sm btn-outline-primary float-right mr-2" onClick={(event) => { this.editTodoItem(event, index) }}><i className="fa fa-pencil" aria-hidden="true"></i></button> */}
              </li>
            })
          }
        </ul >

      </div >
    );
  }
}

export default App;
