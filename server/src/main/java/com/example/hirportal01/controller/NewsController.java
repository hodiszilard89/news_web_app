package com.example.hirportal01.controller;

import com.example.hirportal01.dto.NewsDTO;
import com.example.hirportal01.dto.UsersDTO;
import com.example.hirportal01.service.NewsService;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.lang.reflect.Method;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/news")
public class NewsController {

    private final NewsService newsService;

    public NewsController(NewsService newsService) {
        this.newsService = newsService;
    }

    @RequestMapping(path="/{id}",method = RequestMethod.GET)
    public ResponseEntity<NewsDTO> findById(@PathVariable Long id){
        Optional<NewsDTO> optionalNewsDTO = newsService.findByID(id);
        if(optionalNewsDTO.isPresent()){
            return ResponseEntity.ok(optionalNewsDTO.get());
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<List<NewsDTO>>findAll(){
        return ResponseEntity.ok(newsService.findAll());
    }

    @RequestMapping(path = "/{id}",method = RequestMethod.DELETE)
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
