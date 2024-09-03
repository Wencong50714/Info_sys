package Tmp.mapper;

import Tmp.pojo.Playlist;
import Tmp.pojo.Song;
import Tmp.pojo.User;

import java.util.List;

public interface UserMapper {
    User findUserByUsername(String username);

    void insertUser(String username, String password);

    String getUsername(String user_id);

    List<Playlist> findPlayListByUserId(String user_id);

    void createPlayList(String user_id, String name, String description);

    void deletePlayList(String play_list_id);

    List<Song> getAllSongs();
}
