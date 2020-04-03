import React from 'react';
import './scss/index.scss';
import PrivateRoute from './util/PrivateRoute';
import {BrowserRouter as Router, Route} from 'react-router-dom';
//components
import InitialPage from './components/InitialPage';
import Dashboard from './components/Dashboard';
//context
import { UserProvider } from "./context/UserContext";


function App() {
  return (
    <UserProvider>
      <Router>
        <Route path='/' component={InitialPage} exact/>
        <PrivateRoute path='/dashboard/:username' component={Dashboard}/>
      </Router>
    </UserProvider>
  );
}

export default App;
