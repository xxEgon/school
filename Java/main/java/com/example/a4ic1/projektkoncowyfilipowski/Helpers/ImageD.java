package com.example.a4ic1.projektkoncowyfilipowski.Helpers;

/**
 * Created by 4ic1 on 2017-12-08.
 */
public class ImageD {

    private String ImageName;
    private String ImageSaveTime;

    private String ImageSize;

    public ImageD(String imageName, String imageSaveTime, String imageSize) {
        ImageName = imageName;
        ImageSaveTime = imageSaveTime;
        ImageSize = imageSize;
    }

    public String getImageSaveTime() {
        return ImageSaveTime;
    }

    public void setImageSaveTime(String imageSaveTime) {
        ImageSaveTime = imageSaveTime;
    }

    public String getImageName() {
        return ImageName;
    }

    public void setImageName(String imageName) {
        ImageName = imageName;
    }

    public String getImageSize() {
        return ImageSize;
    }

    public void setImageSize(String imageSize) {
        ImageSize = imageSize;
    }

}
