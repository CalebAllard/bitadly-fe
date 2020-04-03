import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {axiosWithAuth} from '../../util/axioswithAuth';
const Login = (props) => {
    const [pw,setPw] = useState('');
    const { register, handleSubmit, errors  } = useForm();
    const onSubmit = values => {
        
        axiosWithAuth().post('/auth/reg',values)
            .then(ret => {
               props.toggle(!props.toggleLogin);
            });
    }
    function pwValidation(value){
        if (value === pw){
            return true;
        }else{
            return false;
        }
    }
    return(
        <div className='form-container'>
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit(onSubmit)} >
                {errors.username && errors.username.type === 'required' && <p>This is required</p>}
                <input name="username" id="username" placeholder="User name" ref={register({required: 'Required'})}/>
                {errors.email && errors.email.type === 'required' && <p>This is required</p>}
                {errors.email && errors.email.type === 'pattern'  && errors.email.message}
                <input name="email" id="email" placeholder="Email" 
                ref= { register(   
                         { required: 'Required',
                           pattern: {
                             value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                             message: "invalid email address"
                        }})}/>
                {errors.password && errors.password.type === 'required' && <p>This is required</p>}
                {errors.password && errors.password.type === 'validate' && <p>Password must match</p>}
                <input name="password" id="password" type="password" placeholder="Password" ref={register({required: 'Required', validate: pwValidation})}/>
                <input name="password" id="password02" type="password" placeholder="Confirm Password" onChange={(e) => {setPw(e.target.value)}}/>
                <button>Submit</button>
                
            </form>
            
        </div>
    );
};

export default Login;