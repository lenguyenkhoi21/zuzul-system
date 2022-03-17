package com.zuzul.zuzuluserservice.api.v1.user.profile.image.upload_cover_image;

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
public class UploadCover {
    private final ImageUtils imageUtils;
    private final UserInfoRepository userInfoRepository;

    public POSTUploadCoverResponse uploadCover (String userId, MultipartFile coverImage, Principal principal) throws IOException {
        if (principal.getName().equals(userId)) {
            String imageName = FunctionalUtils.renameCoverImageName(Objects.requireNonNull(coverImage.getOriginalFilename()));

            boolean isUploaded = imageUtils.uploadUserImage(userId, imageName, coverImage.getBytes());

            UserInfo userInfo = userInfoRepository.findUserInfoByUserId(userId);

            List<String> coverImages = userInfo.getUserCoverPhotos();

            coverImages.add(imageName);

            userInfo.setUserCoverPhotos(coverImages);
            userInfo.setCurrentCover(imageName);

            userInfoRepository.save(userInfo);
            return POSTUploadCoverResponse
                    .builder()
                    .status("SUCCESS")
                    .cover(isUploaded)
                    .build();
        }

        return POSTUploadCoverResponse
                .builder()
                .status("FAIL")
                .cover(false)
                .build();
    }
}
