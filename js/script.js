//// animate.css function
function animateCSS(element, animationName, animationSpeed, callback) {
    const node = element;
    node.classList.add('animated', animationSpeed, animationName)

    function handleAnimationEnd() {
        node.classList.remove('animated', animationSpeed, animationName)
        node.removeEventListener('animationend', handleAnimationEnd)
        if (typeof callback === 'function') callback()
    }
    node.addEventListener('animationend', handleAnimationEnd)
}

//// get current date
let today = new Date();
let dd = String(today.getDate()).padStart(2, '0');
let mm = String(today.getMonth() + 1).padStart(2, '0');
let yyyy = today.getFullYear();
today = yyyy + '년 ' + mm + '월 ' + dd + '일';
document.querySelector('#date').innerText = today;

//// floating action button click event
let add_btn = document.querySelector('.add_btn');
// add_btn click function
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

//// modal
let modal = document.querySelector('.modal');
let modal_content = document.querySelector('.modal_content');
let modal_header = document.querySelector('.modal_header');
let modal_body = document.querySelector('.modal_body');
let modal_footer = document.querySelector('.modal_footer');
// modal open button
function modal_open(btn, set_modal) {
    btn.onclick = function () {
        set_modal();
        modal.style.display = "flex";
        modal.classList.toggle('modal_fadein');
        animateCSS(modal_content, 'fadeInDown', 'faster', function () {
            modal.classList.toggle('modal_fadein');
        });
    }
}
// close modal function
function modal_close() {
    modal.classList.toggle('modal_fadeout');
    animateCSS(modal_content, 'fadeOutDown', 'faster', function () {
        modal.style.display = "none";
        modal_header.childNodes[1].innerText = 'Header';
        modal_body.innerHTML = '<p>Body</p>';
        modal_footer.innerHTML = '<div>Footer</div>';
        modal.classList.toggle('modal_fadeout');
    });
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

//// add / delete list-element
let lists = document.querySelector('#lists');
let add_list_btn = document.querySelector('#add_list');
let edit_btns;
// list-element object / array
let list_element = function (list_text, list_state) {
    this.list_key = new Date().getTime() + Math.random();
    this.list_text = list_text;
    this.list_state = list_state;
}
let list_array = [];
// push examples in the array
list_array.push(new list_element('Click the right red', 'undone'));
list_array.push(new list_element('button to edit list elements.', 'undone'));
list_array.push(new list_element('Click the bottom right', 'undone'));
list_array.push(new list_element('button to add stuff.', 'undone'));
// show all list-elements in the array
function list_reload() {
    list_delete_all();
    list_array.forEach(function (element) {
        let el = document.createElement('li');
        let el_div = document.createElement('div');
        let el_text = document.createTextNode(element.list_text);
        el.id = element.list_key;
        el.classList.add("list_element", element.list_state);
        el_div.classList.add("list_element_text");
        // set text
        el_div.appendChild(el_text);
        el.appendChild(el_div);
        // set button
        let btn = document.createElement('button');
        btn.classList.add("btn", "edit_btn");
        if (element.list_state == 'undone') {
            btn.innerHTML = '<i class="fas fa-times"></i>'
        } else if (element.list_state == 'ongoing') {
            btn.innerHTML = '<i class="fas fa-long-arrow-alt-right"></i>'
        } else if (element.list_state == 'done') {
            btn.innerHTML = '<i class="fas fa-check"></i>'
        } else {
            console.log('error in the list_array')
        }
        el.appendChild(btn);
        lists.appendChild(el);
    })
    // show that list is empty
    let notice = document.querySelector('#notice');
    if (list_array.length == 0) {
        notice.style.display = "flex";
    } else {
        notice.style.display = "none";
    }
    list_add_event();
}
// initial reload function execution
window.addEventListener('DOMContentLoaded', function () {
    list_reload();
})
// set modal to add list and open modal
function list_modal_open() {
    modal_header.firstElementChild.innerText = 'To-do';
    modal_body.innerHTML = '<input type="text" name="list" id="list_area" placeholder="write To-do here.">';
    modal_footer.innerHTML = '<i class="modal_icon list_delete fas fa-trash-alt fa-xs"></i><i class="modal_icon list_add far fa-check-square fa-sm"></i>'
    // delete all list
    document.querySelector('.list_delete').onclick = function () {
        modal_close();
        list_array.length = 0;
        list_reload();
    }
    // add list-element
    document.querySelector('.list_add').onclick = function () {
        let list_area = document.querySelector('#list_area');
        if (list_area.value == '') {
            window.alert('you have to input text!');
        } else {
            modal_close();
            list_array.push(new list_element(list_area.value, 'undone'));
        }
        list_reload();
    }
}
modal_open(add_list_btn, list_modal_open);
// add eventlistner to all edit buttons
function list_add_event() {
    edit_btns = document.querySelectorAll('.edit_btn');
    edit_btns.forEach(function (btn) {
        modal_open(btn, function () {
            edit_modal_open(btn);
        });
    });
}
// delete all element
function list_delete_all() {
    while (lists.firstChild) {
        lists.removeChild(lists.firstChild);
    }
}
// delete single element
function list_delete_single(element) {
    for (el in list_array) {
        if (list_array[el].list_key == element.parentNode.id) {
            list_array.splice(el, 1);
        }
    }
}
// change text of single element
function list_change_text(element, text) {
    for (el in list_array) {
        if (list_array[el].list_key == element.parentNode.id) {
            list_array[el].list_text = text;
        }
    }
}
// change state of single element
function list_change_state(element, state) {
    for (el in list_array) {
        if (list_array[el].list_key == element.parentNode.id) {
            list_array[el].list_state = state;
        }
    }
}
// set modal to edit list-element function
function edit_modal_open(button) {
    modal_header.firstElementChild.innerText = 'edit';
    modal_body.innerHTML = '<input type="text" name="list_edit" id="edit_area" placeholder="write To-do here."><div id="edit_state_area"><button id="edit_undone" class="btn edit_state_btn"><i class="fas fa-times fa-2x"></i></button><button id="edit_ongoing" class="btn edit_state_btn"><i class="fas fa-long-arrow-alt-right fa-2x"></i></button><button id="edit_done" class="btn edit_state_btn"><i class="fas fa-check fa-2x"></i></button></div>';
    modal_footer.innerHTML = '<i class="modal_icon element_delete fas fa-trash-alt fa-xs"></i><i class="modal_icon element_edit far fa-check-square fa-sm"></i>'
    // keep original text in the input area
    let this_list = button.parentNode;
    let element_text = this_list.innerText;
    let edit_area = document.querySelector('#edit_area');
    let edit_state_btns = document.querySelectorAll('.edit_state_btn');
    edit_area.value = element_text;
    // get chosen state and keep original state
    let chosen_state;
    let edit_undone = document.querySelector('#edit_undone');
    let edit_ongoing = document.querySelector('#edit_ongoing');
    let edit_done = document.querySelector('#edit_done');

    if (this_list.classList.contains('undone')) {
        chosen_state = 'undone';
        edit_undone.classList.toggle('selected');
    } else if (this_list.classList.contains('ongoing')) {
        chosen_state = 'ongoing';
        edit_ongoing.classList.toggle('selected');
    } else if (this_list.classList.contains('done')) {
        chosen_state = 'done';
        edit_done.classList.toggle('selected');
    }
    // 
    function clear_selection(index) {
        edit_state_btns.forEach(function (btn) {
            btn.classList.remove('selected');
        })
        edit_state_btns[index].classList.add('selected');
    }
    // add onclick event on edit_state_btn
    edit_undone.onclick = function () {
        clear_selection(0);
        chosen_state = 'undone';
    }
    edit_ongoing.onclick = function () {
        clear_selection(1);
        chosen_state = 'ongoing';
    }
    edit_done.onclick = function () {
        clear_selection(2);
        chosen_state = 'done';
    }
    // delete list-element
    document.querySelector('.element_delete').onclick = function () {
        modal_close();
        animateCSS(this_list, 'fadeOutLeft', 'faster', function () {
            list_delete_single(button);
            list_reload();
        });
    }
    // edit list-element
    document.querySelector('.element_edit').onclick = function () {
        if (edit_area.value == '') {
            window.alert('you have to input text!');
        } else {
            modal_close();
            list_change_state(button, chosen_state);
            list_change_text(button, edit_area.value);
        }
        list_reload();
    }
}

//// memo
let memo = document.querySelector('#memo');
let add_memo_btn = document.querySelector('#add_memo');
// set modal to memo and open modal
function memo_modal_open() {
    modal_header.firstElementChild.innerText = 'memo';
    modal_body.innerHTML = '<textarea name="memo" id="memo_area" cols="30" rows="8" placeholder="write memo here."></textarea>';
    modal_footer.innerHTML = '<i class="modal_icon memo_delete fas fa-trash-alt fa-xs"></i><i class="modal_icon memo_edit far fa-check-square fa-sm"></i>'
    // keep original memo in the textarea
    let memo_area = document.querySelector('#memo_area');
    let memo_text = memo.innerHTML;
    if (memo_text != '') {
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
    document.querySelector('.memo_delete').onclick = function () {
        modal_close();
        if (memo.innerText != '') {
            animateCSS(memo, 'zoomOut', 'faster', function () {
                memo.innerText = '';
                memo_reload();
            });
        }
    }
    // edit memo
    document.querySelector('.memo_edit').onclick = function () {
        if (memo_area.value == '') {
            window.alert('you have to input text!');
        } else {
            modal_close();
            if (memo.innerText != memo_area.value) {
                memo.innerText = memo_area.value;
                animateCSS(memo, 'zoomIn', 'faster');
                memo_reload();
            }
        }
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

//// profile button animation
let prof_icons = document.querySelectorAll('.prof_icon');
let copy = document.querySelector('#copy');
for (icon in prof_icons) {
    prof_icons.item(icon).onmouseover = function () {
        animateCSS(copy, 'pulse', 'default');
    }
}