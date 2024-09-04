package Tmp.mapper;

import Tmp.pojo.Singer;
import Tmp.pojo.Song;

import java.util.List;

public interface SingerMapper {

    Singer findSingerBySingerName(String username);

    void insertSinger(String username, String password);

    String getSingerName(String id);

    void insertSong(String songname, String singerId, String singerName);

    List<Song> getSong(String singerId);
}
