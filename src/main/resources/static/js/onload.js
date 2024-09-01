function checkLog(){
    var a = localStorage.getItem('currentUser_token');
    document.getElementById('output').textContent = a ? a : 'No token found';
    if (!a) {
        // 如果不存在就跳转到首页
        window.location.href = '../login.html';
    }
}