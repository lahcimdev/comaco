package pl.lahcimdev.comaco.service;

import net.coobird.thumbnailator.Thumbnails;
import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import pl.lahcimdev.comaco.user.domain.UserType;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Comparator;

@Service
public class UserPhotoService {

    @Value("${dataUrl}")
    private String dataUrl;
    private final String IMAGE_TYPE = ".png";

    public String savePhoto(UserType userType, Long id, String userPhoto) {
        File userDirectory = createDirectory(userType, id);
        Path userPhotoPath = Paths.get(userDirectory.getAbsolutePath(), UserPhotoSize.IMAGE_256x256.getFileName() + IMAGE_TYPE);
        byte[] userPhotoBytes = Base64.decodeBase64(userPhoto);
        try {
            Files.write(userPhotoPath, userPhotoBytes);
            Thumbnails.of(userPhotoPath.toString())
                    .size(UserPhotoSize.IMAGE_72x72.getWidth(), UserPhotoSize.IMAGE_72x72.getHeight())
                    .toFile(userDirectory.getAbsolutePath() + "\\" + UserPhotoSize.IMAGE_72x72.getFileName() + IMAGE_TYPE);
            Thumbnails.of(userPhotoPath.toString())
                    .size(UserPhotoSize.IMAGE_32x32.getWidth(), UserPhotoSize.IMAGE_32x32.getHeight())
                    .toFile(userDirectory.getAbsolutePath() + "\\" + UserPhotoSize.IMAGE_32x32.getFileName() + IMAGE_TYPE);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return userPhotoPath.toString();
    }

    public String getPhoto(String url, UserPhotoSize userPhotoSize) {
        byte[] userPhotoBytes = null;
        if (url != null) {
            String urlImageName = null;
            switch (userPhotoSize) {
                case IMAGE_256x256: {
                    urlImageName = url;
                    break;
                }
                case IMAGE_72x72: {
                    urlImageName = url.replace(UserPhotoSize.IMAGE_256x256.getFileName(), UserPhotoSize.IMAGE_72x72.getFileName());
                    break;
                }
                case IMAGE_32x32: {
                    urlImageName = url.replace(UserPhotoSize.IMAGE_256x256.getFileName(), UserPhotoSize.IMAGE_32x32.getFileName());
                    break;
                }
            }
            if (new File(urlImageName).canRead()) {
                Path userPhotoPath = Paths.get(urlImageName);
                try {
                    userPhotoBytes = Files.readAllBytes(userPhotoPath);
                } catch (IOException e) {
                    e.printStackTrace();
                }
                return Base64.encodeBase64String(userPhotoBytes);
            }
        }
        return null;
    }

    public void deleteUserPhoto(UserType userType, Long id) {
        Path userPhotoPath = Paths.get(dataUrl, userType.toString().toLowerCase(), id.toString());
        if (Files.exists(userPhotoPath)) {
            try {
                Files.walk(userPhotoPath)
                        .filter(filePath -> filePath.toString().contains(UserPhotoSize.IMAGE_256x256.getFileName()))
                        .map(Path::toFile)
                        .forEach(File::delete);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    public void deleteUserDirectory(UserType userType, Long id) {
        Path userPhotoPath = Paths.get(dataUrl, userType.toString().toLowerCase(), id.toString());
        if (Files.exists(userPhotoPath)) {
            try {
                Files.walk(userPhotoPath)
                        .sorted(Comparator.reverseOrder())
                        .map(Path::toFile)
                        .forEach(File::delete);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    public File createDirectory(UserType userType, Long id) {
        File userDirectory = new File(dataUrl + userType.toString().toLowerCase(), id.toString());
        if (!userDirectory.exists()) {
            userDirectory.mkdirs();
        }
        return userDirectory;
    }


}
