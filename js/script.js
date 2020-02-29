
//// get current date
let today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0');
var yyyy = today.getFullYear();
today = yyyy + '년 ' + mm + '월 ' + dd + '일';
document.querySelector('#date').innerText = today;

//// add_btn onclick event function
document.querySelector('.add_btn').addEventListener('click', function(e) {
    let queryList =  document.querySelectorAll('.float_btn');
    for (query in queryList) {
        queryList.item(query).classList.toggle('float_btn_active');
    }
    
    let float_wrap_class = document.querySelector('.float_wrap').classList;
    if (float_wrap_class.contains('float_wrap_active')) {
        setTimeout(function () {
            float_wrap_class.toggle('float_wrap_active');
        }, 500);
    } else {
        float_wrap_class.toggle('float_wrap_active');
    }
});

//// add / delete memo function
let memo = document.querySelector('#memo');
// hide memo div if empty
if (memo.innerText == '') {
    memo.style.setProperty('display', 'none');
}
