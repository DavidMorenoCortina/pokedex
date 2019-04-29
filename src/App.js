import React, {Component} from 'react';
import SearchBar from "./Components/SearchBar";
import {Route, Switch} from "react-router";
import Index from "./pages/Index";

class App extends Component{
    render() {
        return (
            <div>
                <div className="bg-upper-decoration"/>
                <div className="bg-upper-decoration right"/>
                <div className="bg-lower-decoration"/>
                <div className="bg-lower-decoration right"/>

                <div className="container">
                    <SearchBar/>

                    <Switch>
                        <Route exact path="/" component={Index}/>
                        <Route exact path="/pokemon/:id" component={Index}/>
                    </Switch>
                </div>
            </div>
        );
    }
}

export default App;
