import { useGetUsersQuery } from "../news/news-api"

export const useGetUsers = ()=>{

    const {isLoading, isFetching, data} = useGetUsersQuery();
    
    return (
        data
    )
}