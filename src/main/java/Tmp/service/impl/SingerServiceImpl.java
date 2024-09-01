package Tmp.service.impl;

import Tmp.mapper.SingerMapper;
import Tmp.service.SingerService;
import Tmp.utils.Result;
import Tmp.utils.ResultCodeEnum;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service

public class SingerServiceImpl implements SingerService {

    @Autowired
    private SingerMapper singerMapper;

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
}
