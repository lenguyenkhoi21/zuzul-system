package com.zuzul.zuzuluserservice.api.v1.user.profile.image.upload_avatar_image;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class POSTUploadAvatarResponse {
    private String status;
    private boolean avatar;
}
