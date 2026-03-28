package com.meditrust.backend.Controllers;

import com.meditrust.backend.Dto.PostRatingDto;
import com.meditrust.backend.Services.RatingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("*")
public class RatingController {

    @Autowired
    private RatingService rserv;

    @PostMapping("/postRating")
    public void postRating(@RequestBody PostRatingDto body) {
        rserv.postrating(body);
    }


}
