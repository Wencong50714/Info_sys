package Tmp.mapper;

import Tmp.pojo.Singer;

public interface SingerMapper {

    Singer findSingerBySingerName(String username);
    void insertSinger(String username, String password);
}
