package Tmp.service.impl;

import Tmp.mapper.UserMapper;
import Tmp.pojo.Playlist;
import Tmp.pojo.Song;
import Tmp.pojo.User;
import Tmp.service.UserService;
import Tmp.utils.Result;
import Tmp.utils.ResultCodeEnum;
import com.alibaba.druid.util.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserMapper userMapper;

    @Override
    public Result login(String username, String password) {
        User loginUser = userMapper.findUserByUsername(username);
        // 返回值为空意味着不存在该用户名
        if (loginUser == null) {
            return Result.build(null, ResultCodeEnum.USERNAME_ERROR);
        }

        // 若传入的密码不为空，且与数据库返回的密码相同，登录成功
        if (!StringUtils.isEmpty(password) && password.equals(loginUser.getPassword())) {
            return Result.ok(loginUser.getId());
        }

        // 密码错误
        return Result.build(null, ResultCodeEnum.PASSWORD_ERROR);
    }

    @Override
    public Result register(String username, String password) {
        try {
            userMapper.insertUser(username, password);
            return Result.ok(null);
        } catch (Exception e) {
            // 插入异常通常是已经存在相同用户名的用户
            return Result.build(null, ResultCodeEnum.USER_EXIST);
        }
    }

    @Override
    public Result createPlayList(String user_id, String name, String description) {
        try {
            userMapper.createPlayList(user_id, name, description);
            return Result.ok(null);
        } catch (Exception e) {
            // 插入异常通常是已经存在相同用户名的用户
            return Result.build(null, ResultCodeEnum.DEFAULT_ERROR);
        }
    }

    @Override
    public Result deletePlayList(String play_list_id) {
        try {
            userMapper.deletePlayList(play_list_id);
            return Result.ok(null);
        } catch (Exception e) {
            // 插入异常通常是已经存在相同用户名的用户
            return Result.build(null, ResultCodeEnum.DEFAULT_ERROR);
        }
    }

    @Override
    public Result showPlatList(String user_id) {

        List<Playlist> playlists = userMapper.findPlayListByUserId(user_id);
        return Result.ok(playlists);
    }

    @Override
    public Result getUsernameById(String user_id) {
        try {
            String name = userMapper.getUsername(user_id);
            return Result.ok(name);
        } catch (Exception e) {
            // 插入异常通常是已经存在相同用户名的用户
            return Result.build(null, ResultCodeEnum.DEFAULT_ERROR);
        }
    }

    @Override
    public Result getAllSongs() {

        List<Song> songs = userMapper.getAllSongs();

        for (Song song : songs) {
            System.out.println(song.toString());
        }
        return Result.ok(songs);
    }
}