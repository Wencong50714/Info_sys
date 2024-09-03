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
        .catch((error) => {
            console.error('Error:', error);
            alert('Login failed! Please try again later.');
        });

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
        .catch((error) => {
            console.error('Error:', error);
            alert('Delete playlist failed!');
        });
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
        .catch((error) => {
            console.error('Error:', error);
            alert('Fetch playlist failed!');
        });
}