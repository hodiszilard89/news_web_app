package com.example.hirportal01.service.impl;

import com.example.hirportal01.dto.CommentDTO;
import com.example.hirportal01.dto.NewsDTO;
import com.example.hirportal01.dto.UsersDTO;
//import com.example.hirportal01.entity.Comment;
import com.example.hirportal01.entity.Comment;
import com.example.hirportal01.entity.News;
import com.example.hirportal01.entity.TypeOfNews;
import com.example.hirportal01.entity.Users;
import com.example.hirportal01.repository.NewsRepository;
import com.example.hirportal01.repository.UsersRepository;
import com.example.hirportal01.service.NewsService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class NewsServiceImpl implements NewsService {
    ModelMapper modelMapper;
    NewsRepository newsRepository;
    UsersRepository usersRepository;

    public NewsServiceImpl(ModelMapper modelMapper, NewsRepository newsRepository,
                           UsersRepository usersRepository) {
        this.usersRepository=usersRepository;
        this.modelMapper = modelMapper;
        this.newsRepository = newsRepository;
    }

    @Override
    public Optional<NewsDTO> findByID(Long id) {
        Optional<News> optionalNews=newsRepository.findById(id);
        return optionalNews.map(news -> modelMapper.map(news,NewsDTO.class));
    }

    @Override
    public List<NewsDTO> findAll() {
        List<News> newsList = newsRepository.findAll();
        return newsList.stream().map(news -> modelMapper
                        .map(news,NewsDTO.class))
                        .collect(Collectors.toList());
    }

    @Override
    public void delete(Long id) {
        Optional<News> optionalNews = newsRepository.findById(id);
        if(optionalNews.isPresent()){
            newsRepository.delete(optionalNews.get());
        }
        else{
            throw new RuntimeException();
        }
    }

    @Override
    public NewsDTO update(NewsDTO newsDTO) {
        Optional<News> optionalNews=newsRepository.findById(newsDTO.getId());
        if (optionalNews.isEmpty()){
            throw new RuntimeException();
            }
        News savedNews = newsRepository.save(modelMapper.map(newsDTO,News.class));
        return modelMapper.map(savedNews,NewsDTO.class);
    }

//    @Override
//    public void addComment(Comment comment) {
//        Optional<News> optionalNews = newsRepository.findById(comment.getNews().getId());
//        if(optionalNews.isEmpty()){
//            throw new RuntimeException();
//        } else{
//            optionalNews.get().getComments().add(comment);
//        }
//    }

    @Override
    public NewsDTO save(NewsDTO newsDTO) {
        newsDTO.setId(null);
        News news=newsRepository.save(modelMapper
                                      .map(newsDTO,News.class));
        return modelMapper.map(news,NewsDTO.class);
    }

    @Override
    public List<NewsDTO> findNewsByType(TypeOfNews type) {
//        List<News> optionalNewsList = newsRepository.findNewsByType(type);
//        if (optionalNewsList.isEmpty()){
//            throw new RuntimeException();
//        }
//        return optionalNewsList.stream().map(news -> modelMapper
//                        .map(news,NewsDTO.class))
//                        .collect(Collectors.toList());
        List<NewsDTO> response = type.getNews().stream().map(
                news -> modelMapper.map(news,NewsDTO.class))
                        .collect(Collectors.toList());

        return response;
    }

    /**
     * TODO
     */
    public List<UsersDTO> getLikers(Long id){
        Optional<News> optionalNews = newsRepository.findById(id);
        if (optionalNews.isPresent()){
            News news = optionalNews.get();
           // List<Users> usersList =  news.getLikes();
            List<Users> usersList =  null;

            return usersList.stream().map(users -> modelMapper
                               .map(users,UsersDTO.class))
                               .collect(Collectors.toList());
        }
        return null;
    }

    public void addComment(CommentDTO commentDTO) {
        //Users users= usersRepository.getById(commentDTO.getWriter().getId());
        Optional<NewsDTO> optionalNewsDTO=findByID(commentDTO.getNews().getId());
        if (optionalNewsDTO.isPresent()){
            News news=modelMapper.map(optionalNewsDTO.get(),News.class);
            List<Comment> list=news.getComments();
            list.add(modelMapper.map(commentDTO,Comment.class));
            news.setComments(list);
            System.out.println(news.getComments().size());
        }else{
            throw new RuntimeException();
        }
    }
}
