# Music Info System

### Table

系统中有三种账号, 分别为
- Admin
- User
- Singer

以及两种对象
- 播放列表
- 单曲

其中用户具有
- 查看歌曲信息
- 创建/删除播放列表
  - 每个用户都有默认的收藏播放列表
- 为播放列表添加/删除歌曲
  - 收藏/取消收藏歌曲属于此种操作

### ROADMAP
以下是一些开发目标

前端:
- [ ] 美化 [注册界面](./src/main/resources/static/register.html)
- [ ] 美化 [登录界面](./src/main/resources/static/login.html)

后端:
- [ ] TODO

### 注意
本地测试的时候注意修改这个[application.yaml](./src/main/resources/application.yaml) 为自己本地 mysql 的账号密码数据库 