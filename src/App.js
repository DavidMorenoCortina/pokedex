import React, {Component} from 'react';
import {Route, Switch} from "react-router";
import Index from "./pages/Index";

class App extends Component {
    render() {
        return (
            <div>
                <div className="bg-upper-decoration"/>
                <div className="bg-upper-decoration right"/>
                <div className="bg-lower-decoration"/>
                <div className="bg-lower-decoration right"/>

                <div className="container">
                    <Switch>
                        <Route exact path={process.env.PUBLIC_URL + "/"} component={Index}/>
                        <Route exact path={process.env.PUBLIC_URL + "/pokemon/:searchTerm/:id"} component={Index}/>
                    </Switch>
                </div>
            </div>
        );
    }
}

export default App;
