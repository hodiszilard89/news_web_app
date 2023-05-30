package com.example.hirportal01.controller;

import com.example.hirportal01.dto.NewsDTO;
import com.example.hirportal01.dto.TypeOfNewsDTO;
import com.example.hirportal01.dto.UsersDTO;
import com.example.hirportal01.entity.Comment;
import com.example.hirportal01.service.impl.NewsServiceImpl;
import com.example.hirportal01.service.impl.TypeOfNewsImpl;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/news")
public class NewsController {

    private final NewsServiceImpl newsService;
    private final TypeOfNewsImpl typeOfNewsService;

    public NewsController(NewsServiceImpl newsService, TypeOfNewsImpl typeOfNewsService) {
        this.newsService = newsService;
        this.typeOfNewsService = typeOfNewsService;
    }

    @RequestMapping(path ="/addcomment", method = RequestMethod.POST)
    public ResponseEntity  <NewsDTO> addComment(){
        //System.out.println(comment);
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
    public ResponseEntity<List<NewsDTO>>findByType(@PathVariable String type){

        return ResponseEntity.ok(newsService.findNewsByType(type));
    }

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<List<NewsDTO>>findAll(){

        return ResponseEntity.ok(newsService.findAll());
    }
    @RequestMapping(path = "/fromto",method = RequestMethod.GET)
    public ResponseEntity<List<NewsDTO>>fromTo(@RequestBody String requestBody){
        //System.out.println("asdasdasdasdasd "+requestBody);
        return ResponseEntity.ok(null);
    }

    @RequestMapping(path = "{id}",method = RequestMethod.DELETE)
    public  ResponseEntity<Void>delete(@PathVariable Long id){
        newsService.delete(id);
        return  ResponseEntity.noContent().build();
    }

    @RequestMapping(method = RequestMethod.PUT)
    public  ResponseEntity<NewsDTO>update(@RequestBody NewsDTO newsDTO){
        return ResponseEntity.ok(newsService.update(newsDTO));
    }

    @RequestMapping(method = RequestMethod.POST)
    public  ResponseEntity<NewsDTO>save(@RequestBody NewsDTO newsDTO){
        return ResponseEntity.status(HttpStatus.CREATED).body(
                newsService.save(newsDTO)
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
