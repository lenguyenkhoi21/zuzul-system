package com.example.springbootmockimage.common;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "aws")
public class AWS {
    public static class Credentials {
        private String accessKeyId;
        private String secretKeyId;

        public Credentials() {
        }

        public Credentials(String accessKeyId, String secretKeyId) {
            this.accessKeyId = accessKeyId;
            this.secretKeyId = secretKeyId;
        }

        public String getAccessKeyId() {
            return accessKeyId;
        }

        public void setAccessKeyId(String accessKeyId) {
            this.accessKeyId = accessKeyId;
        }

        public String getSecretKeyId() {
            return secretKeyId;
        }

        public void setSecretKeyId(String secretKeyId) {
            this.secretKeyId = secretKeyId;
        }
    }

    private final Credentials credentials = new Credentials();

    public Credentials getCredentials() {
        return credentials;
    }

}
