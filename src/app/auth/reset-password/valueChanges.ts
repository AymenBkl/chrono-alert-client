import { FormGroup } from '@angular/forms';

// tslint:disable-next-line: prefer-const
let formErrors = {
    email: '',
};

// tslint:disable-next-line: prefer-const
let validationMessages = {
    email : {
        required: 'Email is required',
        email:'Please Enter A Valid Email'
    },

};

export function onValueChanged(data: any, resetPasswordForm: FormGroup) {
    if (!resetPasswordForm) { return; }
    const form = resetPasswordForm;
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

let formErrorsNewPassword = {
    password:'',
    confirmPassword:'',
};

// tslint:disable-next-line: prefer-const
let validationMessagesNewPassword = {
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

export function onValueChangedNewPassword(data: any, newPasswordForm: FormGroup) {
    if (!newPasswordForm) { return; }
    const form = newPasswordForm;
    for (const field in formErrorsNewPassword) {
        if (formErrorsNewPassword.hasOwnProperty(field)) {
            // clear previous error message (if any)
            formErrorsNewPassword[field] = '';
            const control = form.get(field);
            if (control && control.dirty && !control.valid) {
                const messages = validationMessagesNewPassword[field];
                for (const key in control.errors) {
                    if (control.errors.hasOwnProperty(key)) {
                        formErrorsNewPassword[field] += messages[key] + ' ';
                    }
                }
            }
        }
    }
    return formErrorsNewPassword;
}

