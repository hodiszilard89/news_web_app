package com.example.hirportal01.service.impl;

import com.example.hirportal01.dto.CommentDTO;
import com.example.hirportal01.dto.UsersDTO;
import com.example.hirportal01.entity.Comment;
import com.example.hirportal01.entity.Law;
import com.example.hirportal01.entity.Users;
import com.example.hirportal01.exception.EntityNotFoundException;
import com.example.hirportal01.repository.LawRepository;
import com.example.hirportal01.repository.UsersRepository;
import com.example.hirportal01.service.UsersService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import com.google.gson.Gson;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * átadódik az adat a adatbázis reétegből a service rétegbe
 */

@Service
public class UsersServiceImpl implements UsersService {

    private final ModelMapper modelMapper;
    private final LawRepository lawRepository;
    private final UsersRepository usersRepository;

    public UsersServiceImpl(ModelMapper modelMapper, LawRepository lawRepository, UsersRepository usersRepository) {
        this.modelMapper = modelMapper;
        this.lawRepository = lawRepository;
        this.usersRepository = usersRepository;
    }

    @Override
    public List<UsersDTO> findAll() {
        List<Users> newsList = usersRepository.findAll();

        return newsList.stream()
                .map(anUsers -> modelMapper.map(anUsers,UsersDTO.class))
                .collect(Collectors.toList());  //listába gyűjti a feldolgozott (átmappelt) elemeket

    }

    @Override
    public UsersDTO create(UsersDTO userDTO) {
        Long l= 3L;
       // Law law = new Law();
        userDTO.setId(null);
        Optional<Law> readerLaw = lawRepository.findById(l);

        Users resultUsers =   usersRepository.save(
               modelMapper.map(userDTO,Users.class)); //egylépésben alakítja át entityvé és menti el

        //System.out.println(law.getUsers().size());
        UsersDTO usersDTO = modelMapper.map(resultUsers,UsersDTO.class);
        if (readerLaw.isPresent())
        {
            readerLaw.get().getUsers().add(resultUsers);
            lawRepository.save(readerLaw.get());
            //System.out.println("titel "+readerLaw.get().getTitle());
        }
        return usersDTO;
    }

    @Override
    public Optional<UsersDTO> findById(Long id) {
        Optional<Users> optionalUser=usersRepository.findById(id);
        return optionalUser.map(user ->modelMapper.map(user,UsersDTO.class)) ;
    }

    @Override
    public UsersDTO update(UsersDTO usersDTO) {
        Long id = usersDTO.getId();
        Optional<Users> optionalUser = usersRepository.findById(id);

        if(optionalUser.isEmpty()){
            throw new EntityNotFoundException("User not found with id="+id);
        }

        Users usersTemplates = modelMapper.map(usersDTO,Users.class);
        Users savedUser=usersRepository.save(usersTemplates);
        return modelMapper.map(savedUser,UsersDTO.class);
    }

    @Override
    public void delete(Long id) {
        Optional<Users> optionalUser = usersRepository.findById(id);
        if(optionalUser.isPresent()){
            usersRepository.delete(optionalUser.get());
        }
        else {
            throw new EntityNotFoundException("User");
        }
    }

    @Override
    public UsersDTO findUser(String username, String password) {
        Optional<Users> optionalUser = usersRepository.findUser(username,password);
        if (optionalUser.isPresent()){
            return modelMapper.map(optionalUser.get(),UsersDTO.class);
        }
        else {throw new EntityNotFoundException("User");}
    }

    @Override
    public void addComment(CommentDTO commentDTO) {
        Comment comment = modelMapper.map(commentDTO,Comment.class);
        Optional<UsersDTO> optionalUsersDTO = findById(commentDTO.getWriter().getId());
        if(optionalUsersDTO.isPresent()){
            Users user = modelMapper.map (optionalUsersDTO.get(), Users.class);
            List<Comment> comments = user.getComments();
            comments.add(comment);
            user.setComments(comments);
        }
        else{
            throw new EntityNotFoundException("user");
        }
    }

    public UsersDTO findUserByChatName(String username) {
        System.out.println(username);
        Optional<Users> optionalUser = usersRepository.findUserByEmail(username);
        if (optionalUser.isPresent()){
            return modelMapper.map(optionalUser.get(),UsersDTO.class);
        }
        else {throw new EntityNotFoundException("User");}
    }
}
