$(document).ready(function () {

    searchCategorySlider();

});

function searchCategorySlider() {

    let category_slider = $('.categories');

    if (category_slider.length > 0) {
        addCategoryDots();

    }

}

function addCategoryDots() {

    let category_slider = $('.categories');
    let category_sliders = $('.category');

    let dots = categoryDotsComponent();

    let dots_slider = '';
    if (category_slider.prop('scrollWidth') > category_slider.width() ) {
        
        category_slider.before(dots);
    }
    

}

function categoryDotsComponent() {
    
        return '<div class="category-dots"><div class="left"></div><div class="right"></div></div>';
    
    }

function categoryDotComponent(i) {
    
        return '<div class="category-dot" data-slide="' + i + '"></div>';
    
    }