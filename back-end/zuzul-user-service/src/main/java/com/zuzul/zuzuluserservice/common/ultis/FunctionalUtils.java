package com.zuzul.zuzuluserservice.common.ultis;

public class FunctionalUtils {

    public static String generateAvatarUUID() {
        return "avatar-" + java.util.UUID.randomUUID();
    }

    public static String generateCoverUUID() {
        return "cover-" + java.util.UUID.randomUUID();
    }

    public static String generateAddressUUID () {
        return "address-" + java.util.UUID.randomUUID();
    }

    public static String renameAvatarImageName(String name) {
        String[] stringsBetweenDots = name.split("\\.");
        String extension = stringsBetweenDots[stringsBetweenDots.length-1];
        if (extension.contains("png") ||
                extension.contains("jpg") ||
                extension.contains("jpeg")
        ) {
            return generateAvatarUUID()+"."+extension;

        }
        return null;
    }

    public static String renameCoverImageName (String name) {
        String [] stringBetweenDots = name.split("\\.");
        String extension = stringBetweenDots[stringBetweenDots.length - 1];
        if (extension.contains("png") || extension.contains("jpg") || extension.contains("jpeg")) {
            return generateCoverUUID() + "." + extension;
        }

        return null;
    }
}
