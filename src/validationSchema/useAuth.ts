import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

const loginSchema = Yup.object({
    email: Yup.string().email("Please enter valid email").required("Please fill this field"),
    password: Yup.string().required("Please fill this field").min(6, "Please enter minimum 6 characters for password.")
});

export const useLoginValidation = () => {
    const methods = useForm({
        resolver: yupResolver(loginSchema)
    });
    return methods;
};

const registerSchema = Yup.object({
    email: Yup.string().email("Please enter valid email").required("Please fill this field"),
    password: Yup.string().required("Please fill this field").min(6, "Please enter minimum 6 characters for password."),
    cnfPassword: Yup.string().required("Please fill this field").oneOf([Yup.ref('password')], "Enter password not matched.")
});

export const useRegisterValidation = () => {
    const methods = useForm({
        resolver: yupResolver(registerSchema)
    });
    return methods;
};

const forgotPasswordSchema = Yup.object({
    email: Yup.string().email("Please enter valid email").required("Please fill this field"),
});

export const useForgotPasswordValidation = () => {
    const methods = useForm({
        resolver: yupResolver(forgotPasswordSchema)
    });
    return methods;
};

