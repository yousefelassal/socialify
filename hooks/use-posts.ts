import useSWR from 'swr';
import { getPosts, baseUrl } from '@/services/posts';

export default function usePosts() {
    const { data, error, mutate } = useSWR(baseUrl, getPosts);
    return {
        data,
        isLoading: !error && !data,
        isError: error,
        mutate
    };
}