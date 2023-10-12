import { RawNews } from "./raw-news";
import {User} from "./user"


export interface Like {
    news:RawNews,
    user:User
}