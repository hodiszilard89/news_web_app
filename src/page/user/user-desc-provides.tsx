
import {FC, useEffect, useMemo, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {useParams} from 'react-router-dom'
import {UserDesc} from './user-desc'
import {selectUser} from '../../store/news/users-slice'
import { useGetUser } from '../../store/hooks/use-get-user'
import { createUser } from '../../utils/create-user'
import { User } from '../../models/user'


export const UserDescProvides : FC  = () =>{
    const { id } = useParams<"id">();
    const dispach=useDispatch();
    const user = useSelector(selectUser)
    //const [anUser, setAnUser] = useState<User>();
    //const { user} =  useGetUser(Number(id));
    //const anUser= useMemo(()=>(user), [user]);
  
    //
    return (
        user?
        <UserDesc  
        //user={user?user:createUser()}
        //user={user?user:createUser()}
        user={user}
         onSubmit={Promise.resolve}></UserDesc>:<></>)

}