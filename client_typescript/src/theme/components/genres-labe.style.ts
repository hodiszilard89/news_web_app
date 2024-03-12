import {ComponentMultiStyleConfig} from '@chakra-ui/react'


export const GenresLable: ComponentMultiStyleConfig ={
    parts:["tag","tagRemowe"],
    baseStyle:{
        tag:{
            fontSize: "16px",
            padding: ".1em  ",
            margin: "0 .2em",
            borderRadius: 4,
            border:"solid 1px",
            display:"inline",
            width:"auto"
        },
        tagRemowe:{
            fontStyle:"bold",
            boxSize:"4",      
            margin: ".5em 0 .5em .5em",
            padding: ".2em  ",
            color:"black",
            _hover:{
                cursor:"pointer"
                }
        }
    }
}
