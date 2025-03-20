import React, { useContext, useEffect } from "react";
import rigoImage from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { Context } from "../store/appContext"; // Asegúrate de importar el contexto correcto
import { useNavigate } from 'react-router'

export const Home = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();


  const handleModificar = async(id) => {
    try {

      await actions.getContacto(id);
      navigate("./editcontact");

    }

    catch(error){
      console.log(error);
    }


  }

  useEffect(() => {
    if (!store.contacts.length > 0 ){
      actions.getContactos();
    }

 
  }, []);

  return (
    <div className='d-flex flex-column'>

      <div className='container-fluid'>
        {store.contacts.map((contact, index) => {
          return (
            <div key={index} className="card mb-3" >
              <div className="row g-0">
                <div className="col-md-4">
                  <img src={rigoImage} className="img-fluid rounded-start" alt="..." />
                </div>
                <div className="col-md-6">
                  <div className="card-body">
                    <h5 className="card-title">{contact.name}</h5>
                    <p className="card-text">{contact.address}</p>
                    <p className="card-text">{contact.phone}</p>
                    <p className="card-text">{contact.email}</p>
                  </div>
                </div>
                <div className="col-md-2 d-flex flex-row">

                <button type="button" className="btn h-25" onClick={()=> handleModificar(contact.id)}>
                  <i className="fa-solid fa-pencil m-3"></i>
                </button>


                    <button type="button" className="btn h-25" onClick={() => actions.borrarContacto(contact.id)}>
                      <i className="fa-solid fa-trash m-3" ></i>
                    </button>


                  </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};