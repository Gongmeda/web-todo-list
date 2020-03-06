
//// get current date
let today = new Date();
let dd = String(today.getDate()).padStart(2, '0');
let mm = String(today.getMonth() + 1).padStart(2, '0');
let yyyy = today.getFullYear();
today = yyyy + '년 ' + mm + '월 ' + dd + '일';
document.querySelector('#date').innerText = today;

//// add_btn onclick event function
let add_btn = document.querySelector('.add_btn');
function add_btn_click() {
    add_btn.addEventListener('click', function (e) {
        let queryList = document.querySelectorAll('.float_btn');
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
}
add_btn_click();

//// add / delete memo function
let memo = document.querySelector('#memo');
let add_memo_btn = document.querySelector('#add_memo');
// hide memo div if empty
if (memo.innerText == '') {
    memo.style.display = "none";
}
// open modal to add memo
modal_open(add_memo_btn);

//// modal fundtions
let modal = document.querySelector('.modal');
let modal_content = document.querySelector('.modal_content');
// modal open button
function modal_open(btn) {
    btn.onclick = function() { 
        modal.style.display = "flex";
    }
}
// modal close button
document.querySelector('.close').onclick = function () {
    modal.style.display = "none";
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}