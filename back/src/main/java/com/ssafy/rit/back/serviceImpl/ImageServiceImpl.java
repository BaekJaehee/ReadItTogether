package com.ssafy.rit.back.serviceImpl;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.ssafy.rit.back.dto.member.requestDto.ImageSaveRequestDto;
import com.ssafy.rit.back.service.ImageService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.awt.*;
import java.util.ArrayList;
import java.util.List;

@Service
public class ImageServiceImpl implements ImageService {

    @Value("${spring.cloud.aws.s3.bucket-name}")
    private String bucketName;




}
