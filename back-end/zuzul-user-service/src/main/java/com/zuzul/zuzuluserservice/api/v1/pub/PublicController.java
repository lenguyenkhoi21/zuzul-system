package com.zuzul.zuzuluserservice.api.v1.pub;

import com.zuzul.zuzuluserservice.api.v1.pub.get_avatar_image.GetAvatar;
import com.zuzul.zuzuluserservice.common.ultis.Constant;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.zuzul.zuzuluserservice.api.v1.pub.get_cover_image.GetCover;

@RestController
@RequestMapping(Constant.rootPathV1)
@RequiredArgsConstructor
public class PublicController {
    private final GetCover getCover;
    private final GetAvatar getAvatar;

    @GetMapping("/pub/image/user/{userId}/cover/{imageName}")
    public ResponseEntity<byte[]> getCover (@PathVariable("userId") String userId, @PathVariable("imageName") String imageName) {
        return ResponseEntity
                .ok()
                .contentType(MediaType.IMAGE_PNG)
                .contentType(MediaType.IMAGE_JPEG)
                .body(getCover.getCover(userId, imageName));
    }

    @GetMapping("/pub/image/user/{userId}/avatar/{imageName}")
    public ResponseEntity<byte[]> getAvatar (@PathVariable("userId") String userId, @PathVariable("imageName") String imageName) {
        return ResponseEntity
                .ok()
                .contentType(MediaType.IMAGE_PNG)
                .contentType(MediaType.IMAGE_JPEG)
                .body(getAvatar.getAvatar(userId, imageName));
    }
}
