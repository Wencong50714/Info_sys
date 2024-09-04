package Tmp.service.impl;

import Tmp.mapper.SingerMapper;
import Tmp.pojo.Singer;
import Tmp.pojo.Song;
import Tmp.pojo.User;
import Tmp.service.SingerService;
import Tmp.utils.Result;
import Tmp.utils.ResultCodeEnum;
import com.alibaba.druid.util.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service

public class SingerServiceImpl implements SingerService {

    @Autowired
    private SingerMapper singerMapper;

    @Override
    public Result login(String username, String password) {
        Singer loginSinger = singerMapper.findSingerBySingerName(username);
        // 返回值为空意味着不存在该用户名
        if (loginSinger == null) {
            return Result.build(null, ResultCodeEnum.USERNAME_ERROR);
        }

        // 若传入的密码不为空，且与数据库返回的密码相同，登录成功
        if (!StringUtils.isEmpty(password) && password.equals(loginSinger.getPassword())) {
            return Result.ok(loginSinger.getId());
        }

        // 密码错误
        return Result.build(null, ResultCodeEnum.PASSWORD_ERROR);
    }

    @Override
    public Result register(String username, String password) {
        try {
            singerMapper.insertSinger(username, password);
            return Result.ok(null);
        } catch (Exception e) {
            // 插入异常通常是已经存在相同用户名的用户
            return Result.build(null, ResultCodeEnum.USER_EXIST);
        }
    }

    @Override
    public Result getSingernameById(String id) {
        String username = singerMapper.getSingerName(id);

        if (username == null) {
            return Result.build(null, ResultCodeEnum.DEFAULT_ERROR);
        }
        return Result.ok(username);
    }

    @Override
    public Result createNewSong(String songName, String singerId) {
        try {
            String singerName = singerMapper.getSingerName(singerId);

            singerMapper.insertSong(songName, singerId, singerName);

            return Result.ok(null);
        } catch (Exception e) {
            return Result.build(null, ResultCodeEnum.DEFAULT_ERROR);
        }
    }

    @Override
    public Result getSong(String singerId) {
        List<Song> songs = singerMapper.getSong(singerId);

        return Result.ok(songs);
    }
}
