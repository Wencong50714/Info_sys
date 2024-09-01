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

    @GetMapping("login")
    public Result login(@RequestParam String username, @RequestParam String password) {

        return singerService.login(username, password);
    }

    @PostMapping("register")
    public Result register(@RequestParam String username, @RequestParam String password) {

        return singerService.register(username, password);
    }
}