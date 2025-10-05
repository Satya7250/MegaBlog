import { useState, useEffect } from 'react';
import appwriteService from '../appwrite/config';
import { getFriendlyMessage } from '../utils/errorMapper';

export const useAppwriteImage = (fileId) => {
    const [imageUrl, setImageUrl] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!fileId || fileId.trim() === '') {
            setLoading(false);
            return;
        }

        const loadImage = async () => {
            try {
                setLoading(true);
                setError(null);

                // For free plan: Use direct file view (no transformations)
                let url = null;

                // Method 1: Try getFileView (no transformations - free plan compatible)
                try {
                    url = appwriteService.getFileView(fileId);
                    console.log('Using file view URL:', url);
                } catch (viewError) {
                    console.warn('File view failed:', viewError);
                }

                // Method 2: Try getFilePreview as fallback (might fail on free plan)
                if (!url) {
                    try {
                        url = appwriteService.getFilePreview(fileId);
                        console.log('Trying preview URL:', url);
                    } catch (previewError) {
                        console.warn('Preview failed (expected on free plan):', previewError);
                    }
                }

                // Method 3: Construct direct URL if other methods fail
                if (!url) {
                    const directUrl = `${import.meta.env.VITE_APPWRITE_URL}/storage/buckets/${import.meta.env.VITE_APPWRITE_BUCKET_ID}/files/${fileId}/view?project=${import.meta.env.VITE_APPWRITE_PROJECT_ID}`;
                    url = directUrl;
                    console.log('Using direct URL:', url);
                }

                setImageUrl(url);
            } catch (err) {
                console.error('Error loading image:', err);
                setError(getFriendlyMessage(err, 'image.load'));
            } finally {
                setLoading(false);
            }
        };

        loadImage();
    }, [fileId]);

    return { imageUrl, loading, error };
};

export default useAppwriteImage;
