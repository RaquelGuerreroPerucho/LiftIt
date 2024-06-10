package com.example.liftIt_SpringBoot.service;

import com.example.liftIt_SpringBoot.model.SocialMediaModel;
import com.example.liftIt_SpringBoot.repository.SocialMediaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class SocialMediaService {

    @Autowired
    private SocialMediaRepository socialMediaRepository;

    public List<SocialMediaModel> findAll() {
        return socialMediaRepository.findAll();
    }

    public Optional<SocialMediaModel> findById(Long id) {
        return socialMediaRepository.findById(id);
    }

    public List<SocialMediaModel> findByUsername(String name) {
        return socialMediaRepository.findByUserUsername(name);
    }

    public SocialMediaModel createSocialMedia(SocialMediaModel socialMediaModel) {
        return socialMediaRepository.save(socialMediaModel);
    }

    public SocialMediaModel updateSocialMedia(Long id, SocialMediaModel socialMediaModel) {
        if (socialMediaRepository.existsById(id)) {
            socialMediaModel.setId(id);
            return socialMediaRepository.save(socialMediaModel);
        } else {
            return null; // O manejar el error de otra manera según tus necesidades
        }
    }

    public void deleteSocialMedia(Long id) {
        socialMediaRepository.deleteById(id);
    }
}
