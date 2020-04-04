import React from 'react';
import {axiosWithAuth} from '../../util/axioswithAuth';
import {useForm} from 'react-hook-form';

const Login = (props) => {
    const { register, handleSubmit, errors  } = useForm();
    const onSubmit = values => {
        axiosWithAuth().post('/auth/login',values)
            .then((ret) => {
                localStorage.setItem('token', ret.data.session);
                props.push(`/dashboard/${ret.data.user.username}`);
            });
    }
    return(
        <div className='form-container'>
            <h2>Log In</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
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
                <input name="password" id="password" type="password" placeholder="Password"ref={register({required: 'Required',})}/>
                
                
                <button>Submit</button>
                
            </form>
            
        </div>
    );
};

export default Login;