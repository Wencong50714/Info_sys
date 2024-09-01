package Tmp.controller;

import Tmp.service.UserService;
import Tmp.utils.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("user")
@CrossOrigin
public class UserController {

    @Autowired
    private UserService userService;

    // For test use
    @GetMapping("login")
    public Result get_login(@RequestParam String username, @RequestParam String password) {

        return userService.login(username, password);
    }

    @PostMapping("register")
    public Result register(@RequestParam String username, @RequestParam String password) {

        return userService.register(username, password);
    }
}