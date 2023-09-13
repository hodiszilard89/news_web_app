import { Comment } from "../models/comment";
import { createNews } from "./create-news";
import { createUser } from "./create-user";

export const createComment = ():Comment =>({
    id:undefined,
    text:"",
    writer:createUser(),
    news:createNews(),
    releaseDate:new Date()
}) 