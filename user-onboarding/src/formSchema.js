import * as yup from 'yup';

const formSchema = yup.object().shape({
    firstName: yup
        .string()
        .trim()
        .required('First name is required'),
    lastName: yup
        .string()
        .trim()
        .required('Last name is required'),   
    email: yup
        .string()
        .email('Must be a valid email address')
        .required('Email is required'),
    password: yup
        .string()
        .trim()
        .required('Password is required')
        .min(3, 'Password must be 3 or more characters long'),
    tos: yup
        .boolean()
        .oneOf([true], 'TOS is required'),
})


export default formSchema;