var id;

function singer_load() {
    getName();
    fetchSongs();
}

function getName(is_singer) {

    // Get id
    id = localStorage.getItem('currentUser_token');
    if (!id) {
        // 如果不存在就跳转到首页
        window.location.href = '../login.html';
    }

    console.log(id);

    // 构建 URL
    const url = is_singer ? '/singer/getname' : '/user/getname';

    fetch(url, {
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

function handleSubmit(event) {
    event.preventDefault(); // 阻止表单的默认提交行为

    const songName = document.getElementById('song-name').value;

    // 创建要发送的数据
    const data = `songName=${encodeURIComponent(songName)}&singerId=${encodeURIComponent(id)}`;

    console.log(data)

    // 发送数据到后端
    fetch("/singer/newsong", {  // 动态 URL
        method: 'POST',  // 如果你更改了 Spring Boot 方法的 HTTP 方法为 POST
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: data
    })
        .then(response => response.json())
        .then(data => {
            if (data.code === 507) {
                console.log('Error: Failed to add new song');
                alert('Failed to add new song!');
            } else {
                console.log('Success:', data);
                alert('Submit song successful!');
            }

        })

    window.location.href = window.location.href; // 刷新界面
}

function fetchSongs() {
    const data = `singerId=${encodeURIComponent(id)}`;
    console.log(data)

    const response = fetch("/singer/getsong", {  // 动态 URL
        method: 'POST',  // 如果你更改了 Spring Boot 方法的 HTTP 方法为 POST
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: data
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
                `;
                tableBody.appendChild(row);
            });
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('Submit song failed!');
        });
}