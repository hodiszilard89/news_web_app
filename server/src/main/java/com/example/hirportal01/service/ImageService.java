package com.example.hirportal01.service;

import org.springframework.core.io.Resource;

public interface ImageService {
    String add(String image);
    Resource get(String imageName);
}
