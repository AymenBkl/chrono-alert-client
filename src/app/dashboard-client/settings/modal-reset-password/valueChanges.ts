import { FormGroup } from '@angular/forms';

// tslint:disable-next-line: prefer-const
let formErrors = {
    password:'',
    confirmPassword:'',
    oldPassword:'',  
};

// tslint:disable-next-line: prefer-const
let validationMessages = {
    oldpassword : {
        required: 'Old Password is required.',
        minlength: 'Old Password must be at least 6 characters long.',
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

export function onValueChanged(data: any, changePasswordForm: FormGroup) {
    if (!changePasswordForm) { return; }
    const form = changePasswordForm;
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
