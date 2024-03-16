package com.example.hirportal01.controller;

import com.example.hirportal01.dto.RolesDTO;
import com.example.hirportal01.service.RolesService;
import com.example.hirportal01.service.impl.RolesServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/roles")
public class RolesController {
    @Autowired
    private final RolesServiceImpl rolesService;
    public RolesController(RolesServiceImpl rolesService) {
        this.rolesService = rolesService;
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<RolesDTO> create(@RequestBody RolesDTO rolesDTO){
        return ResponseEntity.status(HttpStatus.CREATED).body( rolesService.create(rolesDTO));
    }

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<List<RolesDTO>>findAll(){
        return ResponseEntity.ok(rolesService.findAll());
    }


    @RequestMapping(path = "/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<RolesDTO>delete(@PathVariable Long id){
        rolesService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @RequestMapping(method = RequestMethod.PUT)
    public ResponseEntity<RolesDTO> update(@RequestBody RolesDTO rolesDTO){
        return ResponseEntity.ok(rolesService.update(rolesDTO));
    }

    @RequestMapping(path = "/{id}",method = RequestMethod.GET)
    public ResponseEntity<RolesDTO> getById(@PathVariable Long id){
        return ResponseEntity.ok().body(rolesService.findById(id));
    }
}
