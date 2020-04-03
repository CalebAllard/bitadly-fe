import React,{useState} from 'react';
// components
import Login from './forms/Login';
import Signup from './forms/Signup';

const InitialPage = (props) => {
    const [toggleLogin, setToggleLogin ] = useState(true);
    
    return (
        <>
        {toggleLogin &&
        <div className="container">
            <h1>Bitadly</h1>
            <Login push={props.history.push}/>
            <p id='toggle' onClick={() => setToggleLogin(!toggleLogin)}>Sign Up</p>
        </div>
        }
        {!toggleLogin &&
        <div className="container">
            <h1>Bitadly</h1>
            <Signup toggle={setToggleLogin} toggleLogin={toggleLogin}/>
            <p id='toggle' onClick={() => setToggleLogin(!toggleLogin)}>Log in</p>
        </div>
        }
        
        
        </>
    );

};

export default InitialPage;