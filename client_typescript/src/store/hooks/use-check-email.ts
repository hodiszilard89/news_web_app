import { useSelector } from 'react-redux'
import {newsApi, useCheckUniqueEmail} from '../news/news-api'
export const useCheckEmail=(email:string)=>{
    const {isLoading,isFetching} = useCheckUniqueEmail(email)
    const select = newsApi.endpoints.checkUniqueEmail.select(email)
    const {data} = useSelector(select)
    

    return({data:data&&data})
}