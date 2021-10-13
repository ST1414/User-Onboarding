import React from 'react';

export default function Form (props) {

    // ----- Import Props
    const { formValues, formDisabled, inputChange, formSubmit, formErrors } = props;


    // ----- Change Event
    function onChange (event){
        const { name, value, checked, type } = event.target;
        const valueToUse = type === 'checkbox' ? checked : value
        inputChange(name, valueToUse);
    }

    // ----- Submit Event
    function onSubmit (event){
        event.preventDefault()
        formSubmit();
    }

    return (
        <form className='form container' onSubmit={onSubmit}>
            <h1>Add a User (FORM.JS)</h1> 
            <div className='container'>
                {/* General Info */}
                <h3>General Info</h3>
                <label>First Name
                    <input
                        type='text'
                        name='firstName'
                        value={formValues.firstName}
                        onChange={onChange}
                    />
                </label><br/>
                <label>Last Name
                    <input
                        type='text'
                        name='lastName'
                        value={formValues.lastName}
                        onChange={onChange}
                    />
                </label><br/>
                <label>Email
                    <input
                        type='text'
                        name='email'
                        value={formValues.email}
                        onChange={onChange}
                    />
                </label><br/>
                <label>Password
                    <input
                        type='password'
                        name='password'
                        value={formValues.password}
                        onChange={onChange}
                    />
                </label><br/>
                <label>Terms of Service
                    <input
                        type='checkbox'
                        name='tos'
                        checked={formValues.tos}
                        onChange={onChange}
                    />
                </label><br/>
                {/* Button - Set disabled */}
                <button disabled={formDisabled}>Submit New User</button> 
                <div className='errors'>
                    <div>{formErrors.firstName}</div>
                    <div>{formErrors.lastName}</div>
                    <div>{formErrors.email}</div>
                    <div>{formErrors.password}</div>
                    <div>{formErrors.tos}</div>
                </div>
            </div>
        </form>
    )

}