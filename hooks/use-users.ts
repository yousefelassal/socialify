import useSWR from 'swr';
import { getAllUsers, baseUrl } from '@/services/search';

export default function useUsers() {
    const { data, error, mutate } = useSWR(baseUrl, getAllUsers);
    return {
        data,
        isLoading: !error && !data,
        isError: error,
        mutate
    };
}