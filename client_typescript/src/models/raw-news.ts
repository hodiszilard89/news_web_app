import {News} from '../models/news'

export interface RawNews extends Omit<News,"releasedate"> {
    

    releasedate:string;
}