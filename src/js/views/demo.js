import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

import "../../styles/demo.css";

export const Demo = () => {

	const { store, actions } = useContext(Context);
    const navigate = useNavigate();

	const [contacto,setContacto] = useState({
		name:"",
		phone: "",
		email: "",
		address: "",

	})
	

	const handleSaveLocalContact = (e) => {

		setContacto({...contacto,[e.target.name]:e.target.value});


	};

	const handleSave = async (contacto) => {

        try {
           await actions.crearContactos(contacto.name,contacto.phone,contacto.email,contacto.address); 
            alert("Se agrego el contacto, volviendo al principal");  
            navigate('/')          
        } catch (error) {
            console.error(error)    
        }

	};

	return (

		<div className='container d-flex flex-column'>

        <div className='row d-flex justify-content-center'>
            <div className='col-6'>
                <h1 className="text-center">Add a New Contact</h1>
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
            <button type='button' className='btn btn-primary' onClick={ ()=> handleSave(contacto)}>Save</button>
        </div>

		<Link to="/">
                <button className="btn btn-warning my-2">Get Back to Contacts</button>
        </Link>

    </div>

	)

};
