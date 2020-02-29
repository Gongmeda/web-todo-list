
// add_btn onclick event function
document.querySelector('.add_btn').addEventListener('click', function(e) {
    let queryList =  document.querySelectorAll('.float_btn');
    for (query in queryList) {
        queryList.item(query).classList.toggle('float_btn_active');
    }
 });