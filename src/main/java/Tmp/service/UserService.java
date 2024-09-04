package Tmp.service;

import Tmp.utils.Result;

public interface UserService {
    Result login(String username, String password);

    Result register(String username, String password);

    Result getUsernameById(String user_id);

    Result createPlayList(String user_id, String name, String description);

    Result deletePlayList(String play_list_id);

    Result showPlatList(String user_id);

    Result addSongToPlayList(String playlist_id, String song_id);

    Result removeSongFromPlaylist(String playlist_id, String song_id);

    Result getAllSongs();

    Result getPlayListSongs(String playlist_id);

    Result starSong(String song_id);

    Result unstarSong(String song_id);
}
