import { FormGroup } from '@angular/forms';

// tslint:disable-next-line: prefer-const
let formErrors = {
    email: '',
    password:'',
    confirmPassword:'',
    city:'',
    country:'',
    firstName:'',
    lastName:'',
    address:'',
    postalCode:'',
    username:''    
};

// tslint:disable-next-line: prefer-const
let validationMessages = {
    firstName: {
        required: 'First Name is required',
        minlength:'First Name must be at least 3 characters long.',
        maxlength : 'First Name must be at most 20 characters long.'
    },
    lastName: {
        required: 'Last Name is required',
        minlength:'Last Name must be at least 3 characters long.',
        maxlength : 'Last Name must be at most 20 characters long.'
    },
    address: {
        required: 'Address is required',
        minlength:'Address must be at least 6 characters long.',
        maxlength : 'Address must be at most 20 characters long.'
    },
    username: {
        required: 'User Name is required',
        minlength:'User Name  must be at least 5 characters long.',
        maxlength : 'User Name  must be at most 20 characters long.'
    },
    city: {
        required: 'City is required',
        minlength:'City must be at least 4 characters long.',
        maxlength : 'City must be at most 20 characters long.'
    },
    postalCode : {
        required: 'Postal Code is required',
        minlength:'Postal Code must be at least 5 characters long.',
        maxlength : 'Postal Code must be at most 20 characters long.',
    },
    country: {
        required: 'Country is required',
        minlength:'Country must be at least 2 characters long.',
        maxlength : 'Country must be at most 20 characters long.'
    },
    email : {
        required: 'Email is required',
        email:'Please Enter A Valid Email'
    },
    password : {
        required: 'Password is required.',
        minlength: 'Password must be at least 6 characters long.',
        mustMatch : 'Passwords do not match'
    },
    confirmPassword : {
        required: 'Password is required',
        minlength: 'Password must be at least 6 characters long.',
        mustMatch : 'Passwords do not match'
    }


};

export function onValueChanged(data: any, registerForm: FormGroup) {
    if (!registerForm) { return; }
    const form = registerForm;
    for (const field in formErrors) {
        if (formErrors.hasOwnProperty(field)) {
            // clear previous error message (if any)
            formErrors[field] = '';
            const control = form.get(field);
            if (control && control.dirty && !control.valid) {
                const messages = validationMessages[field];
                for (const key in control.errors) {
                    if (control.errors.hasOwnProperty(key)) {
                        formErrors[field] += messages[key] + ' ';
                    }
                }
            }
        }
    }
    return formErrors;
}
