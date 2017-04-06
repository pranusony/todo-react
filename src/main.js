/**
 * Created by varunreddy on 4/5/17.
 */
import React from 'react'
import ReactDOM from "react-dom"
import {Hello} from './views/Hello'

class App extends React.Component {
    render(){
        return(
            <div>
                <Hello/>
            </div>
        )
    }
}
ReactDOM.render(<App/>, document.getElementById("app"))