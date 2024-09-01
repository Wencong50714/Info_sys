package Tmp.controller;

import Tmp.utils.Result;
import Tmp.utils.ResultCodeEnum;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("admin")
@CrossOrigin
public class AdminController {

    @GetMapping("login")
    public Result login(@RequestParam String username, @RequestParam String password) {

        // 管理员密码写死
        if (username.equals("Admin") && password.equals("adminadmin")) {
            return Result.ok(null);
        }
        return Result.build(null, ResultCodeEnum.PASSWORD_ERROR);
    }
}
