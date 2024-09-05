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

let currentPlaylistId = null;

// 用于查看播放列表中的歌曲
function viewPlaylistSongs(playlistId) {
    currentPlaylistId = playlistId; // 存储当前播放列表ID
    getPlaylistSongs(playlistId);
}

// 获取播放列表的所有歌曲并展示
function getPlaylistSongs(playlistId) {
    const data = `playlist_id=${encodeURIComponent(playlistId)}`;

    fetch("/user/get_playlist_songs", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: data
    })
    .then(response => response.json())
    .then(data => {
        if (data.code === 509) {
            alert('Playlist does not exist!');
        } else {
            displaySongsInTable(data.data, playlistId); // 将 playlistId 传递给 displaySongsInTable
        }
    })
    .catch(error => {
        console.error('Error fetching songs:', error);
        alert('Failed to fetch songs!');
    });
}



// 打开模态窗口，并添加动画效果
function openSongsModal() {
    const modal = document.getElementById('songsModal');
    modal.style.display = 'flex'; // 先显示模态窗口
    setTimeout(() => {
        modal.classList.add('show'); // 延迟添加显示类，确保过渡效果
    }, 10); // 微小的延迟，以触发过渡效果
}

// 关闭模态窗口，并添加动画效果
function closeSongsModal() {
    const modal = document.getElementById('songsModal');
    modal.classList.remove('show'); // 移除显示类，触发过渡效果
    modal.classList.add('hide'); // 添加隐藏类

    // 延迟隐藏模态框，等待动画结束
    setTimeout(() => {
        modal.style.display = 'none';
        modal.classList.remove('hide'); // 移除隐藏类，为下次显示准备
    }, 500); // 与 CSS 中的动画持续时间匹配
}



// 在模态窗口中显示歌曲列表
function displaySongsInTable(songs) {
    const songsTableBody = document.querySelector('#songsTable tbody');

    // 清空现有的歌曲数据
    songsTableBody.innerHTML = '';

    // 如果没有歌曲则隐藏表格
    if (songs.length === 0) {
        alert('No songs in this playlist');
        closeSongsModal(); // 没有歌曲时关闭模态窗口
        return;
    }

    // 遍历并插入歌曲数据
    songs.forEach(song => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${song.id}</td>
            <td>${song.singerName}</td>
            <td>${song.title}</td>
            <td>${song.star}</td>
            <td>
                <button class="delete-song-btn" onclick="removeSongFromPlaylist(${song.id})">Delete</button>
            </td>
        `;
        songsTableBody.appendChild(row);
    });

    // 打开模态窗口
    openSongsModal();
}



// 删除播放列表中的歌曲
function removeSongFromPlaylist(songId) {
    const playlistId = currentPlaylistId; // 假设当前播放列表ID存储在此变量中

    const data = `playlist_id=${encodeURIComponent(playlistId)}&song_id=${encodeURIComponent(songId)}`;

    fetch("/user/remove_song_from_playlist", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: data
    })
    .then(response => response.json())
    .then(data => {
        if (data.code === 200) {
            alert('Song removed from playlist successfully!');
            // 重新加载歌曲列表
            getPlaylistSongs(playlistId);
        } else {
            alert('Failed to remove song from playlist!');
        }
    })
    .catch(error => {
        console.error('Error removing song:', error);
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