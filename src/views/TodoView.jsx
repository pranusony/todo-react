import React from "react";
import {todoModel} from "../models/TodoModel";
import {ModelEvents} from "../constants";
import {TodoListItemView} from "./TodoListItemView.jsx";

export class TodoView extends React.Component {

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
    handleFilterListItems(filterType){
       this.setState({filterType:filterType})

    }

    render() {

        var filteredTodoItems = todoModel.todoItems;
         if(this.state.filterType)
         {
            filteredTodoItems=todoModel.todoItems.filter((todoItem)=>{
                 if(this.state.filterType == "active" && todoItem.completed == false){
                     return true;
                 }
                 else if(this.state.filterType == "completed" && todoItem.completed == true){
                     return true;
                 }
                 else if(this.state.filterType == "all"){
                     return true;
                 }

                 return false;

             })
         }
        const listItems = filteredTodoItems.map((todoItem,index) =>{

            return <TodoListItemView todoItem={todoItem} key={index}   filterType={this.state.filterType} />

        }



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

                    <li><a href="#/all" className={this.state.filterType === "all"?"selected":""} onClick={()=>{this.handleFilterListItems('all')}} >All</a></li>
                    <li><a href="#/active"  className={this.state.filterType === "active"?"selected":""} onClick={()=>{this.handleFilterListItems('active')}}>Active</a></li>
                    <li><a href="#/completed"  className={this.state.filterType === "completed"?"selected":""}   onClick={()=>{this.handleFilterListItems('completed')}}>Completed</a></li>
                </ul>
                <button className="clear-completed"  style={{display: todoModel.completedTodoItemsCount > 0 ?'block':'none'}} onClick={()=>{this.handleClearCompletedClicked()}}>Clear completed</button>
            </footer>
        </div>
    }

}