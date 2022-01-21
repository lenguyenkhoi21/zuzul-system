package com.zuzul.zuzuluserservice.common.aws;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "aws")
public class AWS {
    public static class Credentials {
        private String accessKeyId;
        private String secretKeyId;
        private String storage;
        private String path;

        public Credentials() {
        }

        public Credentials(String accessKeyId, String secretKeyId, String storage, String path) {
            this.accessKeyId = accessKeyId;
            this.secretKeyId = secretKeyId;
            this.storage = storage;
            this.path = path;
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

        public String getStorage() {
            return storage;
        }

        public void setStorage(String storage) {
            this.storage = storage;
        }

        public String getPath() {
            return path;
        }

        public void setPath(String path) {
            this.path = path;
        }
    }

    private final Credentials credentials = new Credentials();

    public Credentials getCredentials() {
        return credentials;
    }

}
