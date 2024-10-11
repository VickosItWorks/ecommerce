import { useQuery } from "@tanstack/react-query";
const BASE_URL = "http://localhost:5500";


export const useSndFetch = (url) => {
    const query = useQuery({
        queryKey: ['cart', { url }],
        queryFn: async () => {
            const response = await fetch(`${BASE_URL}${url}`, { headers: { "Authorization": `Bearer ${localStorage.getItem('accessToken')}` } });
            return (await response.json());
        }
    })

    return query;
};