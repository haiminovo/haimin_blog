import siteData from '@/data/siteData';

export const customFetch = (
    url: string = siteData.serverURL,
    method: string = 'GET',
    data: BodyInit | null = null,
    headers: HeadersInit = {}
) => {
    const options: RequestInit = {
        method,
        headers: {
            'Content-Type': 'application/json',
            ...headers,
        },
    };

    if (data) {
        options.body = JSON.stringify(data);
    }

    return fetch(url, options)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .catch((error) => {
            console.error('Fetch error:', error);
            throw error;
        });
};
