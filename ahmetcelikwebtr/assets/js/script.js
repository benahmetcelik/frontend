let animation_div = document.querySelectorAll('.animations');
let parent_div_index = 0;
let sub_div_index = 0;
let rand_chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';



function randomString(length=10) {
    let result = '';
    for (let i = 0; i < length; i++) {
        result += rand_chars.charAt(Math.floor(Math.random() * rand_chars.length));
    }
    return result;
}

function charReplaceAnimation(element, content) {
    let content_array = content.split('');
    let new_content = '';
    content_array.forEach(function (char) {
        new_content += '<span class="char">' + char + '</span>';
    });
    element.innerHTML = new_content;
    let char_index = 0;
    let char_elements = document.querySelectorAll('.char');
    setInterval(function () {
        let char = char_elements[char_index];
        char.innerHTML = randomString();
        char_index++;
        if (char_index >= char_elements.length) {
            char_index = 0;
        }
    }, 500);
}

if (animation_div.length > 0) {
   // alert('Animation div exists');
   animation_div.forEach(function (element) {
        let sub_divs = document.querySelectorAll('.animations > div');

         sub_divs.forEach(function (sub_div) {
            setInterval(function () {

            let content = phrases[parent_div_index][sub_div_index];
              charReplaceAnimation(sub_div, content);
              
              sub_div_index++;
                if (sub_div_index >= phrases[parent_div_index].length) {
                    sub_div_index = 0;
                }
            }, 2000);
         });
         parent_div_index++;
     });
}


