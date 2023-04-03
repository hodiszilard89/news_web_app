package com.example.hirportal01.service.impl;

import com.example.hirportal01.dto.UsersDTO;
import com.example.hirportal01.entity.Users;
import com.example.hirportal01.exception.EntityNotFoundException;
import com.example.hirportal01.repository.UsersRepository;
import com.example.hirportal01.service.UsersService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * átadódik az adat a adatbázis reétegből a service rétegbe
 */

@Service
public class UsersServiceImpl implements UsersService {

    private final ModelMapper modelMapper;

    private final UsersRepository usersRepository;

    public UsersServiceImpl(ModelMapper modelMapper, UsersRepository usersRepository) {
        this.modelMapper = modelMapper;
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
    public UsersDTO create(UsersDTO newsDTO) {
        newsDTO.setId(null);
        Users resultUsers =   usersRepository.save(
               modelMapper.map(newsDTO,Users.class)); //egylépésben alakítja át entityvé és menti el
        return modelMapper.map(resultUsers,UsersDTO.class);
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

}
