
/**
 * Toggle Form Collapse
 */
function toggleFormCollapse() {
    let toggle_button = $('.form-collapse');
    let form = $('#'+toggle_button.data('target'));

    toggle_button.on('click', function () {
        
        if (form.hasClass('collapsed')) {
            form.removeClass('collapsed');
            form.slideDown();
            toggle_button.html('Kapat');
        } else {
            form.addClass('collapsed');
            form.slideUp();
            toggle_button.html('Yeni Ekle');
        }
    });


}

$(document).ready(function () {

    toggleFormCollapse();

});


