package com.example.hirportal01.service.impl;

import com.example.hirportal01.dto.NewsDTO;
import com.example.hirportal01.dto.UsersDTO;
import com.example.hirportal01.entity.News;
import com.example.hirportal01.entity.Users;
import com.example.hirportal01.repository.NewsRepository;
import com.example.hirportal01.service.NewsService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class NewsServiceImpl implements NewsService {
    ModelMapper modelMapper;
    NewsRepository newsRepository;

    public NewsServiceImpl(ModelMapper modelMapper, NewsRepository newsRepository) {
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

    @Override
    public NewsDTO save(NewsDTO newsDTO) {
        newsDTO.setId(null);
        News news=newsRepository.save(modelMapper
                                      .map(newsDTO,News.class));
        return modelMapper.map(news,NewsDTO.class);
    }

    /**
     * TODO
     */
    public List<UsersDTO> getLikers(Long id){
        Optional<News> optionalNews = newsRepository.findById(id);
        if (optionalNews.isPresent()){
            News news = optionalNews.get();
            List<Users> usersList =  news.getLikes();

            return usersList.stream().map(users -> modelMapper
                               .map(users,UsersDTO.class))
                               .collect(Collectors.toList());
        }
        return null;
    }
}
