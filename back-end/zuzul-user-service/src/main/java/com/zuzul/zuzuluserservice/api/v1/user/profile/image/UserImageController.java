package com.zuzul.zuzuluserservice.api.v1.user.profile.image;

import com.zuzul.zuzuluserservice.api.v1.user.profile.image.upload_avatar_image.POSTUploadAvatarPayload;
import com.zuzul.zuzuluserservice.api.v1.user.profile.image.upload_avatar_image.POSTUploadAvatarResponse;
import com.zuzul.zuzuluserservice.api.v1.user.profile.image.upload_avatar_image.UploadAvatar;
import com.zuzul.zuzuluserservice.common.ultis.Constant;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.security.RolesAllowed;
import java.io.IOException;
import java.security.Principal;

@RestController
@RequiredArgsConstructor
@RequestMapping(Constant.rootPathV1)
public class UserImageController {
    private final UploadAvatar uploadAvatar;

    @RolesAllowed("TEST_ROLE")
    @PostMapping("/user/avatar")
    public POSTUploadAvatarResponse uploadAvatar (POSTUploadAvatarPayload payload,
                                                  @RequestPart("avatarImage") MultipartFile avatarImage,
                                                  Principal principal) throws IOException {
        return uploadAvatar.uploadAvatar(payload.getUserId(), avatarImage, principal);
    }

}
