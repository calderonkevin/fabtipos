// CANTIDAD MAS(+) Y MENOS(-)

var count = 1;
var countEl = document.getElementById("count");

function plus() {
    count++;
    countEl.value = count;
}

function minus() {
    if (count > 1) {
        count--;
        countEl.value = count;
    }
}


// CATEGORIAS

$("#cats").owlCarousel({
    loop: false,
    margin: 0,
    responsiveClass: true,
    nav: true,
    dots: false,
    autoWidth: true,
    navText: ["<i class='fa fa-arrow-left' aria-hidden='true'></i>", "<i class='fa fa-arrow-right' aria-hidden='true'></i>"],
    responsive: {
        0: {
            items: 1
        },

        600: {
            items: 2
        },

        1024: {
            items: 3
        },

        1366: {
            items: 4
        }
    }
});