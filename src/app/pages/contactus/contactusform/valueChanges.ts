import { FormGroup } from '@angular/forms';

// tslint:disable-next-line: prefer-const
let formErrors = {
    name: '',
    email: '',
    subject:'',
    message:''
};

// tslint:disable-next-line: prefer-const
let validationMessages = {
    name: {
        required: 'Name is required.',
        minlength: 'Name must be at least 3 characters long.',
        maxlength : 'Name must be at most 20 characters long.'
    },
    email : {
        required: 'Email is required',
        email:'Please Enter A Valid Email'
    },
    subject: {
        required: 'Subject is required.',
        minlength: 'Subject must be at least 3 characters long.',
        maxlength : 'Subject mus be at most 20 characters long.'
    },
    message : {
        required: 'Message is required.',
        minlength: 'Message must be at least 10 characters long.',
        maxlength : 'Message mus be at most 2000 characters long.'
    },


};

export function onValueChanged(data: any, contactUsForm: FormGroup) {
    console.log(contactUsForm);
    if (!contactUsForm) { return; }
    const form = contactUsForm;
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
