import {User} from './user'
import {RawNews} from './raw-news'

export interface Comment {
    id?:number;
    text:string;
    writer:User;
    news:RawNews;
    releasedate:Date;
}