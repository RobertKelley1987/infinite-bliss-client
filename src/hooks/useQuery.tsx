import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

// Hook to get query params from url
const useQuery = () => {
    const { search } = useLocation();
    return useMemo(() => new URLSearchParams(search), [search]);
}

export default useQuery;