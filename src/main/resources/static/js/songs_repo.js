let currentSongId = null;
let userId = null;

function repo_load() {
    userId = localStorage.getItem('currentUser_token');
    if (!userId) {
        alert('User not logged in!');
        window.location.href = '../login.html';
        return;
    }
    fetch_all_songs();
}

// 获取所有歌曲并展示
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
        tableBody.innerHTML = ''; 

        // 渲染歌曲数据
        data.data.forEach(song => {
            const row = document.createElement('tr');
            row.setAttribute('data-id', song.id); // 设置歌曲ID，便于后续更新star数量
            row.innerHTML = `
                <td>${song.id}</td>
                <td>${song.singerName}</td>
                <td>${song.title}</td>
                <td>
                    <label class="container">
                        <input type="checkbox" onchange="starSong(${song.id})" ${song.userHasStarred ? 'checked' : ''}>
                        <svg height="24px" viewBox="0 0 24 24" width="24px" xmlns="http://www.w3.org/2000/svg">
                            <g>
                                <g>
                                    <path d="M9.362,9.158c0,0-3.16,0.35-5.268,0.584c-0.19,0.023-0.358,0.15-0.421,0.343s0,0.394,0.14,0.521
                                        c1.566,1.429,3.919,3.569,3.919,3.569c-0.002,0-0.646,3.113-1.074,5.19c-0.036,0.188,0.032,0.387,0.196,0.506
                                        c0.163,0.119,0.373,0.121,0.538,0.028c1.844-1.048,4.606-2.624,4.606-2.624s2.763,1.576,4.604,2.625
                                        c0.168,0.092,0.378,0.09,0.541-0.029c0.164-0.119,0.232-0.318,0.195-0.505c-0.428-2.078-1.071-5.191-1.071-5.191
                                        s2.353-2.14,3.919-3.566c0.14-0.131,0.202-0.332,0.14-0.524s-0.23-0.319-0.42-0.341c-2.108-0.236-5.269-0.586-5.269-0.586
                                        s-1.31-2.898-2.183-4.83c-0.082-0.173-0.254-0.294-0.456-0.294s-0.375,0.122-0.453,0.294C10.671,6.26,9.362,9.158,9.362,9.158z"></path>
                                </g>
                            </g>
                        </svg>
                        <span class="star-count-label" id="star-count-${song.id}">${song.star}</span> <!-- 添加 star 数量展示 -->
                </td>
                    </label>
                    
                <td><button class="op-btn" onclick="openModal(${song.id})">Add to Playlist</button></td>
            `;
            tableBody.appendChild(row);
        });
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// 点赞功能
function starSong(songId) {
    const data = `song_id=${encodeURIComponent(songId)}`;

    fetch("/user/star_song", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: data
    })
    .then(response => response.json())
    .then(data => {
        console.log('Star response:', data); // 调试信息

        if (data.code === 508) {
            alert('Song does not exist!');
        } else if (data.code === 200) {
            alert('Song liked successfully!');
            
            // 获取当前的 star 数量
            const starElement = document.getElementById(`star-count-${songId}`);
            let currentStarCount = parseInt(starElement.textContent, 10);
            
            // 如果当前 star 数量有效，进行自增操作
            if (!isNaN(currentStarCount)) {
                updateStarCount(songId, currentStarCount + 1); // 手动自增 star 数量
            }
        }
    })
    .catch(error => {
        console.error('Error liking song:', error);
    });
}

// 更新 star 数量
function updateStarCount(songId, newStarCount) {
    const starElement = document.getElementById(`star-count-${songId}`);
    
    if (starElement) {
        starElement.textContent = newStarCount; // 更新 star 数量
    } else {
        console.error(`Star element for songId ${songId} not found`);
    }

    const starButton = document.querySelector(`tr[data-id='${songId}'] input[type='checkbox']`);
    if (starButton) {
        starButton.checked = true; // 更新为已点赞状态
    }
}



// 打开模态窗口
function openModal(songId) {
    currentSongId = songId; // 设置当前的歌曲ID
    fetchPlaylist(); // 获取播放列表数据

    const modal = document.getElementById('myModal');
    modal.style.display = 'flex';  // 先显示模态框
    setTimeout(() => {
        modal.classList.add('show');  // 使用class控制透明度动画
    }, 10);  // 微小延迟以触发过渡效果
}

// 关闭模态窗口
function closeModal() {
    const modal = document.getElementById('myModal');
    modal.classList.remove('show');  // 去掉显示类，触发透明度动画
    setTimeout(() => {
        modal.style.display = 'none';  // 动画结束后隐藏模态框
    }, 500);  // 等待动画完成后再隐藏
}

// 获取播放列表
function fetchPlaylist() {
    fetch("/user/fetch_playlist", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `user_id=${encodeURIComponent(userId)}`
    })
    .then(response => response.json())
    .then(data => {
        const playlistContainer = document.getElementById('playlistContainer');
        playlistContainer.innerHTML = '';  // 清空已有的播放列表

        if (data.data && data.data.length > 0) {
            data.data.forEach(playlist => {
                const playlistItem = document.createElement('div');
                playlistItem.classList.add('playlist-item');
                playlistItem.innerHTML = `<p>${playlist.playListName}</p>`;
                playlistItem.onclick = function() {
                    addSongToPlaylist(playlist.id, currentSongId); // 添加歌曲到播放列表
                };
                playlistContainer.appendChild(playlistItem);  // 将每个播放列表项添加到容器中
            });
        } else {
            playlistContainer.innerHTML = '<p>No playlists available</p>';  // 如果没有播放列表，显示提示信息
        }
    })
    .catch(error => {
        console.error('Error fetching playlists:', error);
    });
}


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
            closeModal();
        }
    })
    .catch(error => {
        console.error('Error adding song to playlist:', error);
    });
}


document.addEventListener('DOMContentLoaded', function () {
    document.body.classList.add('fade-in'); // 页面加载后添加fade-in类，实现渐入效果
});

// 跳转渐入效果

document.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function (event) {
        event.preventDefault(); // 阻止立即跳转
        const href = this.href; // 获取目标链接

        // 触发渐出效果
        document.body.classList.remove('fade-in');
        document.body.style.opacity = 0;

        // 延迟跳转，等待过渡动画完成
        setTimeout(function () {
            window.location.href = href;
        }, 1000); // 1秒的延迟与CSS中的transition时间匹配
    });
});