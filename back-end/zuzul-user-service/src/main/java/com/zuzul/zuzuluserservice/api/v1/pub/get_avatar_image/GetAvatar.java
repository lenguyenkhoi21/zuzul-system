package com.zuzul.zuzuluserservice.api.v1.pub.get_avatar_image;

import com.zuzul.zuzuluserservice.common.ultis.ImageUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class GetAvatar {
    private final ImageUtils imageUtils;

    public byte [] getAvatar (String userId, String imageName)  {
        return imageUtils.getImage(imageName, userId);
    }
}
