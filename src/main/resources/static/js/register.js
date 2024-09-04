document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();

    console.log("DEBUG: ...")

    // 获取表单数据
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const isSinger = document.getElementById('isSinger').checked;

    // 动态设置 URL
    const url = isSinger ? '/singer/register' : '/user/register';

    console.log(url)

    // 创建要发送到后端的数据字符串 (URL encoded)
    const data = `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`;

    console.log(data)

    // 发送数据到后端
    fetch(url, {  // 动态 URL
        method: 'POST',  // 如果你更改了 Spring Boot 方法的 HTTP 方法为 POST
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: data
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            alert('Registration successful!');

            // 注册成功, 跳转到登录界面
            window.location.href = '/login.html';
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('Registration failed!');
        });
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