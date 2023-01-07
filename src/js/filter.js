const textInput = document.querySelector('#filter-text');
const searchBtn = document.querySelector('#filter-serch-btn');
const openBtn = document.querySelector('#filter-open-btn');
const doneBtn = document.querySelector('#filter-done-btn');
const highBtn = document.querySelector('#filter-high-btn');
const normalBtn = document.querySelector('#filter-normal-btn');
const lowBtn = document.querySelector('#filter-low-btn');

openBtn.onclick = statusBtns;
doneBtn.onclick = statusBtns;
highBtn.onclick = urgencyBtns;
normalBtn.onclick = urgencyBtns;
lowBtn.onclick = urgencyBtns;
textInput.onkeyup = test;
searchBtn.onclick = test2;


function test2() {
   alert('searching...')
};

function test(e) {
   if (e.keyCode === 13) {
      alert('enter works!!! searching...');
   }
};

function statusBtns(e) {
  e.target.classList.add('filter__btn--active');
  if (e.target === openBtn) {
    doneBtn.classList.remove('filter__btn--active');
  } else {
    openBtn.classList.remove('filter__btn--active');
  }
}

function urgencyBtns(e) {
  e.target.classList.add('filter__btn--active');
  if (e.target === highBtn) {
    normalBtn.classList.remove('filter__btn--active');
    lowBtn.classList.remove('filter__btn--active');
  } else if (e.target === normalBtn) {
    highBtn.classList.remove('filter__btn--active');
    lowBtn.classList.remove('filter__btn--active');
  } else {
    highBtn.classList.remove('filter__btn--active');
    normalBtn.classList.remove('filter__btn--active');
  }
}
