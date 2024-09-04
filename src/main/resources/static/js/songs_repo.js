let currentSongId = null;
let userId = null; // 定义 userId 用于存储用户ID

// 页面加载时获取用户ID
function repo_load() {
    // 获取用户的ID
    userId = localStorage.getItem('currentUser_token');
    if (!userId) {
        alert('User not logged in!');
        window.location.href = '../login.html'; // 如果未登录，跳转到登录页面
        return;
    }

    // 获取所有歌曲
    fetch_all_songs();
}

// 获取所有歌曲
function fetch_all_songs() {
    fetch("/user/all_song", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
    .then(response => response.json())
    .then(data => {
        const tableBody = document.querySelector('#songTable tbody');
        tableBody.innerHTML = ''; // 清空表格内容

        // 渲染歌曲数据
        data.data.forEach(song => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${song.id}</td>
                <td>${song.singerName}</td>
                <td>${song.title}</td>
                <td>${song.star}</td>
                <td><button class="op-btn" onclick="openModal(${song.id})">Add to Playlist</button></td>
            `;
            tableBody.appendChild(row);
        });
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// 打开弹窗并显示播放列表
function openModal(songId) {
    currentSongId = songId; // 设置当前歌曲ID
    fetchPlaylist(); // 获取播放列表
    document.getElementById('myModal').style.display = 'flex';
}

// 关闭弹窗
function closeModal() {
    document.getElementById('myModal').style.display = 'none';
}

// 获取播放列表并显示在弹窗中
function fetchPlaylist() {
    fetch("/user/fetch_playlist", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `user_id=${encodeURIComponent(userId)}` // 传递用户ID
    })
    .then(response => response.json())
    .then(data => {
        if (data.code === 507) {
            console.log('Error: Failed to fetch playlist');
        } else {
            const playlistContainer = document.querySelector('#playlistContainer');
            playlistContainer.innerHTML = ''; // 清空已有的播放列表

            // 渲染播放列表
            data.data.forEach(playlist => {
                const playlistItem = document.createElement('div');
                playlistItem.classList.add('playlist-item');
                playlistItem.innerHTML = `<p>${playlist.playListName}</p>`;
                playlistItem.onclick = function() {
                    addSongToPlaylist(playlist.id, currentSongId); // 将歌曲添加到选中的播放列表
                };
                playlistContainer.appendChild(playlistItem);
            });
        }
    })
    .catch(error => {
        console.error('Error fetching playlist:', error);
    });
}

// 将歌曲添加到播放列表
function addSongToPlaylist(playlistId, songId) {
    const data = `playlist_id=${encodeURIComponent(playlistId)}&song_id=${encodeURIComponent(songId)}`;

    fetch("/user/add_song_to_playlist", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: data
    })
    .then(response => response.json())
    .then(data => {
        if (data.code === 508) {
            alert('Song does not exist!');
        } else if (data.code === 509) {
            alert('Playlist does not exist!');
        } else {
            alert('Song added to playlist successfully!');
            closeModal(); // 关闭弹窗
        }
    })
    .catch(error => {
        console.error('Error adding song to playlist:', error);
    });
}


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