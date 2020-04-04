import React, {useEffect, useContext} from 'react';
import {Link} from 'react-router-dom';
import {UserContext} from '../context/UserContext';
import {axiosWithAuth} from '../util/axioswithAuth';

// components 
import UrlList from './UrlList';

const Dashboard = (props) => {
    const {addUser} = useContext(UserContext);
    const {user} = useContext(UserContext);
    const me  = props.match.params.username
        
    useEffect( () => {
            const payload = {
                username: me
            }
            
            axiosWithAuth().post('/users', payload)
                .then(ret => {
                    console.log('user hit')
                    addUser(ret.data);
                })
                .catch(err => {
                    console.log(err);
                })
        },[]);
    
    return(<>
        
        <div className="dashboard-container">
        
            <div className="header-dashboard">
                <h1>Bitadly</h1>
                <nav>
                {/* <Link>Manage Urls</Link> */}
                </nav>
                
            </div>
            <section className="content">
            {user && user.username && <h2><span>{user.username}'s</span> Dashboard</h2>}
            {user && user.id && 
            <UrlList id={user.id} />
            }
            
            </section>
           

        </div>
    
    
    </>);
}
export default Dashboard;