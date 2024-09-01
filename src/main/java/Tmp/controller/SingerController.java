package Tmp.controller;

import Tmp.service.SingerService;
import Tmp.utils.Result;
import Tmp.utils.ResultCodeEnum;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("singer")
@CrossOrigin
public class SingerController {

    @Autowired
    private SingerService singerService;

    // TODO: Login Impl
    // @GetMapping("login")
    // public Result login(@RequestParam String username, @RequestParam String password) {
    // Result result = userService.login(username, password);
    // return result;
    // }

    @PostMapping("register")
    public Result register(@RequestParam String username, @RequestParam String password) {

        Result result = singerService.register(username, password);
        if (result.getCode().equals(ResultCodeEnum.USER_EXIST.getCode())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(result).getBody();
        }
        return ResponseEntity.ok(result).getBody();
    }

}