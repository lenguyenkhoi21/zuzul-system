package com.zuzul.zuzuluserservice.api.v1.pub.get_cover_image;

import com.zuzul.zuzuluserservice.common.ultis.ImageUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class GetCover {
    private final ImageUtils imageUtils;

    public byte [] getCover (String userId, String imageName)  {
        return imageUtils.getImage(imageName, userId);
    }
}
