
import React from 'react'
import {Link} from 'react-router-dom'
import useAppwriteImage from '../hooks/useAppwriteImage'

function PostCard({$id, title, featuredImage}) {
    const { imageUrl, loading, error } = useAppwriteImage(featuredImage);
    
    return (
        <Link to={`/post/${$id}`}>
        <div className='w-full bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group'>
            <div className='w-full h-56 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative'>
                {loading ? (
                    <div className="flex items-center justify-center w-full h-full text-gray-500">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-500 mx-auto mb-2"></div>
                            <span className="text-sm">Loading...</span>
                        </div>
                    </div>
                ) : error ? (
                    <div className="flex items-center justify-center w-full h-full text-gray-500">
                        <div className="text-center">
                            <div className="text-3xl mb-2">🖼️</div>
                            <span className="text-sm">Image failed to load</span>
                        </div>
                    </div>
                ) : imageUrl ? (
                    <>
                        <img 
                            src={imageUrl}
                            alt={title}
                            className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500'
                            onError={(e) => {
                                console.error('Image failed to load:', e.target.src);
                                e.target.style.display = 'none';
                                e.target.parentNode.innerHTML = '<div class="flex items-center justify-center w-full h-full text-gray-500"><div class="text-center"><div class="text-3xl mb-2">🖼️</div><span class="text-sm">Image not available</span></div></div>';
                            }}
                        />
                        {/* Subtle overlay for better text readability */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </>
                ) : (
                    <div className="flex items-center justify-center w-full h-full text-gray-500">
                        <div className="text-center">
                            <div className="text-3xl mb-2">🖼️</div>
                            <span className="text-sm">No image available</span>
                        </div>
                    </div>
                )}
            </div>
                <div className='p-4'>
                    <h2 className='text-xl font-bold text-gray-800 hover:text-blue-600 transition-colors duration-200 line-clamp-2'>
                        {title}
                    </h2>
                </div>
            </div>
        </Link>
    )
}


export default PostCard
