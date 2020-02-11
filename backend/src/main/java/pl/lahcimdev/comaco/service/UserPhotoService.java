package pl.lahcimdev.comaco.service;

import net.coobird.thumbnailator.Thumbnailator;
import net.coobird.thumbnailator.Thumbnails;
import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Service;
import pl.lahcimdev.comaco.user.domain.UserType;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
@ConfigurationProperties("directory")
public class UserPhotoService {

    private static String dataUrl;
    private static final String IMAGE_NAME_NORMAL = "avatar";
    private static final String IMAGE_NAME_SMALL = "avatar_72x72";
    private static final String IMAGE_TYPE = ".png";

    public void setDataUrl(String dataUrl) {
        UserPhotoService.dataUrl = dataUrl;
    }

    public static String savePhoto(UserType userType, String username, String userPhoto) {
        File userDirectory = createDirectory(userType, username);
        Path userPhotoPath = Paths.get(userDirectory.getAbsolutePath() + "\\" + IMAGE_NAME_NORMAL + IMAGE_TYPE);
        byte[] userPhotoBytes = Base64.decodeBase64(userPhoto);
        try {
            Files.write(userPhotoPath, userPhotoBytes);
            Thumbnails.of(userPhotoPath.toString())
                    .size(72, 72)
                    .toFile(userDirectory.getAbsolutePath() + "\\" + IMAGE_NAME_SMALL + IMAGE_TYPE);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return userPhotoPath.toString();
    }

    public static String getPhoto(String url) {
        byte[] userPhotoBytes = null;
        if (url != null && new File(url).canRead()) {
            Path userPhotoPath = Paths.get(url.replace(IMAGE_NAME_NORMAL, IMAGE_NAME_SMALL));
            try {
                userPhotoBytes = Files.readAllBytes(userPhotoPath);
            } catch (IOException e) {
                e.printStackTrace();
            }
        } else {
            return null;
            //wyjatek że nie ma pliku
        }
        return Base64.encodeBase64String(userPhotoBytes);
    }

    public static File createDirectory(UserType userType, String username) {
        File userDirectory = new File(dataUrl + userType.toString().toLowerCase(), username);
        if (!userDirectory.exists()) {
            userDirectory.mkdirs();
        }
        return userDirectory;
    }


}
