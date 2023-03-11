var truePlus = document.getElementById("truePlus");
var trueMinus = document.getElementById("trueMinus");
var falsePlus = document.getElementById("falsePlus");
var falseMinus = document.getElementById("falseMinus");
var trueCount = document.getElementById("trueCount");
var falseCount = document.getElementById("falseCount");
var resetFull = document.getElementById("resetFull");



truePlus.addEventListener("click", function() {
    trueCount.innerHTML = Number(trueCount.innerHTML) + 1;
    });
trueMinus.addEventListener("click", function() {
    trueCount.innerHTML = Number(trueCount.innerHTML) - 1;
    }
);

falsePlus.addEventListener("click", function() {
    falseCount.innerHTML = Number(falseCount.innerHTML) + 1;
    }
);

falseMinus.addEventListener("click", function() {
    falseCount.innerHTML = Number(falseCount.innerHTML) - 1;
    }
);


resetFull.addEventListener("click", function() {
    trueCount.innerHTML = 0;
    falseCount.innerHTML = 0;
    }
);
