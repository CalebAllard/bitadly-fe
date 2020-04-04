import React, {useEffect,useState,useContext} from 'react';
import {axiosWithAuth} from '../util/axioswithAuth';
import { UserContext } from '../context/UserContext';
import { CopyToClipboard } from 'react-copy-to-clipboard';
//font awsome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';

const UrlList = (props) => {
    const { user } = useContext(UserContext);
    const [urls, setUrls] = useState();
    const [toggle,setToggle] = useState(false);
    const [createForm, setCreateForm] = useState();
    const handleChange = (e) => {
        setCreateForm(e.target.value);
        
    }
    const toggleEdit = () => {
        setToggle(!toggle);
    }
    
    const createURL = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const payload = {
            user_id:user.id,
            target_url: createForm
        }
        axiosWithAuth().post('/urls',payload).then(ret => {
            setUrls([
                ...urls,
                ret.data
                
            ])
            
            
        }).catch(err => console.log(err))
        setToggle(!toggle);
    }
    
    useEffect(() => {
        if(!urls){
        axiosWithAuth().get(`/urls/${props.id}`)
        .then(ret => {
            
            setUrls( ret.data );
        })};

    },[]);


    return(
        <div className='table'>  
                {toggle && 
                <div className='modal'>
                    <h4>Add Target Url</h4>
                    <form onSubmit={createURL}>
                        <input name='target_url' type="text" placeholder='target url' onChange={handleChange}/>
                        <div>
                        <button>submit</button>
                        <button type='button' onClick={() => setToggle(!toggle)}>cancel</button>
                        </div>
                    </form>
                </div>
                                }
                <h3>Your Urls</h3> <button onClick={toggleEdit}>Add Url</button>
                <table>
                    <thead>
                        <tr>
                        <th>Target Url</th>
                        <th>Tiny Url</th>
                        <th>ADS Running</th>
                        </tr>
                    </thead>
                    <tbody>
                    {!urls && 
                        <tr><td>Loading...</td></tr>
                    }
                    {urls && urls.map(url =>
                        <tr key={url.id}>
                            <td>{url.target_url.substring(0,42) + '...'}</td>
                            <td><span>{url.short_url}</span>
                            <CopyToClipboard 
                                text={url.short_url}
                                onCopy={() => alert(url.short_url + '  copied to clipboard')}>
                                <span className='icon-copy'><FontAwesomeIcon icon={faCopy}/></span>
                            </CopyToClipboard></td>
                            
                        </tr>
                    )}
                        
                    
                    {/* <tr>
                        <td>https://www.google.com/search?sxsrf=ALeKk020eSDwjDCILzDPMPL</td>
                        <td>http://www.bitadly.com/tiny url</td>
                        <td>No</td>
                    </tr> */}
                    </tbody>

                
                </table>
        </div>

    );

}

export default UrlList;