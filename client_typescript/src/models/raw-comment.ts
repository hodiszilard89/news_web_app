import {Comment} from '../models/comment'

export interface RawComment extends Omit<Comment,"releasedate"> {
    releasedate:string;
}