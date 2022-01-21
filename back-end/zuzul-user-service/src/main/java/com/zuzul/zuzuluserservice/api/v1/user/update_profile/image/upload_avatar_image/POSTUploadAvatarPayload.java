package com.zuzul.zuzuluserservice.api.v1.user.update_profile.image.upload_avatar_image;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class POSTUploadAvatarPayload {
    private String userId;
}
