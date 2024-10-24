document.addEventListener('DOMContentLoaded', ()=> {
    function onclick(selector, handler) {
        document.querySelector(selector).onclick = handler;
    }
  
    onclick('.sample__button', () => toggle_icon());
});

const icons = document.querySelectorAll('.sample__icon');

function toggle_icon() {
    icons.forEach(
        (element) => element.classList.toggle('sample__icon--hide')
    )
}
