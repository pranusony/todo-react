import React from "react";
import {todoModel} from "../models/TodoModel";
import {ModelEvents} from "../constants";
import {TodoListItemView} from "./TodoListItemView.jsx";

export class TodoView extends React.Component {
    _toggleAll;
    constructor(){

        super();
        this.state = {
            todoItems: todoModel.todoItems
        };
        todoModel.subscribe(ModelEvents.TODO_ADDED,() => {
            this.setState({todoItems: todoModel.todoItems})
        })
        todoModel.subscribe(ModelEvents.TODO_REMOVED,() =>{
            this.setState({todoItems: todoModel.todoItems})
        })
        todoModel.subscribe(ModelEvents.MARK_ALL_COMPLETED,()=>{
            this.setState({todoItems: todoModel.todoItems})
        })
        todoModel.subscribe(ModelEvents.REMOVE_ALL_COMPLETED,()=>{
            this.setState({todoItems: todoModel.todoItems})
        })
        todoModel.subscribe(ModelEvents.MARK_TODO_COMPLETED,()=>{
            this.setState({todoItems: todoModel.todoItems})
        })
        todoModel.subscribe(ModelEvents.TODO_EDITED,()=>{
            this.setState({todoItems: todoModel.todoItems})
        })
    }

    handleTodoEnter(event){
        var key = event.nativeEvent.keyCode || event.nativeEvent.which;
        if (key == 13) {
            todoModel.addTodo(event.target.value);
        }
    }
    handleToggleAllClicked(event){
        todoModel.markAllCompleted(event.target.checked);
    }
    handleClearCompletedClicked(){
        todoModel.removeAllCompleted();
    }

    render() {

        const listItems = todoModel.todoItems.map((todoItem,index) =>
            <TodoListItemView todoItem={todoItem} key={index} className ={todoItem.completed}/>
        );


        return <div>
            <header className="header"><h1>todos</h1>
                <input className="new-todo" onKeyUp={(event)=>{this.handleTodoEnter(event)}} placeholder="what needs to be done?" autoFocus=""/>
            </header>
            <section className="main">
                <input type="checkbox" className=" toggle-all"
                       style={{display:todoModel.todoItems.length>0?'block':'none'}}
                       onClick={(event)=>{this.handleToggleAllClicked(event)}}
                       checked={todoModel.todoItems.length === todoModel.completedTodoItemsCount}
                />
                <label htmlFor="toggle-all">Mark all as complete</label>
                <ul className="todo-list">{listItems}</ul>
            </section>
            <footer className="footer" style={{display: todoModel.todoItems.length > 0 ?'block':'none'}}>
                <span className="todo-count">{todoModel.activeTodoItemsCount}</span>
                <ul className="filters">
                    <li><a href="#/" className="selected" id="all">All</a></li>
                    <li><a href="#/" className="Active" id="active">Active</a></li>
                    <li><a href="#/" className="completed" id="completed">Completed</a></li>
                </ul>
                <button className="clear-completed"  style={{display: todoModel.completedTodoItemsCount > 0 ?'block':'none'}} onClick={()=>{this.handleClearCompletedClicked()}}>Clear completed</button>
            </footer>
        </div>
    }

}