# Music Info System

### Table

系统中有三种账号, 分别为
- Admin
- User
- Singer

以及两种对象
- 播放列表
- 单曲

用户具有
- 查看歌曲信息
- 创建/删除播放列表
- 为播放列表添加/删除歌曲
- 给歌曲点赞
等功能

歌手具有
- 发布/删除歌曲
- 查看自己歌曲信息
等功能

### MileStone
- tag v0.1 完成 用户/歌手 注册功能
- tag v0.2 完成 用户/歌手 登录功能, 并在前端页面保留了用户的 独有 id, 可用于后续操作
- tag v0.3 完成 歌手 创建歌曲已经显示已发布歌曲的功能
- tag v0.4 完成 用户 创建/删除/显示 playlist 的功能

### ROADMAP
以下是一些开发目标

前端:
- [ ] 美化 [注册界面](./src/main/resources/static/register.html)
- [ ] 美化 [登录界面](./src/main/resources/static/login.html)
- [ ] 美化 [歌手界面](./src/main/resources/static/singer_index.html)
- [ ] 将前端 [HTML](./src/main/resources/static) 中的 JavaScript 脚本提取成单独的文件，并将其存放在 js 文件夹下，同时修改 HTML 代码，使其更加整洁
- [ ] 将前端 [HTML](./src/main/resources/static) 中的 样式 CSS 提取成单独的文件, 将其放在 css 文件夹下, 同时修改 HTML 代码，使其更加整洁
 
后端:
- [x] 完成用户/歌手的注册功能
- [x] 完成用户/歌手的登录功能
- [x] 用户创建/删除 playlist
- [ ] 用户查看 playlist 中的歌
- [ ] 用户搜索歌曲
- [ ] 用户点赞歌曲
- [x] 歌手发布歌曲
- [x] 歌手查看自己的歌曲
- [ ] 系统管理员查看后台 用户/歌手/歌曲
- [ ] 系统管理员按照歌曲收藏数目排序

Additional
- [ ] 创建一个 UserInfo, 完成 UserInfo 相关内容 (增删改查)
- [ ] 创建一个 SingerInfo, 完成 SingerInfo 相关内容 (增删改查)
完成后在下面建表 sql 命令中添加对应的命令

### 本地运行测试时注意

- 本地测试的时候注意修改这个[application.yaml](./src/main/resources/application.yaml) 为自己本地 mysql 的账号密码数据库
- 本地需要在 navicat 中输入下面的 sql命令来建表

```sql
create table user
(
  id INT PRIMARY KEY AUTO_INCREMENT,
  username varchar(255),
  password varchar(255)
);


create table singer
(
  id INT PRIMARY KEY AUTO_INCREMENT,
  singer_name varchar(255),
  password varchar(255)
);


CREATE TABLE song (
  id INT PRIMARY KEY AUTO_INCREMENT,
  singer_id INT,
  title VARCHAR(255) NOT NULL,
  star INT,
  singer_name VARCHAR(255) NOT NULL,
  FOREIGN KEY (singer_id) REFERENCES singer(id)
);


CREATE TABLE playlist (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  play_list_name VARCHAR(255) NOT NULL,
  description TEXT
);
```
