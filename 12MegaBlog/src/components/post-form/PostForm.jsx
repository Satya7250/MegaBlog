import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const submit = async (data) => {
        setError("");
        setLoading(true);
        
        try {
            // Check if user is authenticated
            if (!userData) {
                throw new Error("You must be logged in to create a post");
            }

            // Check if userData has the required $id property
            if (!userData.$id) {
                throw new Error("User authentication error. Please log out and log in again.");
            }

            if (post) {
                // Update existing post
                const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

                if (file) {
                    appwriteService.deleteFile(post.featuredImage);
                }

                const dbPost = await appwriteService.updatePost(post.$id, {
                    ...data,
                    featuredImage: file ? file.$id : undefined,
                });

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                } else {
                    throw new Error("Failed to update post");
                }
            } else {
                // Create new post
                if (!data.image || !data.image[0]) {
                    throw new Error("Please select an image for your post");
                }
                
                console.log("User data:", userData); // Debug log
                console.log("Form data:", data); // Debug log
                
                const file = await appwriteService.uploadFile(data.image[0]);

                if (file) {
                    const fileId = file.$id;
                    data.featuredImage = fileId;
                    const dbPost = await appwriteService.createPost({ 
                        ...data, 
                        userId: userData.$id 
                    });

                    if (dbPost) {
                        navigate(`/post/${dbPost.$id}`);
                    } else {
                        throw new Error("Failed to create post");
                    }
                } else {
                    throw new Error("Failed to upload image");
                }
            }
        } catch (error) {
            console.error("Submit error:", error);
            setError(error.message || "An error occurred while saving the post");
        } finally {
            setLoading(false);
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <div className="text-sm text-gray-600 mb-2">Current Image:</div>
                        <img
                            src={appwriteService.getFileView(post.featuredImage) || appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg w-full h-auto"
                            onError={(e) => {
                                console.error('PostForm image failed to load:', e.target.src);
                                e.target.style.display = 'none';
                                e.target.parentNode.innerHTML = '<div class="bg-gray-200 h-32 flex items-center justify-center text-gray-500 rounded-lg">Current image preview unavailable</div>';
                            }}
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                {error && (
                    <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                        {error}
                    </div>
                )}
                <Button 
                    type="submit" 
                    bgColor={post ? "bg-green-500" : undefined} 
                    className="w-full"
                    disabled={loading}
                >
                    {loading ? "Saving..." : (post ? "Update" : "Submit")}
                </Button>
            </div>
        </form>
    );
}