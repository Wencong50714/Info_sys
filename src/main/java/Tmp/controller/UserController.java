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

    @PostMapping("get_playlist_songs")
    public Result find_song_in_playlist(@RequestParam String playlist_id) {
        return userService.getPlayListSongs(playlist_id);
    }

    @PostMapping("add_song_to_playlist")
    public Result add_song_to_playlist(@RequestParam String playlist_id, @RequestParam String song_id) {
        return userService.addSongToPlayList(playlist_id, song_id);
    }

    @PostMapping("remove_song_from_playlist")
    public Result remove_song_to_playlist(@RequestParam String playlist_id, @RequestParam String song_id) {
        return userService.removeSongFromPlaylist(playlist_id, song_id);
    }

    @PostMapping("star_song")
    public Result starSong(@RequestParam String song_id) {
        return userService.starSong(song_id);
    }

    @PostMapping("unstar_song")
    public Result unstarSong(@RequestParam String song_id) {
        return userService.unstarSong(song_id);
    }
}