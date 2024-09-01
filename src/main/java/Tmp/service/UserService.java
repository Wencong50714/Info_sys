package Tmp.service;

import Tmp.utils.Result;

public interface UserService {
    Result login(String username, String password);

    Result register(String username, String password);
}
