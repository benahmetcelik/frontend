


function toggleThisElement(element) {
    element = element.parentElement;
    element.classList.toggle("active");
    var word = element.parentElement;
    var wordInH2Tag = word.getElementsByTagName("h2")[0];
    var base_word = wordInH2Tag.innerHTML;
    
    var meaning = word.getElementsByClassName("mean")[0];
    meaning.value = translateText(base_word, "en", "tr", function(err, translation) {
        if (err) {
          console.error(err);
        } else {
            return translation;
        }
      });
}



const url = "/asset/jsons/"+words+".json";

let count = 1;
const pageSize = 20;
function showWords() {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
     
      const startIndex = (count - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      const words = data.words.slice(startIndex, endIndex);
        
      words.forEach((word) => {
        const word_name = word.name;
        const word_meaning = word.meaning;
        const word_example = word.example;
        const word_example_meaning = word.example_meaning;
        const word_sound = word.sound;
        const wordComponentHTML = wordComponent(word_name, word_meaning, word_example, word_example_meaning,word_sound);
        document.getElementById("container").innerHTML += wordComponentHTML;
      });
      
    })
    .catch((error) => console.error(error));
}

function nextPage() {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const totalWords = data.words.length;
      const totalPages = Math.ceil(totalWords / pageSize);

      if (count < totalPages) {
        count++;
        document.getElementById("container").innerHTML = "";
        showWords();
      }
    })
    .catch((error) => console.error(error));
}

function prevPage() {
  if (count > 1) {
    count--;
    document.getElementById("container").innerHTML = "";
    showWords();
  }
}

showWords();


function soundComponent(sound) {
    return `<audio controls>
                <source src="/asset/sounds/words/${sound}.mp3" type="audio/mpeg">
            </audio>`;
}

function wordComponent(word_name, word_meaning, word_example, word_example_meaning,word_sound) {
    return `<div class="word">
                <h2>${word_name}</h2>
               
               
                <p >${soundComponent(word_sound)}</p>


                <div class="open-helper" > <span onclick="toggleThisElement(this)">?</span>  
                <p class="mean"><input type="text" value="${word_meaning}" onchange="updateThisWord('${word_name}')"></p>
                <p class="mean">${word_example}</p>
                <p class="mean">${word_example_meaning}</p>
                
                </div>

            </div>`;
}



function updateThisWord(word){
    
// Dosyadan JSON verisi okuma
const data = fs.readFileSync(url);
const jsonData = JSON.parse(data);


var key = this.name;
var newValue = this.value;

// JSON verisinde key'i ara ve value'yu değiştir
jsonData.words.forEach(word => {
  if (word[key]) {
    word[key] = newValue;
  }
});

// Değiştirilmiş JSON verisini dosyaya yaz
fs.writeFileSync(url ,JSON.stringify(jsonData));

// Değiştirilmiş JSON verisini konsola yazdır
console.log(jsonData);

}





function translateText(text, sourceLang, targetLang, callback) {
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${sourceLang}|${targetLang}`;
  
    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.responseData) {
          const translation = cleanTranslationText(data.responseData.translatedText);
          callback(null, translation);
        } else {
          callback(data.responseStatus, null);
        }
      })
      .catch(error => callback(error, null));
  }
  
  function cleanTranslationText(translation) {
    // Remove HTML tags and replace special characters
    const cleanText = translation.replace(/(<([^>]+)>)/gi, "").replace(/&amp;/gi, "&").replace(/&quot;/gi, "\"").replace(/&#39;/gi, "'").replace(/&lt;/gi, "<").replace(/&gt;/gi, ">");
  
    return cleanText;
  }
  
/*
  let meaning =  translateText(one_word.name, "en", "tr", function(err, translation) {
    if (err) {
      console.error(err);
    } else {
        return translation;
    }
  });
*/





