import React, { Component } from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router'
import { Switch, Route, Redirect, Link } from 'react-router-dom';

const Routes = (props) => {   
    return (   
        <main> 
            <Switch>
                <Route exact path='/' component={()=><div>First Page</div>} />               
            </Switch>
        </main>
    )  
}
 
export default Routes;
