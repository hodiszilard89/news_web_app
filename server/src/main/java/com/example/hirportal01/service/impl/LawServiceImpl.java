package com.example.hirportal01.service.impl;

import com.example.hirportal01.dto.LawDTO;
import com.example.hirportal01.entity.Law;
import com.example.hirportal01.exception.EntityNotFoundException;
import com.example.hirportal01.repository.LawRepository;
import com.example.hirportal01.service.LawService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class LawServiceImpl implements LawService {
    ModelMapper modelMapper;
    LawRepository lawRepository;

    public LawServiceImpl(ModelMapper modelMapper, LawRepository lawRepository) {
        this.modelMapper = modelMapper;
        this.lawRepository = lawRepository;
    }


    @Override
    public LawDTO create(LawDTO lawDTO) {
        lawDTO.setId(null);
        Law resultLaw = lawRepository.save(modelMapper.map(lawDTO, Law.class));
        return modelMapper.map(resultLaw,LawDTO.class);
    }

    @Override
    public List<LawDTO> findAll() {
        List<Law> allLaw=lawRepository.findAll();
        return allLaw.stream()
                .map(law -> modelMapper.map(law,LawDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public void delete(Long id) {
        Optional<Law> deletingLaw = lawRepository.findById(id);
        if (deletingLaw.isPresent()){
            lawRepository.delete(deletingLaw.get());
        } else {
            throw new EntityNotFoundException("Law");
        }
    }

    @Override
    public LawDTO update(LawDTO lawDTO) {
        Optional<Law> optionalLaw = lawRepository.findById(lawDTO.getId());
        Law updateLaw=modelMapper.map(lawDTO,Law.class);

        if (optionalLaw.isEmpty()){
            throw new EntityNotFoundException("Law");
        }
        return modelMapper.map(lawRepository.save(updateLaw),LawDTO.class);
    }

    @Override
    public LawDTO findById(Long id) {
        Optional<Law> optionalLaw= lawRepository.findById(id);
        if (optionalLaw.isEmpty()){
            throw new RuntimeException();
        }
        return modelMapper.map(optionalLaw.get(),LawDTO.class);
    }


}
