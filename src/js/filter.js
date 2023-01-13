//large variables
const textInput = document.querySelector('#filter-text');
const searchBtn = document.querySelector('#filter-serch-btn');
const openBtn = document.querySelector('#filter-open-btn');
const doneBtn = document.querySelector('#filter-done-btn');
const highBtn = document.querySelector('#filter-high-btn');
const normalBtn = document.querySelector('#filter-normal-btn');
const lowBtn = document.querySelector('#filter-low-btn');

//small variables
const textInputS = document.querySelector('#filter-text-s');
const searchBtnS = document.querySelector('#filter-serch-btn-s');
const openBtnS = document.querySelector('#filter-open-btn-s');
const doneBtnS = document.querySelector('#filter-done-btn-s');
const highBtnS = document.querySelector('#filter-high-btn-s');
const normalBtnS = document.querySelector('#filter-normal-btn-s');
const lowBtnS = document.querySelector('#filter-low-btn-s');

const openFilter = document.querySelector('#open-filter-btn');
const closeFilter = document.querySelector('#close-filter-btn');

//small filter function usege
openBtnS.onclick = statusBtnsS;
doneBtnS.onclick = statusBtnsS;
highBtnS.onclick = urgencyBtnsS;
normalBtnS.onclick = urgencyBtnsS;
lowBtnS.onclick = urgencyBtnsS;
textInputS.onkeyup = test;
searchBtnS.onclick = test2;

openFilter.onclick = openFilterFunc;
closeFilter.onclick = closeFilterFunc;

//large filter function usege
openBtn.onclick = statusBtns;
doneBtn.onclick = statusBtns;
highBtn.onclick = urgencyBtns;
normalBtn.onclick = urgencyBtns;
lowBtn.onclick = urgencyBtns;
textInput.onkeyup = test;
searchBtn.onclick = test2;

function test2() {
	alert('searching...');
}

function test(e) {
	if (e.keyCode === 13) {
		alert('enter works!!! searching...');
	}
}

//------------small filter function-----------
function openFilterFunc() {
	const smallFilter = document.querySelector('.filter-sm');
	openFilter.classList.add('invisible');
	closeFilter.classList.remove('invisible');
	smallFilter.classList.remove('invisible');
}

function closeFilterFunc() {
	const smallFilter = document.querySelector('.filter-sm');
	closeFilter.classList.add('invisible');
	openFilter.classList.remove('invisible');
	smallFilter.classList.add('invisible');
}

function statusBtnsS(e) {
	e.target.classList.add('filter-s__btn--active');
	if (e.target === openBtnS || e.target === openBtn) {
		doneBtnS.classList.remove('filter-s__btn--active');
	} else {
		openBtnS.classList.remove('filter-s__btn--active');
	}
}

function urgencyBtnsS(e) {
	e.target.classList.add('filter-s__btn--active');
	if (e.target === highBtnS) {
		normalBtnS.classList.remove('filter-s__btn--active');
		lowBtnS.classList.remove('filter-s__btn--active');
	} else if (e.target === normalBtnS) {
		highBtnS.classList.remove('filter-s__btn--active');
		lowBtnS.classList.remove('filter-s__btn--active');
	} else {
		highBtnS.classList.remove('filter-s__btn--active');
		normalBtnS.classList.remove('filter-s__btn--active');
	}
}

//------------large filter function-----------
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
