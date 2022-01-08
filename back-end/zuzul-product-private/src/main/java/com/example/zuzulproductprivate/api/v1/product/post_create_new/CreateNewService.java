package com.example.zuzulproductprivate.api.v1.product.post_create_new;

import com.example.zuzulproductprivate.common.repo.mongodb.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.security.Principal;

@Service
@RequiredArgsConstructor
public class CreateNewService {
    private final ProductRepository productRepository;

    public Response saveToDatabase(Payload payload, Principal principal) {

        return Response.builder()
                       .status("Success")
                       .build();
    }


}
