"use client";
import SubmitButton from "@/components/Button";
import InputField from "@/components/InputField";
import { PROFILE_ROUTE, REGISTER_ROUTE } from "@/constants/routes";
import useAuthentication from "@/hooks/useAuthentication";
import { auth } from '@/services/firebase';
import { useLoginValidation } from "@/validationSchema/useAuth";
import { signInWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Login = () => {
    const { handleSubmit, register, formState: { errors }, reset } = useLoginValidation();
    const router = useRouter();
    useAuthentication();
    const submitForm = (values: any) => {

        // Fetch locale from user browser & set it to the values object
        const locale = navigator.language; // "en-US"
        const lang = locale.slice(0, 2); // "en"
        values.lang = lang;
        const { email, password } = values;

        signInWithEmailAndPassword(auth, values.email, values.password).then(async (objResponseFromFirebase) => {

            // Add objResponseFromFirebase to values
            values.user = objResponseFromFirebase.user;
            // console.log("objResponseFromFirebase + values ", values);

            // Save the authentication result to the RESTful API
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });
            //console.log("response FROM API", response);

            if (response.ok) {
                alert("User Login Successfully");
                reset();
                router.push(PROFILE_ROUTE);
            } else {
                console.log("catch ", response.statusText);
                alert("Something went wrong please try again");
                //throw new Error('Failed to save authentication result to the RESTful API');
            }
            router.push(PROFILE_ROUTE);
        }).catch((e) => {
            console.log("Login Error ", e.message);
            alert("Please try Again");
        });
    }

    return (
        <div className="h-screen flex justify-center items-center bg-gradient-to-br from-yellow-400/20 via-blue-300 to-purple-400/60">
            <div className="w-1/2 rounded-md bg-white/30 shadow-lg flex justify-between flex-col">
                <div className="h-28 w-full justify-center flex items-center">
                    <span className="text-3xl text-black font-mono font-semibold bg-yellow-300 p-3 rounded-lg">Welcome To SignIn</span>
                </div>
                <form onSubmit={handleSubmit(submitForm)} className="h-full w-1/2 mx-auto ">
                    <InputField
                        register={register}
                        error={errors.email}
                        type="text"
                        placeholder="Enter Your Email Here..."
                        name="email"
                        label="Email"
                    />
                    <InputField
                        register={register}
                        error={errors.password}
                        type="password"
                        placeholder="Enter Your Password Here..."
                        name="password"
                        label="Password"
                    />
                    <SubmitButton label="Submit" />
                </form>
                <div className="h-20 mx-auto">
                    <span className="text-sm text-gray-600">Dont have an account?
                        <Link href={REGISTER_ROUTE}><span className="text-blue-500 font-semibold text-md">Register Here</span></Link>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Login;