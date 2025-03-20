const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {

			contacts:[],
			currentContact:{},
			
		},
		actions: {



			getContactos: async()=>{

				
				try {

					const response = await fetch("https://playground.4geeks.com/contact/agendas/jose-n/contacts")

					if(!response.ok){
						console.log('Agenda no creada, se procede a crear:')
						let action = getActions();
						await action.crearAgenda();
						return;
					}

					let data = await response.json();
					let store = getStore();

					 setStore({...store,contacts: [...data.contacts]});

				} catch (error) {
					console.error(error);
					
				}
			},

			crearAgenda: async()=>{

				try {

					const response = await fetch("https://playground.4geeks.com/contact/agendas/jose-n",
						{
							method: 'POST',
							headers: { 'Content-Type': 'application/json'}
						})

					
				} catch (error) {
					console.log("No se crea el usuario");
					console.error(error);
					
				}
			},





			crearContactos: async(name,phone,email,address)=>{
				try {

					const response = await fetch("https://playground.4geeks.com/contact/agendas/jose-n/contacts",
						{
							method: 'POST',
							headers:{ 'Content-Type': 'application/json'},
							body: JSON.stringify(
								{
									'name': name,
									'phone': phone,
									'email': email,
									'address': address,					

								}),

						})

					if (response.ok){
						//let action = getActions()
						//action.getContactos();
						let data = await response.json();
						console.log("ESTE ES EL DATO DEL CONTACTO NUEVO",data)
						let store = getStore();

						setStore({...store,contacts:[...store.contacts,data]})

					}
					
				} catch (error) {
					console.error(error);
					
				}
			},

			borrarContacto: async(id) => {
				try {

					const response = await fetch(`https://playground.4geeks.com/contact/agendas/jose-n/contacts/${id}`, {
						method: 'DELETE',
						headers: {
							'Content-Type': 'application/json'
						  }	

					})

					if (response.ok){
						let store = getStore();
						setStore({...store, contacts: store.contacts.filter(contact => contact.id !== id)});
					}
					
				} catch (error) {
					console.error(error)
				}
			},


			getContacto: async(id) => {
				try {
					const response = await fetch('https://playground.4geeks.com/contact/agendas/jose-n/contacts/')
					if(!response.ok){
						console.log('id no creado')
						return
					}

					const data = await response.json();
					let store = getStore();
					console.log(data);
					let unContacto = data.contacts.find(contacto => contacto.id == id)
					console.log(unContacto);
					setStore({...store,currentContact:{...unContacto}});
					console.log(store);


					
				} catch (error) {
					console.error(error)
					
				}

			},

			modificarContacto: async(contacto) => {
				try {

					const response = await fetch(`https://playground.4geeks.com/contact/agendas/jose-n/contacts/${contacto.id}`, {
						method: 'PUT',
						headers: {
							"Content-Type": 'application/json'
						},
						body: JSON.stringify(
							{
								name:contacto.name,
								phone:contacto.phone,
								email:contacto.email,
								address:contacto.address,

							}
						)
					})

					if(!response.ok){
						throw new Error("Algo salio mal!");						
					}
					let store = getStore();
					let listaModificada = store.contacts.map(elemento => {
						return elemento.id == contacto.id ? {...elemento, ...contacto} : elemento;
					})
					setStore({...store,contacts:listaModificada})
					console.log('Contacto Actualizado')
					
				} catch (error) {
					console.log(error)
					
				}
			}



		}
	};
};

export default getState;
