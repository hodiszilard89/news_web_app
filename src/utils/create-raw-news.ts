import { RawNews } from "../models";
import { Type } from "../models/type";

export const createRawNews = (): RawNews => ({

  title: "új raw hír",
  releasedate: "",
  subtitle:"",
  imgPath:"",
  text:"",
  types:[] as Type[]

});
