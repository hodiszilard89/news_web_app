import { useCreateUserMutation } from "../news/news-api"

export const useAddUser =()=>{
    const [addUser] = useCreateUserMutation();
    return {
        addUser
    }
}