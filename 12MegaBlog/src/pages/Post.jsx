import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import useAppwriteImage from "../hooks/useAppwriteImage";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);
    const { imageUrl, loading: imageLoading, error: imageError } = useAppwriteImage(post?.featuredImage);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                // Only delete file if it exists and is not empty
                if (post.featuredImage && post.featuredImage.trim() !== '') {
                    appwriteService.deleteFile(post.featuredImage);
                }
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-8">
            <Container>
                {/* Author Actions */}
                {isAuthor && (
                    <div className="flex justify-end mb-4 space-x-3">
                        <Link to={`/edit-post/${post.$id}`}>
                            <Button bgColor="bg-green-600" className="hover:bg-green-700 transition-colors duration-200">
                                ✏️ Edit Post
                            </Button>
                        </Link>
                        <Button 
                            bgColor="bg-red-600" 
                            className="hover:bg-red-700 transition-colors duration-200"
                            onClick={deletePost}
                        >
                            🗑️ Delete Post
                        </Button>
                    </div>
                )}

                {/* Featured Image */}
                <div className="w-full mb-8">
                    {imageLoading ? (
                        <div className="w-full h-80 bg-gray-100 rounded-xl flex items-center justify-center text-gray-500 shadow-lg">
                            <div className="text-center">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-500 mx-auto mb-3"></div>
                                <span>Loading image...</span>
                            </div>
                        </div>
                    ) : imageError ? (
                        <div className="w-full h-80 bg-gray-100 rounded-xl flex items-center justify-center text-gray-500 shadow-lg">
                            <div className="text-center">
                                <div className="text-5xl mb-3">🖼️</div>
                                <div className="text-lg font-medium">Image failed to load</div>
                                <div className="text-sm mt-2 text-gray-400 max-w-md">{imageError}</div>
                            </div>
                        </div>
                    ) : imageUrl ? (
                        <div className="w-full max-w-2xl mx-auto mb-6">
                            <img
                                src={imageUrl}
                                alt={post.title}
                                className="w-full h-80 object-cover rounded-lg shadow-md"
                                onError={(e) => {
                                    console.error('Image failed to load:', e.target.src);
                                    e.target.style.display = 'none';
                                    e.target.parentNode.innerHTML = '<div class="w-full h-80 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500 shadow-md"><div class="text-center"><div class="text-5xl mb-3">🖼️</div><div>Image not available</div></div></div>';
                                }}
                            />
                        </div>
                    ) : (
                        <div className="w-full h-80 bg-gray-100 rounded-xl flex items-center justify-center text-gray-500 shadow-lg">
                            <div className="text-center">
                                <div className="text-5xl mb-3">🖼️</div>
                                <div className="text-lg font-medium">No featured image</div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Post Title */}
                <div className="w-full mb-6">
                    <h1 className="text-4xl font-bold text-gray-900 leading-tight">{post.title}</h1>
                </div>

                {/* Post Content */}
                <div className="prose prose-lg max-w-none">
                    {parse(post.content)}
                </div>
            </Container>
        </div>
    ) : null;
}