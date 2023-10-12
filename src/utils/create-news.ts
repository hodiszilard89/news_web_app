import { create } from "domain"
import { News } from "../models/news"
import { Type } from "../models/type"
import { createUser } from "./create-user"
import { Comment } from "../models/comment"

export const createNews = (): News=>({

    imgPath:"",
    text:"új hír",
    subtitle:"",
    priority:false,
    title:"",
    types:[] as Type[],
    releasedate:new Date(),
    writer:createUser(),
    }
)