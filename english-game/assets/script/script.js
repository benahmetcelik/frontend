var truePlus = document.getElementById("truePlus");
var trueMinus = document.getElementById("trueMinus");
var falsePlus = document.getElementById("falsePlus");
var falseMinus = document.getElementById("falseMinus");
var trueCount = document.getElementById("trueCount");
var falseCount = document.getElementById("falseCount");
var resetFull = document.getElementById("resetFull");
let json_datas = new Array();
let currentDataKey = '';
let currentDataValue = '';
let fileContent = '';
let timer = 0;
let timer_second= document.getElementById("seconds");
let timer_minute= document.getElementById("minutes");
let timer_start_button= document.getElementById("timer_button");
let timer_stop_button= document.getElementById("timer_stop");
let timer_clock = document.getElementById("timer_clock");
let inputs = document.getElementById("inputs");
let second,minute = 0;
let timerStatus = false;



function requestStarter(){
    for (let i = startFileNumber; i < endFileNumber; i++) {
       setTimeout(function(){
   
        fileContent =JSON.parse(getJsonFileContent(i));
        for (const [key, value] of Object.entries(fileContent)) {
            currentDataKey = value.english;
            currentDataValue = value.turkish;
            json_datas.push({english:currentDataKey,turkish:currentDataValue});

        }
       
    }, 1000);
    }
}

requestStarter();

function getWord(){
    if(json_datas.length == 0){
        alert("Dosya Bulunamadı");
    }
  
  
    var random = Math.floor(Math.random() * json_datas.length);
   
    var word = json_datas[random];

    var english = word.english;
    var turkish = word.turkish;
    document.getElementById("word").innerHTML = wordComponent(english,turkish);
}

function stopTimer(){
    clearInterval(timer);
    document.getElementById("timer_clock").style.display = "none";
    document.getElementById("inputs").style.display = "flex";
    timer_second.value = 0;
    timer_minute.value = 0;
    second = 0;
    minute = 0;
    document.getElementById("word").innerHTML = "";
    timerStatus = false;
    alert("Zamanlayıcı Durduruldu");
    alert("Doğru Sayısı: "+trueCount.innerHTML+" Yanlış Sayısı: "+falseCount.innerHTML);
    


}

function timerControl(){
    if(minute==0 && second == 0){
        alert("Zamanlayıcı Sıfır Olamaz");
        timerStatus = false;
        document.getElementById("timer_clock").style.display = "none";
        document.getElementById("inputs").style.display = "flex";
        document.getElementById("word").innerHTML = "";
        return;
    }
}




function getJsonFileContent(number){
    var jsonFile = new XMLHttpRequest();
    jsonFile.open("GET", "assets/jsons/"+number+".json", false);
    jsonFile.send(null);
    return jsonFile.responseText;
}

function wordComponent(english,turkish){
    return `
    <div class="english">
     ${english}
 </div>
 <div class="turkish">
     ${turkish}
 </div>
 `;
 }



 timer_start_button.addEventListener("click", function() {
    timerControl();
    if(timerStatus == true){
        alert("Zamanlayıcı Zaten Çalışıyor");
    }



    timerStatus = true;
    getWord();
    document.getElementById("timer_clock").style.display = "block";
    document.getElementById("inputs").style.display = "none";
    let minute_counter = 0;
    second = Number(timer_second.value);
    minute = Number(timer_minute.value);



    timer = setInterval(function(){
         
        if(minute == 0 && second == 0){
         stopTimer();  
        }


        if(second == 0){
            minute_counter = minute_counter+1;
            second = 60;
            minute = minute-1;
        }
        second = second-1;


        timer_clock.innerHTML = minute + ":" + second;


      
    }, 1000);
    }
);


timer_stop_button.addEventListener("click", function() {
    stopTimer();
    }
);



truePlus.addEventListener("click", function() {
    if(timerStatus == false){
        alert("Zamanlayıcı Ayarlanmadı");
        return;
    }
 
    trueCount.innerHTML = Number(trueCount.innerHTML) + 1;
   
    getWord();
    });
trueMinus.addEventListener("click", function() {
    if(timerStatus == false){
        alert("Zamanlayıcı Ayarlanmadı");
        return;
    }
    trueCount.innerHTML = Number(trueCount.innerHTML) - 1;
    getWord();

    }
);

falsePlus.addEventListener("click", function() {
    if(timerStatus == false){
        alert("Zamanlayıcı Ayarlanmadı");
        return;
    }
    falseCount.innerHTML = Number(falseCount.innerHTML) + 1;
    getWord();

    }
);

falseMinus.addEventListener("click", function() {
    if(timerStatus == false){
        alert("Zamanlayıcı Ayarlanmadı");
        return;
    }
    falseCount.innerHTML = Number(falseCount.innerHTML) - 1;
    getWord();

    }
);


resetFull.addEventListener("click", function() {
    trueCount.innerHTML = 0;
    falseCount.innerHTML = 0;
   
    stopTimer();
    }
);