
import {FC, useEffect, useMemo, useState} from 'react'
import {useParams} from 'react-router-dom'
import {UserDesc} from './user-desc'

import { useGetUser } from '../../store/hooks/use-get-user'
import { createUser } from '../../utils/create-user'
import { User } from '../../models/user'

interface UserDescProps {
    user: User | undefined,
}

export const UserDescProvides : FC <UserDescProps> = ({user}) =>{
    const { id } = useParams<"id">();
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