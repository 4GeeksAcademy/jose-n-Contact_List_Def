import React, {useContext,useState,useEffect} from 'react'
import { Context } from '../store/appContext'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'

export const EditContact = () => {

    const {store,actions} = useContext(Context)



    const [contacto,setContacto] = useState({...store.currentContact })
    const navigate = useNavigate();

    const handleSaveLocalContact = (e) => {

		setContacto({...contacto,[e.target.name]:e.target.value});


	};

    const handleSaveNewContact = async () => {
        try {
            await actions.modificarContacto(contacto);
            alert('Contacto modificado satisfactoriamente');
            navigate('/');
            
        } catch (error) {
            console.error(error);
            
        }
     
    }

    useEffect(() => {
        actions.getContacto();
    }, []);
        


  return (
            <div className='container d-flex flex-column'>
    
            <div className='row d-flex justify-content-center'>
                <div className='col-6'>
                    <h1 className='text-center'>Modify Contact</h1>
                </div>
            </div>
    
            <div className='row'>
                <label htmlFor="name">Full Name</label>
                <input type="text" placeholder='Full Name' name='name' value={contacto.name} onChange={handleSaveLocalContact} />
            </div>
    
            <div className='row'>
                <label htmlFor="email">Email</label>
                <input type="email" placeholder='Enter email' name='email' value={contacto.email} onChange={handleSaveLocalContact} />
            </div>
    
            <div className='row'>
                <label htmlFor="phone">Phone</label>
                <input type="number" placeholder='Enter phone' name='phone' value={contacto.phone} onChange={handleSaveLocalContact} />
            </div>
    
            <div className='row mb-2'>
                <label htmlFor="address">Address</label>
                <input type="text" placeholder='Enter Address' name='address' value={contacto.address} onChange={handleSaveLocalContact} />
            </div>
    
            <div className='row'>
                <button type='button' className='btn btn-primary' onClick={ handleSaveNewContact }>Save Modifications</button>
            </div>
    
            <Link to="/">
                        <button className="btn btn-warning my-2">Get Back to Contacts</button>
            </Link>
    
        </div>

  )
}
