import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { blogInputs, blogTypes } from "@ombaji124/common";
import axios from "axios";
import { BACKEND_URL } from "../config";
import FormInput from "../components/FormInput";
import AppBar from "../components/AppBar";
import Quote from "../components/Quote";
import toast, { Toaster } from "react-hot-toast";
import { useLoaderData, useLocation, useParams } from "react-router-dom";

export default function Update() {


    const location = useLocation()
    const query = new URLSearchParams(location.search)
    const id = query.get("id")

    const form = useForm<blogTypes>({
        resolver: zodResolver(blogInputs),
    });
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isSubmitSuccessful },
    } = form;

    // useEffect(() => {
    //     const fetchBlogData = async () => {
    //         try {
    //             const response = await axios.get(`${BACKEND_URL}/api/v1/blog/post/${id}`);
    //             const { title, content } = response.data;
    //             console.log(response.data)
    //             setValue("title", title);
    //             setValue("content", content);
    //         } catch (e) {
    //             toast.error("Failed to fetch post data");
    //         }
    //     };
    //     fetchBlogData();
    // }, [id]);

    const onSubmit = async (data: blogTypes) => {
        try {
            const authHeader = `Bearer ${localStorage.getItem("token")}`;
            const response = await axios.put(
                `${BACKEND_URL}/api/v1/blog/post/${id}`,
                {
                    title: data.title,
                    content: data.content,
                },
                {
                    headers: {
                        Authorization: authHeader,
                    },
                }
            );
            toast.success("Blog post updated successfully");
            console.log(response);
        } catch (e) {
            toast.error("Failed to update the blog post");
            console.log(e);
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <AppBar />
            <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
                <div className="flex justify-center items-center p-6">
                    <div className="max-w-sm w-full space-y-4">
                        <h2 className="text-4xl font-bold mb-4 text-center">Update Your Blog</h2>
                        <p className="text-lg text-center text-gray-600">Edit your blog post below</p>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <FormInput
                                placeholder={"Enter Blog Title"}
                                type={"text"}
                                label={"Title"}
                                name={"title"}
                                register={register}
                            />
                            {errors.title && (
                                <p className="text-red-500 text-sm mb-2 font-semibold">
                                    {errors.title.message}
                                </p>
                            )}
                            <textarea
                                id="text"
                                placeholder="Update your content here..."
                                className="w-full h-[200px] p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600 transition duration-200 text-base"
                                {...register("content")}
                            />
                            {errors.content && (
                                <p className="text-red-500 text-sm mb-2 font-semibold">
                                    {errors.content.message}
                                </p>
                            )}
                            <div className="mt-6">
                                <button
                                    disabled={isSubmitting}
                                    type="submit"
                                    className="w-full px-4 py-2 bg-slate-700 text-white rounded hover:bg-slate-500 transition duration-200"
                                >
                                    {isSubmitting ? "Updating..." : "Update Your Blog"}
                                </button>
                                {!isSubmitSuccessful && (
                                    <p className="text-red-500 text-sm mt-2 font-semibold">
                                        {errors.root?.message}
                                    </p>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
                <div className="hidden lg:block">
                    <Quote />
                </div>
            </div>
            <Toaster />
        </div>
    );
}
