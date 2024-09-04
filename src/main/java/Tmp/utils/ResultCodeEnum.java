package Tmp.utils;

public enum ResultCodeEnum {
    SUCCESS(200, "success"), USERNAME_ERROR(501, "usernameError"), PASSWORD_ERROR(503, "passwordError"),
    NOTLOGIN(504, "notLogin"), USERNAME_USED(505, "userNameUsed"), USER_EXIST(506, "userExist"),
    DEFAULT_ERROR(507, "Default Error"), SONG_NOT_EXIST(508, "Song not Exist"),
    PLAYLIST_NOT_EXIST(509, "Playlist not exist");

    private Integer code;
    private String message;

    private ResultCodeEnum(Integer code, String message) {
        this.code = code;
        this.message = message;
    }

    public Integer getCode() {
        return code;
    }

    public String getMessage() {
        return message;
    }
}