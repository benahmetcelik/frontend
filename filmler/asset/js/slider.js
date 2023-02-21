$(document).ready(function () {
    //setInterval(autoSlide, 3000);
    searchSlider();
    sliderForDots();
    setInterval(sliderForDots, 10000);
});

function searchSlider() {
    let slider = $('.slider');

    if (slider.length > 0) {
        addDots();
    }
}

function sliderForDots() {
    let slider = $('.slider');
    let slider_item = $('.slider-item');
    let dot = $('.dot');
    let active = slider_item.filter('.active');
    let active_dot = dot.filter('.active');
    let next = active.next();
    let next_dot = active_dot.next();
    let prev = active.prev();
    let prev_dot = active_dot.prev();
    if (next.length == 0) {
        next = slider_item.first();
        next_dot = dot.first();
        active.removeClass('active');
        next.addClass('active');
        active_dot.removeClass('active');
        next_dot.addClass('active');
    } else {
        prev = slider_item.last();
        prev_dot = dot.last();
        active.removeClass('active');
        prev.addClass('active');
        active_dot.removeClass('active');
        prev_dot.addClass('active');
    }

}





function addDots() {

    let slider = $('.slider');

    let sliders = $('.slider-item');
    let dots = dotsComponent();
    let dots_slider = '';
    for (let i = 0; i < sliders.length; i++) {
        slider.append(dots);
        dots_slider = $('.dots');
        let dot = dotComponent(i);
        dots_slider.append(dot);
    }
    let dot = $('.dot');
    dot.first().addClass('active');
    dot.on('click', function () {
        let data_slide = $(this).data('slide');
        let slider_item = $('.slider-item');
        slider_item.removeClass('active');
        slider_item.eq(data_slide).addClass('active');
        dot.removeClass('active');
        $(this).addClass('active');
    }
    );

}

function dotsComponent() {
    let dots = document.createElement('div');
    dots.classList.add('dots');
    return dots;
}


function dotComponent(slider) {
    let dot = document.createElement('div');
    dot.classList.add('dot');
    dot.setAttribute('data-slide', slider);
    return dot;
}

