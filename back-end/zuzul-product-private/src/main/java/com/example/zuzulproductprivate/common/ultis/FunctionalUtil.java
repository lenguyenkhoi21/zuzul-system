package com.example.zuzulproductprivate.common.ultis;

public class FunctionalUtil {

    public static String generatePrdUUID() {
        return "prd-" + java.util.UUID.randomUUID();
    }

    public static String generatePrdImageNameUUID() {
        return "prd-img-" + java.util.UUID.randomUUID();
    }

    public static String renameFile(String name) {
        String[] stringsBetweenDots = name.split("\\.");
        String extension = stringsBetweenDots[stringsBetweenDots.length-1];
        if (extension.contains("png") ||
            extension.contains("jpg") ||
            extension.contains("jpeg")
        ) {
            return generatePrdImageNameUUID()+"."+extension;

        }
        return null;
    }
}
