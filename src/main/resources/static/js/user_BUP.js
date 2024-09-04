function user_load() {
    getName();
    fetchPlaylist();
}

function getName() {

    // Get id
    id = localStorage.getItem('currentUser_token');
    if (!id) {
        // 如果不存在就跳转到首页
        window.location.href = '../login.html';
    }

    console.log(id);

    // 构建 URL
    fetch('/user/getname', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `id=${encodeURIComponent(id)}`
    })
        .then(response => response.json())
        .then(data => {
            if (data.code === 200) {
                name = data.data;
                document.getElementById('output').textContent = name;
                console.log(name);
            } else {
                alert('Get Name failed.');
            }
        })

    // Get Name from Backend
}

function submitPlaylist() {
    const name = document.getElementById('playlist-name').value;
    const description = document.getElementById('playlist-description').value;

    if (!name) {
        alert('Playlist name is required!');
        return;
    }

    if (!description) {
        alert('Description is required!');
        return;
    }

    const data = `user_id=${id}&name=${encodeURIComponent(name)}&description=${encodeURIComponent(description)}`;

    console.log(data)

    // 发送数据到后端
    fetch("/user/play_list", {  // 动态 URL
        method: 'POST',  // 如果你更改了 Spring Boot 方法的 HTTP 方法为 POST
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: data
    })
        .then(response => response.json())
        .then(data => {
            if (data.code === 507) {
                console.log('Error: Failed to add new playlist');
                alert('Failed to add new playlist!');
            } else {
                console.log('Success:', data);
                alert('Submit playlist successful!');
            }

        })

    window.location.href = window.location.href; // 刷新界面
}

function deletePlaylist() {
    const play_list_id = document.getElementById('playlist-id').value;

    if (!play_list_id) {
        alert('Playlist ID is required!');
        return;
    }

    const data = `play_list_id=${play_list_id}`;

    console.log(data);

    fetch("/user/delete", {  // 动态 URL
        method: 'POST',  // 如果你更改了 Spring Boot 方法的 HTTP 方法为 POST
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: data
    })
        .then(response => response.json())
        .then(data => {
            if (data.code === 507) {
                console.log('Error: Failed to delete playlist');
                alert('Failed to delete playlist!');
            }
        })
    window.location.href = window.location.href; // 刷新界面
}

function fetchPlaylist() {

    const data = `user_id=${id}`;

    fetch("/user/fetch_playlist", {  // 动态 URL
        method: 'POST',  // 如果你更改了 Spring Boot 方法的 HTTP 方法为 POST
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: data
    })
        .then(response => response.json())
        .then(data => {
            if (data.code === 507) {
                console.log('Error: Failed to fetch playlist');
                alert('Failed to fetch playlist!');
            } else {
                console.log('Success:', data);
                alert('Fetch playlist successful!');
            }

            console.log(data.data);

            const tableBody = document.querySelector('#playlistTable tbody');
            tableBody.innerHTML = ''; // Clear existing rows

            data.data.forEach(playlist => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${playlist.id}</td>
                    <td>${playlist.userId}</td>
                    <td>${playlist.playListName}</td>
                    <td>${playlist.description}</td>
                `;
                tableBody.appendChild(row);
            });
        })
}


// function addSongToPlaylist () {
//     // TODO(DWG): 填充下面的 playlist_id 和 song_id
//     const data = `playlist_id=${}&song_id=${}`;

//     fetch("/user/add_song_to_playlist", {  // 动态 URL
//         method: 'POST',  // 如果你更改了 Spring Boot 方法的 HTTP 方法为 POST
//         headers: {
//             'Content-Type': 'application/x-www-form-urlencoded'
//         },
//         body: data
//     })
//         .then(response => response.json())
//         .then(data => {
//             if (data.code === 508) {
//                 // TODO(DWG): 歌曲不存在, 做出相应处理
//             } else if (data.code == 509) {
//                 // TODO(DWG): 播放列表不存在, 做出相应处理
//             }

//             // TODO(DWG): 添加成功, 做出相应处理
//         })
// }

// function getPlaylistSongs() {
//     // TODO(DWG): 填充下面的 playlist_id
//     const data = `playlist_id=${}`;

//     fetch("/user/get_playlist_songs", {  // 动态 URL
//         method: 'POST',  // 如果你更改了 Spring Boot 方法的 HTTP 方法为 POST
//         headers: {
//             'Content-Type': 'application/x-www-form-urlencoded'
//         },
//         body: data
//     })
//         .then(response => response.json())
//         .then(data => {
//             if (data.code == 509) {
//                 // TODO(DWG): 播放列表不存在, 做出相应处理
//             }

//             data.data.forEach(song => {
//                 // TODO(DWG): 获取到列表中的所有歌曲, 对他们进行相应处理

//                 // 下面是一个使用例子
//                 // data.data.forEach(song => {
//                 //     console.log(song.singerName);
//                 //     const row = document.createElement('tr');
//                 //     row.innerHTML = `
//                 //     <td>${song.id}</td>
//                 //     <td>${song.singerName}</td>
//                 //     <td>${song.title}</td>
//                 //     <td>${song.star}</td>
//                 // `;
//                 //     tableBody.appendChild(row);
//                 // });
//             });
//         })
// }

// function starSong() {
//     // TODO(DWG): 填充下面的 song_id
//     const data = `song_id=${}`;

//     fetch("/user/star_song", {  // 动态 URL
//         method: 'POST',  // 如果你更改了 Spring Boot 方法的 HTTP 方法为 POST
//         headers: {
//             'Content-Type': 'application/x-www-form-urlencoded'
//         },
//         body: data
//     })
//         .then(response => response.json())
//         .then(data => {
//             if (data.code == 508) {
//                 // TODO(DWG): 歌曲不存在, 做出相应处理
//             }

//             // TODO(DWG): 点赞成功
//         })
// }

// function unstarSong() {
//     // TODO(DWG): 填充下面的 song_id
//     const data = `song_id=${}`;

//     fetch("/user/unstar_song", {  // 动态 URL
//         method: 'POST',  // 如果你更改了 Spring Boot 方法的 HTTP 方法为 POST
//         headers: {
//             'Content-Type': 'application/x-www-form-urlencoded'
//         },
//         body: data
//     })
//         .then(response => response.json())
//         .then(data => {
//             if (data.code == 508) {
//                 // TODO(DWG): 歌曲不存在, 做出相应处理
//             }

//             // TODO(DWG): 取消点赞成功
//         })
// }


document.addEventListener('DOMContentLoaded', function() {
    document.body.classList.add('fade-in'); // 页面加载后添加fade-in类，实现渐入效果
});


// 跳转渐入效果

document.querySelectorAll('a').forEach(function(link) {
    link.addEventListener('click', function(event) {
        event.preventDefault(); // 阻止立即跳转
        const href = this.href; // 获取目标链接

        // 触发渐出效果
        document.body.classList.remove('fade-in');
        document.body.style.opacity = 0;

        // 延迟跳转，等待过渡动画完成
        setTimeout(function() {
            window.location.href = href;
        }, 1000); // 1秒的延迟与CSS中的transition时间匹配
    });
});