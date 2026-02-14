// MODX API Integration
const MODX_API_URL = process.env.VITE_MODX_API_URL || 'http://your-modx-site.com/api';

export interface ModxBlogArticle {
    id: number;
    title: string;
    content: string;
    image?: string;
    date: string;
    author?: string;
    readTime?: string;
}

export const fetchBlogArticles = async (): Promise<ModxBlogArticle[]> => {
    try {
        const response = await fetch(`${MODX_API_URL}/blog`);
        if (!response.ok) {
            throw new Error('Failed to fetch blog articles');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching blog articles from MODX:', error);
        return [];
    }
};

export const fetchBlogArticle = async (id: number): Promise<ModxBlogArticle | null> => {
    try {
        const response = await fetch(`${MODX_API_URL}/blog/${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch blog article');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching blog article from MODX:', error);
        return null;
    }
};

// Другие API endpoints
export const fetchDoctors = async () => {
    try {
        const response = await fetch(`${MODX_API_URL}/doctors`);
        if (!response.ok) {
            throw new Error('Failed to fetch doctors');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching doctors from MODX:', error);
        return [];
    }
};

export const submitContactForm = async (formData: any) => {
    try {
        const response = await fetch(`${MODX_API_URL}/contact`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            throw new Error('Failed to submit form');
        }

        return await response.json();
    } catch (error) {
        console.error('Error submitting form to MODX:', error);
        throw error;
    }
};





