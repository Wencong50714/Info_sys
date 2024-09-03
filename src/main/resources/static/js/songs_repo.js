let currentLikeElement = null;

function repo_load() {
    fetch_all_songs();
}

function fetch_all_songs() {

    const response = fetch("/user/all_song", {  // 动态 URL
        method: 'Get',  // 如果你更改了 Spring Boot 方法的 HTTP 方法为 POST
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
    })
        .then(response => response.json())
        .then(data => {
            if (data.code === 507) {
                console.log('Error: Failed to get songs');
            }

            const tableBody = document.querySelector('#songTable tbody');
            tableBody.innerHTML = ''; // Clear existing rows

            console.log("Begin to render");

            data.data.forEach(song => {
                console.log(song.singerName);
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${song.id}</td>
                    <td>${song.singerName}</td>
                    <td>${song.title}</td>
                    <td>${song.star}</td>
                    <td><span class="like-button" onclick="openModal(this)">&#9734;</span></td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('Submit song failed!');
        });
}

function openModal(element) {
    currentLikeElement = element;
    document.getElementById('myModal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('myModal').style.display = 'none';
}

function submitPlaylist() {
    const playlistName = document.getElementById('playlistName').value;
    if (playlistName) {
        alert(`歌曲已添加到播放列表: ${playlistName}`);
        currentLikeElement.classList.add('liked');
        currentLikeElement.innerHTML = '&#9733;';
        closeModal();
    } else {
        alert('请输入播放列表名称！');
    }
}

window.onclick = function(event) {
    if (event.target === document.getElementById('myModal')) {
        closeModal();
    }
}