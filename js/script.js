
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

//// modal fundtions
let modal = document.querySelector('.modal');
let modal_content = document.querySelector('.modal_content');
// modal open button
function modal_open(btn, set_modal) {
    btn.onclick = function () {
        set_modal();
        modal.style.display = "flex";
    }
}
// close modal function
function modal_close() {
    modal.style.display = "none";
    modal_header.childNodes[1].innerText = 'Header';
    modal_body.innerHTML = '<p>Body</p>';
    modal_footer.innerHTML = '<div>Footer</div>';
}
// modal close button
document.querySelector('.close').onclick = function () {
    modal_close();
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal_close();
    }
}

//// add / delete memo function
let memo = document.querySelector('#memo');
let add_memo_btn = document.querySelector('#add_memo');
let modal_header = document.querySelector('.modal_header');
let modal_body = document.querySelector('.modal_body');
let modal_footer = document.querySelector('.modal_footer');
// set modal to memo and open modal
function memo_modal_open() {
    modal_header.childNodes[1].innerText = 'memo';
    modal_body.innerHTML = '<textarea name="memo" id="memo_area" cols="30" rows="10" placeholder="write memo here."></textarea>';
    modal_footer.innerHTML = '<i class="modal_icon memo_delete fas fa-trash-alt fa-xs"></i><i class="modal_icon memo_edit far fa-check-square fa-sm"></i>'
    // keep original memo in the textarea
    let memo_area = document.querySelector('#memo_area');
    let memo_text = memo.innerHTML;
    if(memo_text != '') {
        let memo_lines = memo_text.split("<br>");
        let memo_result_string = '';
        for (let i = 0; i < memo_lines.length; i++) {
            if (i == memo_lines.length - 1) {
                memo_result_string += memo_lines[i];
            } else {
                memo_result_string += memo_lines[i] + "\n";
            }
        }
        memo_area.innerHTML = memo_result_string;
    }
    // delete memo
    document.querySelector('.memo_delete').onclick = function() {
        modal_close();
        memo.innerText = '';
        memo_reload();
    }
    // edit memo
    document.querySelector('.memo_edit').onclick = function() {
        let lines = memo_area.value.split("\n");
        let result_string = '';
        for (let i = 0; i < lines.length; i++) {
            if (i == lines.length - 1) {
                result_string += lines[i];
            } else {
                result_string += lines[i] + "\n";
            }
        }
        memo.innerText = result_string;
        modal_close();
        memo_reload();
    }
}
modal_open(add_memo_btn, memo_modal_open);
// hide memo div if empty
function memo_reload() {
    if (memo.innerText == '') {
        memo.style.display = "none";
    } else {
        memo.style.display = "block";
    }
}