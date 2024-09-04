function user_load() {
    getName();
    fetchPlaylist(); // 加载已有的播放列表
}

function getName() {
    id = localStorage.getItem('currentUser_token');
    if (!id) {
        window.location.href = '../login.html'; // 如果不存在 token，跳转到登录页面
    }

    // 获取用户的名字并显示
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
            document.getElementById('output').textContent = name; // 显示用户名字
        } else {
            alert('Get Name failed.');
        }
    })
    .catch(error => {
        console.error('Error fetching name:', error);
    });
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

    // 发送数据到后端创建播放列表
    fetch("/user/play_list", {
        method: 'POST',
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
            
            // 创建成功后，重新获取所有播放列表并更新表格
            fetchPlaylist(); // 调用获取播放列表的函数
        }
    })
    .catch(error => {
        console.error('Error submitting playlist:', error);
    });
}

function deletePlaylist(playlistId) {
    const data = `play_list_id=${encodeURIComponent(playlistId)}`;

    fetch("/user/delete", {
        method: 'POST',
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
        } else {
            console.log('Success: Playlist deleted successfully');
            alert('Playlist deleted successfully!');
            
            // 调用 removePlaylistFromTable 方法从表格中删除该行
            removePlaylistFromTable(playlistId);
        }
    })
    .catch(error => {
        console.error('Error deleting playlist:', error);
    });
}

function removePlaylistFromTable(playlistId) {
    const row = document.querySelector(`tr[data-id='${playlistId}']`);
    if (row) {
        row.remove(); // 从 DOM 中删除该行
    }
}

function fetchPlaylist() {
    fetch("/user/fetch_playlist", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `user_id=${id}`
    })
    .then(response => response.json())
    .then(data => {
        if (data.code === 507) {
            console.log('Error: Failed to fetch playlists');
            alert('Failed to fetch playlists!');
        } else {
            const tableBody = document.querySelector('#playlistTable tbody');
            tableBody.innerHTML = ''; // 清空表格

            // 遍历所有播放列表并添加到表格中
            data.data.forEach(playlist => {
                addPlaylistToTable(playlist); // 使用 addPlaylistToTable 函数添加每个播放列表
            });
        }
    })
    .catch(error => {
        console.error('Error fetching playlists:', error);
    });
}


function addPlaylistToTable(playlist) {
    const tableBody = document.querySelector('#playlistTable tbody');
    const row = document.createElement('tr');
    row.setAttribute('data-id', playlist.id);

    // 添加表格行，并包含查看歌曲和删除按钮
    row.innerHTML = `
        <td>${playlist.id}</td>
        <td>${playlist.playListName}</td>
        <td>${playlist.description}</td>
        <td>
            <div class="action-buttons">
                <button class="view-songs-btn" onclick="viewPlaylistSongs(${playlist.id})">View Songs</button>
                <button class="delete-btn" onclick="deletePlaylist(${playlist.id})">Delete</button>
            </div>
        </td>
    `;
    
    tableBody.appendChild(row); // 将新行插入表格
}

// 实现查看歌曲功能
function viewPlaylistSongs(playlistId) {
    const data = `playlist_id=${encodeURIComponent(playlistId)}`;

    fetch("/user/fetch_playlist_songs", {  // 假设后端提供了此 API
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: data
    })
    .then(response => response.json())
    .then(data => {
        if (data.code === 509) {
            console.log('Error: Playlist does not exist');
            alert('Playlist does not exist!');
        } else {
            console.log('Success:', data);
            displaySongsInTable(data.data); // 调用函数显示歌曲
        }
    })
    .catch(error => {
        console.error('Error fetching songs:', error);
    });
}

// 在表格中显示歌曲
function displaySongsInTable(songs) {
    const songsTableBody = document.querySelector('#songsTable tbody');
    const songsHeader = document.getElementById('songsHeader');
    const songsTable = document.getElementById('songsTable');

    // 清空现有的歌曲数据
    songsTableBody.innerHTML = '';

    // 如果没有歌曲则隐藏表格
    if (songs.length === 0) {
        alert('No songs in this playlist');
        songsHeader.style.display = 'none';
        songsTable.style.display = 'none';
        return;
    }

    // 显示歌曲表格
    songsHeader.style.display = 'block';
    songsTable.style.display = 'table';

    // 遍历并插入歌曲数据
    songs.forEach(song => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${song.id}</td>
            <td>${song.singerName}</td>
            <td>${song.title}</td>
            <td>${song.star}</td>
        `;
        songsTableBody.appendChild(row);
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