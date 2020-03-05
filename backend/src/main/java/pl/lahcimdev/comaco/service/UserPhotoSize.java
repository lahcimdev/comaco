package pl.lahcimdev.comaco.service;

public enum UserPhotoSize {

    IMAGE_256x256("avatar", 256, 256),
    IMAGE_72x72("avatar_72x72", 72, 72),
    IMAGE_32x32("avatar_32x32", 32, 32);

    private String fileName;
    private int width;
    private int height;

    UserPhotoSize(String fileName, int width, int height) {
        this.fileName = fileName;
        this.width = width;
        this.height = height;
    }

    public String getFileName() {
        return fileName;
    }

    public int getWidth() {
        return width;
    }

    public int getHeight() {
        return height;
    }
}
