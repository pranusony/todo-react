import {TodoModel} from "../models/TodoModel";
import React from 'react';
import {TodoView} from "./TodoView.jsx"

export class App extends React.Component {

    render(){
        return <TodoView />
    }
}