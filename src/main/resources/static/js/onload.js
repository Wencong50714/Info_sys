
function getName(is_singer) {

    // Get id
    var id = localStorage.getItem('currentUser_token');
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