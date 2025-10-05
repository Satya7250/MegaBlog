import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import appwriteService from "../appwrite/config";
import {Container, PostCard} from '../components'

function Home() {
    const [posts, setPosts] = useState([])
    const authStatus = useSelector((state) => state.auth.status)

    useEffect(() => {
        // Only fetch posts if user is authenticated
        if (authStatus) {
            appwriteService.getPosts().then((posts) => {
                if (posts) {
                    setPosts(posts.documents)
                }
            }).catch((error) => {
                console.error("Failed to fetch posts:", error);
                // Handle error gracefully - posts will remain empty array
            })
        }
    }, [authStatus])
  
    if (posts.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            {authStatus ? (
                                <div className="space-y-3">
                                    <h1 className="text-2xl font-bold text-gray-800">No posts yet</h1>
                                    <p className="text-gray-600">Be the first to create one.</p>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    <h1 className="text-2xl font-bold text-gray-800">Login to read posts</h1>
                                </div>
                            )}
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home
