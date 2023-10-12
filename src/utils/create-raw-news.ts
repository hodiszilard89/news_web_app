import { RawNews } from "../models";
import { Type } from "../models/type";

export const createRawNews = (): RawNews => ({

  title: "új raw hír",
  releasedate: new Date().toISOString().split("T")[0],
  subtitle:"",
  priority:false,
  imgPath:"",
  text:"",
  types:[] as Type[]

});
