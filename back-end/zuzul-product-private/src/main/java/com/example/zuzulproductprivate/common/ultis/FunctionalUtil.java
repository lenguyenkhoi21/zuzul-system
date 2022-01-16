package com.example.zuzulproductprivate.common.ultis;

public class FunctionalUtil {

    public static String generatePrdUUID() {
        return "prd-" + java.util.UUID.randomUUID();
    }

    public static String generatePrdImageNameUUID() {
        return "prd-img-" + java.util.UUID.randomUUID();
    }

    public static String generateCategoryUUID () {
        return "cate-" + java.util.UUID.randomUUID();
    }

    public static String generateCategoryImageName () {
        return "cate-img-" + java.util.UUID.randomUUID();
    }

    public static String generateSubCategoryUUID () {
        return "sub-cate-" + java.util.UUID.randomUUID();
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

    public static String renameCategoryFile (String name) {
        String [] stringBetweenDots = name.split("\\.");
        String extension = stringBetweenDots[stringBetweenDots.length - 1];
        if (extension.contains("png") || extension.contains("jpg") || extension.contains("jpeg")) {
            return generateCategoryImageName() + "." + extension;
        }

        return null;
    }
}
