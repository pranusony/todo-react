/**
 * Created by varunreddy on 4/5/17.
 */
import "./styles/style.css"
import React from 'react'
import ReactDOM from "react-dom"
import {App} from "./views/App.jsx";
import {TodoModel} from "./models/TodoModel";



ReactDOM.render(React.createElement(App), document.getElementsByClassName("todoapp")[0]);