package Tmp.mapper;

import Tmp.pojo.User;

public interface UserMapper {
    User findUserByUsername(String username);

    void insertUser(String username, String password);
}
