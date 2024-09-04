package Tmp.mapper;

import Tmp.pojo.Playlist;
import Tmp.pojo.Song;
import Tmp.pojo.User;

import java.util.List;

public interface UserMapper {
    User findUserByUsername(String username);

    Song findSongById(String id);

    Playlist findPlaylistById(String id);

    void insertUser(String username, String password);

    String getUsername(String user_id);

    List<Playlist> findPlayListByUserId(String user_id);

    void createPlayList(String user_id, String name, String description);

    void deletePlayList(String play_list_id);

    List<Song> getAllSongs();

    List<String> getSongsIdFromPlaylist(String playlist_id);

    void add_song_to_playlist(String playlist_id, String song_id);

    void remove_song_from_playlist(String playlist_id, String song_id);

    void incSongStar(String song_id);

    void decSongStar(String song_id);
}
