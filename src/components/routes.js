import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

//==========components========
import StudentHome from './StudentHome';
import Header from './Header';

export default (

    <Switch>
    <Route path="/" Component={ Header } /> 
    <Route path="/studenthome" component={StudentHome} /> 
    {/* <Route path="/" Component={Header} /> 
    <Route path="/" Component={Header} /> 
    <Route path="/" Component={Header} /> 
    <Route path="/" Component={Header} /> 
    <Route path="/" Component={Header} /> 
    <Route path="/" Component={Header} /> 
    <Route path="/" Component={Header} /> 
    <Route path="/" Component={Header} /> 
    <Route path="/" Component={Header} /> 
    <Route path="/" Component={Header} /> 
    <Route path="/" Component={Header} />  */}
</Switch>

)

