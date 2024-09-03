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

    @PostMapping("getname")
    public Result getName(@RequestParam String id) {

        return userService.getUsernameById(id);
    }

    @PostMapping("play_list")
    public Result new_playlist(@RequestParam String user_id, @RequestParam String name,
            @RequestParam String description) {
        return userService.createPlayList(user_id, name, description);
    }

    @PostMapping("delete")
    public Result delete(@RequestParam String play_list_id) {
        return userService.deletePlayList(play_list_id);
    }

    @PostMapping("fetch_playlist")
    public Result fetch_playlist(@RequestParam String user_id) {
        return userService.showPlatList(user_id);
    }

    @GetMapping("all_song")
    public Result get_all_song() {
        return userService.getAllSongs();
    }
}