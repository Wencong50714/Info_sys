package Tmp.pojo;

import lombok.Data;

@Data
public class Playlist {
    private int id;
    private int userId;
    private String playListName;
    private String description;
}
