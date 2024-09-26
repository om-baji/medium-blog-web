import { useForm } from "react-hook-form";
import Quote from "../components/Quote";
import FormInput from "../components/FormInput";
import { signupBody, signupSchema } from "@ombaji124/common";
import { Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const Signup = () => {
    const navigate = useNavigate();

    const form = useForm<signupBody>({
        resolver: zodResolver(signupSchema)
    });
    const { register, formState: { isSubmitting, isSubmitSuccessful, errors }, handleSubmit } = form;

    const onSubmit = async (data: signupBody) => {
        console.log(data);

        try {
            const { name, email, password } = data;
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, {
                name,
                email,
                password
            });

            
            console.log(response.data["token"]);
            localStorage.setItem("token", response.data["token"]);
            localStorage.setItem("author",response.data["author"])
            navigate("/blog");
            toast.success("Registration successful!");

        } catch (error) {
            console.log(error);
            toast.error("Registration failed. Please try again."); 
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 h-screen">
            <div className="flex justify-center items-center p-6">
                <div className="max-w-sm w-full space-y-4">
                    <h2 className="text-4xl font-bold mb-4 text-center">Sign Up</h2>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <FormInput
                            placeholder={"Someone"}
                            type={"text"}
                            label={"Name"}
                            name={"name"}
                            register={register}
                        />
                        {errors.name && (
                            <p className="text-red-500 text-sm mb-2 font-semibold">
                                {errors.name.message}
                            </p>
                        )}
                        <FormInput
                            placeholder={"example@xyz.com"}
                            type={"email"}
                            label={"Email"}
                            name={"email"}
                            register={register}
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mb-2 font-semibold">
                                {errors.email.message}
                            </p>
                        )}
                        <FormInput
                            placeholder={"someone@123"}
                            type={"password"}
                            label={"Password"}
                            name={"password"}
                            register={register}
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm mb-2 font-semibold">
                                {errors.password.message}
                            </p>
                        )}

                        <div className="mt-6">
                            <button
                                disabled={isSubmitting}
                                type="submit"
                                className="w-full px-4 py-2 bg-slate-700 text-white rounded hover:bg-slate-500 transition duration-200"
                            >
                                {isSubmitting ? "Loading..." : "Register"}
                            </button>
                            {!isSubmitSuccessful && (
                                <p className="text-red-500 text-sm mt-2 font-semibold">
                                    {errors.root?.message}
                                </p>
                            )}
                            <div className="text-center text-sm text-gray-500 mt-4">
                                Already have an account?
                                <Link className="text-blue-500 ml-1" to="/signin">
                                    <u>Login</u>
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div className="hidden lg:block">
                <Quote />
            </div>
            <Toaster />
        </div>
    );
};

export default Signup;
