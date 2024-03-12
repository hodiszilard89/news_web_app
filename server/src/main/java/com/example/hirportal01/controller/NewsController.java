package com.example.hirportal01.controller;

//import com.example.hirportal01.dto.CommentDTO;
import com.example.hirportal01.dto.*;
//import com.example.hirportal01.entity.Comment;
import org.json.JSONObject;
import com.example.hirportal01.service.impl.NewsServiceImpl;
import com.example.hirportal01.service.impl.TypeOfNewsImpl;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Base64;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/news")
public class NewsController {

     private final ModelMapper modelMapper;
    private final NewsServiceImpl newsService;
    private final TypeOfNewsImpl typeOfNewsService;



    public NewsController(ModelMapper modelMapper, NewsServiceImpl newsService, TypeOfNewsImpl typeOfNewsService) {
        this.modelMapper = modelMapper;
        this.newsService = newsService;
        this.typeOfNewsService = typeOfNewsService;

    }

    @RequestMapping(path ="/addcomment", method = RequestMethod.POST)
    public ResponseEntity  <NewsDTO> addComment(@RequestBody String string){
        JSONObject jsonObject = new JSONObject(string);
        CommentDTO commentDTO=modelMapper.map(jsonObject.toMap(),CommentDTO.class);
        newsService.addComment(commentDTO);
        return  ResponseEntity.ok(null);
    }

    @RequestMapping(path = "/gettypes" , method = RequestMethod.GET)
    public ResponseEntity<List<TypeOfNewsDTO>> getAllType(){
        return ResponseEntity.ok(typeOfNewsService.findAll());
    }


    @RequestMapping(path="/{id}",method = RequestMethod.GET)
    public ResponseEntity<NewsDTO> findById(@PathVariable Long id){
        Optional<NewsDTO> optionalNewsDTO = newsService.findByID(id);
        if(optionalNewsDTO.isPresent()){
            return ResponseEntity.ok(optionalNewsDTO.get());
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }

    @RequestMapping(path="/type/{id}/{limit}/{side}" ,method = RequestMethod.GET)
    public ResponseEntity<ResponseForNewsDTO>findByType(@PathVariable Long id, @PathVariable int limit, @PathVariable int side){

        System.out.println("side" + side);
        int startIndex= (side)*limit;
        int lastIndex=startIndex+limit;
       // ResponseForNewsDTO responseForNewsDTO = newsService.getNewsByTypeId(id, limit, side);
//        if (list.size()<lastIndex) lastIndex=list.size();
//        System.out.println("list .size"+list.size());
        System.out.println("/n kezdő index"+startIndex+"  vég "+lastIndex);


        return  ResponseEntity.ok(newsService.getNewsByTypeId(id, limit, side));

    }
//    @RequestMapping(path="/type" ,method = RequestMethod.GET)
//    public ResponseEntity<List<NewsDTO>>findByType(@RequestBody Object object){
//        System.out.println(object.toString());
//        return ResponseEntity.ok(null);
//        //return  ResponseEntity.ok(newsService.getNewsByTypeId(id));
//
//    }


    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<List<NewsDTO>>findAll(){

        return ResponseEntity.ok(newsService.findAll());
    }


    @RequestMapping(path = "{id}",method = RequestMethod.DELETE)
    public  ResponseEntity<Void>delete(@PathVariable Long id){
        newsService.delete(id);
        return  ResponseEntity.noContent().build();
    }

    @RequestMapping(method = RequestMethod.PUT)
    public  ResponseEntity<NewsDTO>update(@RequestBody String jsonString){

        JSONObject jsonObject = new JSONObject(jsonString);

        NewsDTO newsDTO=modelMapper.map(jsonObject.toMap(),NewsDTO.class);
        Date dt = new Date();

        newsDTO.setReleasedate(dt);
        newsService.update(newsDTO);
        return ResponseEntity.ok(null);
    }

    @RequestMapping(path = "/addlike", method = RequestMethod.POST)
    public  ResponseEntity<LikeDTO>addLike(@RequestBody String jsonString){
        JSONObject jsonObject = new JSONObject(jsonString);
        LikeDTO likeDTO=modelMapper.map(jsonObject.toMap(),LikeDTO.class);
        newsService.addLike(likeDTO);

        return ResponseEntity.status(HttpStatus.CREATED).body(likeDTO);
    }

    @RequestMapping(method = RequestMethod.POST)
    public  ResponseEntity<NewsDTO>save(@RequestBody NewsDTO newsDTO){
        Date dt = new Date();
        System.out.println(newsDTO.getText());
        newsDTO.setReleasedate(dt);
        newsService.save(newsDTO);

        return ResponseEntity.status(HttpStatus.CREATED).body(newsDTO
                );
    }

    @RequestMapping(path = "/like/{id}", method = RequestMethod.GET)
    public ResponseEntity<List<UsersDTO>> printLineLikes(@PathVariable Long id){
        List<UsersDTO> usersDTO=newsService.getLikers(id);
        if (usersDTO!=null){
            return ResponseEntity.ok(usersDTO);
        };
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }
}
