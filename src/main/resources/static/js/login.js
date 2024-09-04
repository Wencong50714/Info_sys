document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // 获取表单数据
    const role = document.getElementById('role').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // 根据选择的角色动态设置 URL
    let url;
    if (role === 'singer') {
        url = '/singer/login';
    } else if (role === 'admin') {
        url = '/admin/login';
    } else {
        url = '/user/login';
    }

    // 创建要发送到后端的数据字符串 (username : password)
    const data = `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`;
    url = `${url}?${data}`;

    console.log(url);

    // 发送数据到后端
    fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
    })
        .then(response => response.json())
        .then(data => {
            if (data.code === 200) {
                // 登录成功，跳转到相应页面
                var user_id = data.data;
                switch (role) {
                    case 'user':
                        window.location.href = '/user_index.html';
                        // 存 id 到 localStorage 中
                        localStorage.setItem("currentUser_token", user_id);
                        break;
                    case 'singer':
                        window.location.href = '/singer_index.html';
                        localStorage.setItem("currentUser_token", user_id);
                        break;
                    case 'admin':
                        window.location.href = '/admin_index.html';
                        break;
                }
            } else {
                alert('Login failed! Please check your username and password.');
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('Login failed! Please try again later.');
        });
});

document.addEventListener('DOMContentLoaded', function() {
    document.body.classList.add('fade-in');
});

// login.js
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

