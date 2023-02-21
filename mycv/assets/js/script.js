



window.addEventListener('load', function() {




    var userSelection = document.getElementsByClassName('menu-link');

for(var i = 0; i < userSelection.length; i++) {
  (function(index) {
    userSelection[index].addEventListener("click", function() {
        var userSelection = document.getElementsByClassName('menu-link');
        for(var i = 0; i < userSelection.length; i++) {
            userSelection[i].classList.remove('active');
        }
        userSelection[index].classList.add('active');
     })
  })(i);
}






 
   
});

