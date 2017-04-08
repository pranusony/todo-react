import React from "react";
import {todoModel} from "../models/TodoModel";
import {ModelEvents} from "../constants";


export class TodoListItemView extends React.Component {

         handleRemoveListItem() {
             todoModel.removeTodo(this.props.todoItem);
        }
    handleStrikeThroughListItem(event){
        todoModel.markTodoCompleted(event.target.checked, this.props.todoItem);
    }
    edit(event) {
        var listItem = event.currentTarget;
        this.setState({editing:true})
    }
    editText(event){
        var key = event.keyCode || event.which;
        if (key == 13) {
            var editInput = event.target;
            this.handleEditingDone(editInput);
        }
    }
    handleEditingDone(editInput){
        todoModel.editTodo(this.props.todoItem, editInput.value)
        this.setState({editing:false})
    }


    render() {
        let liClassName =this.props.todoItem.completed?"completed":"";
        if(this.state && this.state.editing) {
            liClassName = liClassName + " editing";
        }
        return <li className={liClassName} style={{display: this.props.display == true ?'block':'none'}} onDoubleClick={(event)=>{this.edit(event)}}>
            <div className="view">
                <input type="checkbox" className="toggle" checked={this.props.todoItem.completed} onClick={(event)=>{this.handleStrikeThroughListItem(event)}}/>
                <label>{this.props.todoItem.description} </label>
                <button className="destroy"onClick={()=>{this.handleRemoveListItem()}}></button>
            </div>
            <input className="edit" onKeyUp={(event)=>{this.editText(event)}} defaultValue={this.props.todoItem.description}/>
        </li>
    }

}