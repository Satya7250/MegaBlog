import conf from '../conf/conf.js';
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service{
    client = new Client();
    databases;
    bucket;
    
    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({title, slug, content, featuredImage, status, userId}){
        try {
            console.log('Creating post with data:', {
                title,
                slug,
                content: content?.substring(0, 100) + '...',
                featuredImage,
                status,
                userId,
            });
            
            const result = await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            );
            
            console.log('Post created successfully:', result);
            return result;
        } catch (error) {
            console.error("Appwrite service :: createPost :: error", error);
            throw error;
        }
    }

    async updatePost(slug, {title, content, featuredImage, status}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,

                }
            )
        } catch (error) {
            console.log("Appwrite serive :: updatePost :: error", error);
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            
            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deletePost :: error", error);
            return false
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            
            )
        } catch (error) {
            console.log("Appwrite serive :: getPost :: error", error);
            return false
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries,
                

            )
        } catch (error) {
            console.log("Appwrite serive :: getPosts :: error", error);
            return false
        }
    }

    // file upload service

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite serive :: uploadFile :: error", error);
            return false
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deleteFile :: error", error);
            return false
        }
    }

    getFilePreview(fileId){
        try {
            if (!fileId) {
                console.error('File ID is required for preview');
                return null;
            }
            
            // For free plan: Skip transformations and use direct file view
            console.log('Using file view (no transformations) for file:', fileId);
            const fileViewUrl = this.bucket.getFileView(
                conf.appwriteBucketId,
                fileId
            );
            console.log('Generated file view URL:', fileViewUrl);
            return fileViewUrl;
            
        } catch (error) {
            console.error('Error generating file view:', error);
            // Fallback to manual URL construction
            try {
                const directUrl = `${conf.appwriteUrl}/storage/buckets/${conf.appwriteBucketId}/files/${fileId}/view?project=${conf.appwriteProjectId}`;
                console.log('Using direct URL fallback:', directUrl);
                return directUrl;
            } catch (directError) {
                console.error('Direct URL fallback failed:', directError);
                return null;
            }
        }
    }
    
    // Alternative method to get file view URL
    getFileView(fileId) {
        try {
            if (!fileId) {
                console.error('File ID is required for file view');
                return null;
            }
            return this.bucket.getFileView(
                conf.appwriteBucketId,
                fileId
            );
        } catch (error) {
            console.error('Error generating file view:', error);
            return null;
        }
    }
}


const service = new Service()
export default service