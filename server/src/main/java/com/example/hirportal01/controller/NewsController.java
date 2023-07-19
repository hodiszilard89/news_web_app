package com.example.hirportal01.controller;

//import com.example.hirportal01.dto.CommentDTO;
import com.example.hirportal01.dto.CommentDTO;
import com.example.hirportal01.dto.NewsDTO;
import com.example.hirportal01.dto.TypeOfNewsDTO;
import com.example.hirportal01.dto.UsersDTO;
//import com.example.hirportal01.entity.Comment;
import com.example.hirportal01.entity.TypeOfNews;
import org.json.JSONObject;
import com.example.hirportal01.entity.News;
import com.example.hirportal01.service.impl.NewsServiceImpl;
import com.example.hirportal01.service.impl.TypeOfNewsImpl;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
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
    public ResponseEntity  <NewsDTO> addComment(@RequestBody CommentDTO commentDTO){
//        JSONObject jsonObject = new JSONObject(string);
//        CommentDTO commentDTO=modelMapper.map(jsonObject.toMap(),CommentDTO.class);
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

    @RequestMapping(path="/type/{type}",method = RequestMethod.GET)
    public ResponseEntity<List<NewsDTO>>findByType(@PathVariable TypeOfNews type){

        return ResponseEntity.ok(newsService.findNewsByType(type));
    }

    @RequestMapping(method = RequestMethod.GET)

    public ResponseEntity<List<NewsDTO>>findAll(){
        //System.out.println(jsonObject);
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

        newsDTO.setReleaseDate(dt);
        newsService.update(newsDTO);
        return ResponseEntity.ok(null);
    }

    @RequestMapping(method = RequestMethod.POST)
    public  ResponseEntity<NewsDTO>save(@RequestBody String jsonString){
        System.out.println(jsonString);
        JSONObject jsonObject = new JSONObject(jsonString);
        NewsDTO newsDTO=modelMapper.map(jsonObject.toMap(),NewsDTO.class);
        Date dt = new Date();
        newsDTO.setReleaseDate(dt);
        //System.out.println(newsDTO.getReleaseDate());
        //ystem.out.println(newsDTO.getImgPath());
        System.out.println("types?: "+newsDTO.getTypes());
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
