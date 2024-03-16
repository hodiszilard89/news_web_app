package com.example.hirportal01.service.impl;

import com.example.hirportal01.dto.TypeOfNewsDTO;
import com.example.hirportal01.entity.TypeOfNews;
import com.example.hirportal01.repository.TypeOfNewsRepository;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TypeOfNewsImpl {

    TypeOfNewsRepository typeOfNewsRepository;
    ModelMapper modelMapper;

    public TypeOfNewsImpl(TypeOfNewsRepository typeOfNewsRepository, ModelMapper modelMapper) {
        this.typeOfNewsRepository = typeOfNewsRepository;
        this.modelMapper = modelMapper;
    }



    public List<TypeOfNewsDTO> findAll(){
        List<TypeOfNews>  result=typeOfNewsRepository.findAll();

        return result.stream().map(type -> modelMapper
                .map(type, TypeOfNewsDTO.class))
                .collect(Collectors.toList());
    }
}
