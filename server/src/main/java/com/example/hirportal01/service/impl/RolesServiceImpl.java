package com.example.hirportal01.service.impl;

import com.example.hirportal01.dto.RolesDTO;
import com.example.hirportal01.entity.Roles;
import com.example.hirportal01.exception.EntityNotFoundException;

import com.example.hirportal01.repository.RolesRepository;
import com.example.hirportal01.service.RolesService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class RolesServiceImpl implements RolesService {
    ModelMapper modelMapper;
    RolesRepository rolesRepository;

    public RolesServiceImpl(ModelMapper modelMapper, RolesRepository rolesRepository) {
        this.modelMapper = modelMapper;
        this.rolesRepository = rolesRepository;
    }


    @Override
    public RolesDTO create(RolesDTO rolesDTO) {
        rolesDTO.setId(null);
        Roles resultRoles = rolesRepository.save(modelMapper.map(rolesDTO, Roles.class));
        return modelMapper.map(resultRoles, RolesDTO.class);
    }

    @Override
    public List<RolesDTO> findAll() {
        List<Roles> allRoles =rolesRepository.findAll();
        return allRoles.stream()
                .map(roles -> modelMapper.map(roles, RolesDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public void delete(Long id) {
        Optional<Roles> deletingRoles = rolesRepository.findById(id);
        if (deletingRoles.isPresent()){
            rolesRepository.delete(deletingRoles.get());
        } else {
            throw new EntityNotFoundException("Roles");
        }
    }

    @Override
    public RolesDTO update(RolesDTO rolesDTO) {
        Optional<Roles> optionalRoles = rolesRepository.findById(rolesDTO.getId());
        Roles updateRoles =modelMapper.map(rolesDTO, Roles.class);

        if (optionalRoles.isEmpty()){
            throw new EntityNotFoundException("Roles");
        }
        return modelMapper.map(rolesRepository.save(updateRoles), RolesDTO.class);
    }

    @Override
    public RolesDTO findById(Long id) {
        Optional<Roles> optionalRoles= rolesRepository.findById(id);
        if (optionalRoles.isEmpty()){
            throw new RuntimeException();
        }
        return modelMapper.map(optionalRoles.get(), RolesDTO.class);
    }


}
