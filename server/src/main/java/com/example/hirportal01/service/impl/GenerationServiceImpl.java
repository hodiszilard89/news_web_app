package com.example.hirportal01.service.impl;

import com.example.hirportal01.dto.NewsDTO;
import com.example.hirportal01.dto.TypeOfNewsDTO;
import com.example.hirportal01.dto.UsersDTO;
import com.example.hirportal01.entity.TypeOfNews;
import com.example.hirportal01.entity.Users;
import com.example.hirportal01.service.GenerationService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class GenerationServiceImpl implements GenerationService {
    private final String TITLE="Porchetta chuck pancetta";
    private final String SUB = "Porchetta chuck pancetta dolore quis ham laborum nulla.";

    private final String CONTENT="Porchetta chuck pancetta dolore quis ham laborum nulla.  Porchetta buffalo aute, quis chislic non corned beef flank capicola rump ad frankfurter jerky short ribs.  Occaecat jowl elit aliqua, anim sunt shankle chuck dolore ham magna swine.  Eu ut shoulder ullamco aliqua tail.  Picanha porchetta velit ham hock ea hamburger in dolor landjaeger pancetta.  Hamburger fatback tail, pariatur tenderloin aliquip exercitation andouille commodo excepteur alcatra velit bresaola. Nisi tempor dolore nostrud mollit anim spare ribs filet mignon laboris.  Ut porchetta ground round kielbasa pork loin qui jowl ipsum prosciutto.  Ut non pancetta beef duis cupidatat, capicola quis laborum consectetur sirloin jerky turkey fugiat short loin.  Laboris aliqua aliquip ham hock. In fatback flank in esse ipsum cupim ullamco prosciutto alcatra ea velit.  Exercitation tail capicola dolor laboris pastrami nulla.  Boudin ullamco qui labore adipisicing drumstick mollit corned beef.  Quis salami non corned beef, cillum cupim strip steak.  Dolore cupim ut, commodo exercitation sint et ham hock dolore aute consectetur in pork rump brisket. , Deserunt drumstick aliquip, anim venison prosciutto enim pork chop t-bone dolore ground round rump.  Pork short loin pork loin officia non in.  Veniam nulla tongue cow, ham hock capicola aliqua pastrami ex pork chop chicken anim sunt aliquip kielbasa.  Est pork labore id andouille dolore voluptate eiusmod elit swine consequat. Cillum irure bacon, proident consequat occaecat sed culpa picanha.  Rump consequat et non deserunt kevin bresaola quis capicola nostrud dolore veniam.  Shankle venison spare ribs eiusmod quis consequat non biltong ad pork sausage aliquip.  Shoulder rump labore, minim short ribs biltong fugiat pig prosciutto porchetta kevin reprehenderit aliqua sed elit.";
      private final ModelMapper modelMapper;
    private final UsersServiceImpl usersService;
    private final TypeOfNewsImpl typeOfNewsService;
    private final  NewsServiceImpl newsService;

    public GenerationServiceImpl(ModelMapper modelMapper, UsersServiceImpl usersService, TypeOfNewsImpl typeOfNewsService, NewsServiceImpl newsService) {
        this.modelMapper = modelMapper;
        this.usersService = usersService;
        this.typeOfNewsService = typeOfNewsService;
        this.newsService = newsService;
    }

    @Override
    public void generation() {
        Random random = new Random();
        List<UsersDTO> usersList = usersService.findAll();
        List<TypeOfNewsDTO> typeList = typeOfNewsService.findAll();
        NewsDTO news = new NewsDTO();
        Users user;
        TypeOfNews type;
        Set<TypeOfNews> types = new HashSet<>();
        Date dt = new Date();
        for (int i=0; i<100; i++) {
            dt = new Date();
            types.clear();
            user = modelMapper.map(usersList.get(random.nextInt(usersList.size())), Users.class);
            type = modelMapper.map(typeList.get(random.nextInt(typeList.size())), TypeOfNews.class);
            news.setWriter(user);
            types.add(type);
            news.setTypes(types);
            news.setReleasedate(dt);
            news.setImgPath("https://picsum.photos/id/"+random.nextInt(101)+"/600/300");
            news.setTitle(TITLE);
            news.setSubtitle(SUB);
            news.setText(CONTENT);
            newsService.save(news);
        }
    }
}
