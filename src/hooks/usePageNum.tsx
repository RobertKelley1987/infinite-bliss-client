import useQuery from "./useQuery";

// Hook to get current page number
const usePageNum = () => {
        const query = useQuery();
        const pageNumQuery = query.get('page') || '1';
        const pageNum = parseInt(pageNumQuery);

        return { pageNum }
}

export default usePageNum;