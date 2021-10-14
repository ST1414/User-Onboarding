// import logo from './logo.svg';
import './App.css';
import Form from './Form';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import schema from './formSchema';

// ----- Initial Values -----
const initialFormValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  tos: false,
}
const initialFormErrors = { // For the error msg fields
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  tos: ''
}
const initialDisabled = true;
const initialUsers = [];


function App() { // ==========================

  // ----- State -----
  const [ formValues, setFormValues ] = useState(initialFormValues);
  const [ formErrors, setFormError] = useState(initialFormErrors);
  const [ formDisabled, setFormDisabled] = useState(initialDisabled)
  const [ users, setUsers ] = useState(initialUsers);


  // ----- Helper Functions -----
  const getUsers = () => {
    axios.get('https://reqres.in/api/users')
    .then (response => {
      setUsers(response.data.data)
    })
    .catch (error => {
      console.log('ERROR: ', error)
    })
  }
  
  const validate = (name, value) => {
    yup.reach(schema, name)
      .validate(value)
      .then( () => setFormError ({...formErrors, [name]:'' }) )
      .catch( error => setFormError ({...formErrors, [name]: error.errors[0]}))
  }
  const inputChange = (name, value) => {
    validate(name, value);
    setFormValues({ ...formValues, [name]:value }); 
    // Spread existing form field, change only [name] key
  }

  const postNewUser = (newUser) => {
    axios.post('https://reqres.in/api/users', newUser)
      .then(response => {
          setUsers([response.data, ...users]);
      })
      .catch(error => {
        console.log(error);
      })
      .finally( () => {
        setFormValues(initialFormValues);
      })
  }
  const formSubmit = () => {
    const newUser = {
      first_name: formValues.firstName, // Changed to match the API
      last_name: formValues.lastName,  // Change to match the API
      email: formValues.email,
      password: formValues.password,
      tos: formValues.tos
    }
    postNewUser(newUser);
  }


   // ----- Side Effects -----
   useEffect( () => {
     getUsers();
   }, [])

   useEffect(() => {
    // Enable button
    schema.isValid(formValues).then(valid => setFormDisabled(!valid))
  }, [formValues])

  return (
    <div className="App">
      <h1>APP.JS</h1>
      <Form 
        formValues={formValues}
        formDisabled={formDisabled}
        inputChange={inputChange}
        formSubmit={formSubmit}
        formErrors={formErrors}
      />
      {
        users.map(user => {
          console.log('USER: ', user)
          return <p>{user.first_name} {user.last_name}</p>
        })
      }
    </div>
  );
}

export default App;

