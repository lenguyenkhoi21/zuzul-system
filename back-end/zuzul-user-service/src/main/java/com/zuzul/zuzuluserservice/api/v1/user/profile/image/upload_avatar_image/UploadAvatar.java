package com.zuzul.zuzuluserservice.api.v1.user.profile.image.upload_avatar_image;

import com.zuzul.zuzuluserservice.common.model.mongodb.UserInfo;
import com.zuzul.zuzuluserservice.common.repo.mongodb.UserInfoRepository;
import com.zuzul.zuzuluserservice.common.ultis.FunctionalUtils;
import com.zuzul.zuzuluserservice.common.ultis.ImageUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.security.Principal;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class UploadAvatar {
    private final ImageUtils imageUtils;
    private final UserInfoRepository userInfoRepository;

    public POSTUploadAvatarResponse uploadAvatar (String userId, MultipartFile avatarImage, Principal principal) throws IOException {
        if (principal.getName().equals(userId)) {
            String imageName = FunctionalUtils.renameAvatarImageName(Objects.requireNonNull(avatarImage.getOriginalFilename()));

            boolean isUploaded = imageUtils.uploadUserImage(userId, imageName, avatarImage.getBytes());

            UserInfo userInfo = userInfoRepository.findUserInfoByUserId(userId);

            List<String> avatarImages = userInfo.getUserAvatarPhotos();

            avatarImages.add(imageName);

            userInfo.setUserAvatarPhotos(avatarImages);
            userInfo.setCurrentAvatar(imageName);

            userInfoRepository.save(userInfo);
            return POSTUploadAvatarResponse
                    .builder()
                    .status("SUCCESS")
                    .avatar(isUploaded)
                    .build();
        }

        return POSTUploadAvatarResponse
                .builder()
                .status("FAIL")
                .avatar(false)
                .build();
    }
}
