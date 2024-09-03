package Tmp.service;

import Tmp.utils.Result;

public interface SingerService {
    Result login(String username, String password);

    Result register(String username, String password);

    Result getSingernameById(String id);

    Result createNewSong(String songName, String singerId);

    Result getSong(String singerId);
}
