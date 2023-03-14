

var searchInput = document.getElementById('search');

searchInput.addEventListener('keyup', function (e) {
    var searchValue = e.target.value.toLowerCase();
    var items = document.querySelectorAll('.letter');
    items.forEach(function (item) {
        var itemName = item.querySelector('h2').textContent.toLowerCase();
        if (itemName.indexOf(searchValue) != -1) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
});


function changeTemplate(){
    var template = document.getElementsByTagName('body')[0];
    template.classList.toggle('dark');
    
}