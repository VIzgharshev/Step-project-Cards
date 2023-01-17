//--------------------large variables
const textInput = document.querySelector('#filter-text');
const searchBtn = document.querySelector('#filter-serch-btn');
const openBtn = document.querySelector('#filter-open-btn');
const doneBtn = document.querySelector('#filter-done-btn');
const highBtn = document.querySelector('#filter-high-btn');
const normalBtn = document.querySelector('#filter-normal-btn');
const lowBtn = document.querySelector('#filter-low-btn');

//--------------------small variables
const textInputS = document.querySelector('#filter-text-s');
const searchBtnS = document.querySelector('#filter-serch-btn-s');
const openBtnS = document.querySelector('#filter-open-btn-s');
const doneBtnS = document.querySelector('#filter-done-btn-s');
const highBtnS = document.querySelector('#filter-high-btn-s');
const normalBtnS = document.querySelector('#filter-normal-btn-s');
const lowBtnS = document.querySelector('#filter-low-btn-s');

const openFilter = document.querySelector('#open-filter-btn');
const closeFilter = document.querySelector('#close-filter-btn');
const refreshFilterBtnS = document.querySelector('.filter-s__refresh-btn');
const refreshFilterBtn = document.querySelector('.filter__refresh-btn');

refreshFilterBtnS.addEventListener('click', refreshFilter);
refreshFilterBtn.addEventListener('click', refreshFilter);

//--------------------small filter function usege
openBtnS.addEventListener('click', statusBtnsS);
doneBtnS.addEventListener('click', statusBtnsS);
highBtnS.addEventListener('click', urgencyBtnsS);
normalBtnS.addEventListener('click', urgencyBtnsS);
lowBtnS.addEventListener('click', urgencyBtnsS);

textInputS.addEventListener('keydown', onInputEnter);
searchBtnS.addEventListener('click', onInputBtn);

openFilter.addEventListener('click', openFilterFunc);
closeFilter.addEventListener('click', closeFilterFunc);

//--------------------large filter function usege
openBtn.addEventListener('click', statusBtns);
doneBtn.addEventListener('click', statusBtns);
highBtn.addEventListener('click', urgencyBtns);
normalBtn.addEventListener('click', urgencyBtns);
lowBtn.addEventListener('click', urgencyBtns);

textInput.addEventListener('keydown', onInputEnter);
searchBtn.addEventListener('click', onInputBtn);

//--------------------function for cleane main card container
function cleanContainer(parent) {
	while (parent.firstChild) {
		parent.removeChild(parent.firstChild);
	}
}

//--------------------refreshFilter
function refreshFilter() {
	highBtn.classList.remove('filter__btn--active');
	normalBtn.classList.remove('filter__btn--active');
	lowBtn.classList.remove('filter__btn--active');
	highBtnS.classList.remove('filter-s__btn--active');
	normalBtnS.classList.remove('filter-s__btn--active');
	lowBtnS.classList.remove('filter-s__btn--active');
	openBtn.classList.remove('filter__btn--active');
	openBtnS.classList.remove('filter-s__btn--active');
	doneBtn.classList.remove('filter__btn--active');
	doneBtnS.classList.remove('filter-s__btn--active');

	//----------------clean '.main-section__cards-container'
	cleanContainer(document.querySelector('.main-section__cards-container'));

	fetch('https://ajax.test-danit.com/api/v2/cards', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${sessionStorage.token}`,
		},
	})
		.then(resp => resp.json())
		.then(allCard => {
			//---------------hide title
			if (allCard.length != 0) {
				document.querySelector('.main-section__header-novisit').style.display = 'none';
			}
			//-----------------check input value in context object key and render it
			for (const card of allCard) {
				cardsController.addCard(card);
			}
		});
}

//-----------------------------------INPUT FILTER--------------------------------------------
function onInputEnter(e) {
	if (e.keyCode === 13) {
		openBtnS.classList.remove('filter-s__btn--active');
		doneBtnS.classList.remove('filter-s__btn--active');
		highBtnS.classList.remove('filter-s__btn--active');
		normalBtnS.classList.remove('filter-s__btn--active');
		lowBtnS.classList.remove('filter-s__btn--active');
		openBtn.classList.remove('filter__btn--active');
		doneBtn.classList.remove('filter__btn--active');
		highBtn.classList.remove('filter__btn--active');
		normalBtn.classList.remove('filter__btn--active');
		lowBtn.classList.remove('filter__btn--active');

		const inputValueSmallFilter = document.querySelector('#filter-text-s').value;
		const inputValueLargeFilter = document.querySelector('#filter-text').value;
		let inputForCheck = '';

		//---------------getiing value for cicles
		if (inputValueSmallFilter.length === 0) {
			inputForCheck = String(inputValueLargeFilter);
		} else {
			inputForCheck = String(inputValueSmallFilter);
		}
		//----------------clean '.main-section__cards-container'
		cleanContainer(document.querySelector('.main-section__cards-container'));

		//----------------CHECKING...
		if (inputForCheck != '') {
			fetch('https://ajax.test-danit.com/api/v2/cards', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${sessionStorage.token}`,
				},
			})
				.then(resp => resp.json())
				.then(allCard => {
					//---------------hide title

					let counter = 0;
					if (counter === 0) {
						document.querySelector('.main-section__header-novisit').style.display = 'none';
					}
					//-----------------check input value in context object key and render it
					allCard.forEach(card => {
						for (const key in card) {
							if (String(card[key]).toLowerCase().includes(inputForCheck.toLowerCase())) {
								counter++;
								cardsController.addCard(card);
							}
						}
					});
					if (counter === 0) {
						document.querySelector('.main-section__header-novisit').style.display = 'block';
					}
				});
		} else if (inputForCheck === '') {
			let counter = 0;
			if (counter === 0) {
				document.querySelector('.main-section__header-novisit').style.display = 'block';
			}
		}
	}
}

function onInputBtn() {
	openBtnS.classList.remove('filter-s__btn--active');
	doneBtnS.classList.remove('filter-s__btn--active');
	highBtnS.classList.remove('filter-s__btn--active');
	normalBtnS.classList.remove('filter-s__btn--active');
	lowBtnS.classList.remove('filter-s__btn--active');
	openBtn.classList.remove('filter__btn--active');
	doneBtn.classList.remove('filter__btn--active');
	highBtn.classList.remove('filter__btn--active');
	normalBtn.classList.remove('filter__btn--active');
	lowBtn.classList.remove('filter__btn--active');

	const inputValueSmallFilter = document.querySelector('#filter-text-s').value;
	const inputValueLargeFilter = document.querySelector('#filter-text').value;
	let inputForCheck = '';

	//---------------getiing value for cicles
	if (inputValueSmallFilter.length === 0) {
		inputForCheck = String(inputValueLargeFilter);
	} else {
		inputForCheck = String(inputValueSmallFilter);
	}
	//----------------clean '.main-section__cards-container'
	cleanContainer(document.querySelector('.main-section__cards-container'));

	//----------------CHECKING...
	if (inputForCheck != '') {
		fetch('https://ajax.test-danit.com/api/v2/cards', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${sessionStorage.token}`,
			},
		})
			.then(resp => resp.json())
			.then(allCard => {
				//---------------hide title
				let counter = 0;
				if (counter === 0) {
					document.querySelector('.main-section__header-novisit').style.display = 'none';
				}
				//-----------------check input value in context object key and render it
				allCard.forEach(card => {
					for (const key in card) {
						if (String(card[key]).toLowerCase().includes(inputForCheck.toLowerCase())) {
							counter++;
							cardsController.addCard(card);
						}
					}
				});
				if (counter === 0) {
					document.querySelector('.main-section__header-novisit').style.display = 'block';
				}
			});
	} else if (inputForCheck === '') {
		let counter = 0;
		if (counter === 0) {
			document.querySelector('.main-section__header-novisit').style.display = 'block';
		}
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
	if (e.target === openBtnS) {
		doneBtnS.classList.remove('filter-s__btn--active');
		highBtnS.classList.remove('filter-s__btn--active');
		normalBtnS.classList.remove('filter-s__btn--active');
		lowBtnS.classList.remove('filter-s__btn--active');
		//----------------clean '.main-section__cards-container'
		cleanContainer(document.querySelector('.main-section__cards-container'));
		//----------------CHECKING...
		fetch('https://ajax.test-danit.com/api/v2/cards', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${sessionStorage.token}`,
			},
		})
			.then(resp => resp.json())
			.then(allCard => {
				//---------------hide title
				let counter = 0;
				if (counter === 0) {
					document.querySelector('.main-section__header-novisit').style.display = 'none';
				}
				//-----------------check input value in context object key and render it
				for (const card of allCard) {
					if (card.visit === 'open') {
						counter++;
						cardsController.addCard(card);
					}
				}
				if (counter === 0) {
					document.querySelector('.main-section__header-novisit').style.display = 'block';
				}
			});
	} else {
		openBtnS.classList.remove('filter-s__btn--active');
		highBtnS.classList.remove('filter-s__btn--active');
		normalBtnS.classList.remove('filter-s__btn--active');
		lowBtnS.classList.remove('filter-s__btn--active');
		//----------------clean '.main-section__cards-container'
		cleanContainer(document.querySelector('.main-section__cards-container'));
		//----------------CHECKING...
		fetch('https://ajax.test-danit.com/api/v2/cards', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${sessionStorage.token}`,
			},
		})
			.then(resp => resp.json())
			.then(allCard => {
				//---------------hide title
				let counter = 0;
				if (counter === 0) {
					document.querySelector('.main-section__header-novisit').style.display = 'none';
				}
				//-----------------check input value in context object key and render it
				for (const card of allCard) {
					if (card.visit === 'close') {
						counter++;
						cardsController.addCard(card);
					}
				}
				if (counter === 0) {
					document.querySelector('.main-section__header-novisit').style.display = 'block';
				}
			});
	}
}

function urgencyBtnsS(e) {
	e.target.classList.add('filter-s__btn--active');
	openBtn.classList.remove('filter-s__btn--active');
	openBtnS.classList.remove('filter-s__btn--active');
	doneBtn.classList.remove('filter-s__btn--active');
	doneBtnS.classList.remove('filter-s__btn--active');

	if (e.target === highBtnS) {
		normalBtnS.classList.remove('filter-s__btn--active');
		lowBtnS.classList.remove('filter-s__btn--active');

		//----------------clean '.main-section__cards-container'
		cleanContainer(document.querySelector('.main-section__cards-container'));

		//----------------CHECKING...
		fetch('https://ajax.test-danit.com/api/v2/cards', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${sessionStorage.token}`,
			},
		})
			.then(resp => resp.json())
			.then(allCard => {
				//---------------hide title
				if (allCard.length != 0) {
					document.querySelector('.main-section__header-novisit').style.display = 'none';
				}
				//-----------------check input value in context object key and render it
				for (const card of allCard) {
					if (card.urgency === 'High') {
						cardsController.addCard(card);
					}
				}
			});
	} else if (e.target === normalBtnS) {
		highBtnS.classList.remove('filter-s__btn--active');
		lowBtnS.classList.remove('filter-s__btn--active');

		//----------------clean '.main-section__cards-container'
		cleanContainer(document.querySelector('.main-section__cards-container'));

		//----------------CHECKING...
		fetch('https://ajax.test-danit.com/api/v2/cards', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${sessionStorage.token}`,
			},
		})
			.then(resp => resp.json())
			.then(allCard => {
				//---------------hide title
				if (allCard.length != 0) {
					document.querySelector('.main-section__header-novisit').style.display = 'none';
				}
				//-----------------check input value in context object key and render it
				for (const card of allCard) {
					if (card.urgency === 'Normal') {
						cardsController.addCard(card);
					}
				}
			});
	} else {
		highBtnS.classList.remove('filter-s__btn--active');
		normalBtnS.classList.remove('filter-s__btn--active');

		//----------------clean '.main-section__cards-container'
		cleanContainer(document.querySelector('.main-section__cards-container'));

		//----------------CHECKING...
		fetch('https://ajax.test-danit.com/api/v2/cards', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${sessionStorage.token}`,
			},
		})
			.then(resp => resp.json())
			.then(allCard => {
				//---------------hide title
				if (allCard.length != 0) {
					document.querySelector('.main-section__header-novisit').style.display = 'none';
				}
				//-----------------check input value in context object key and render it
				for (const card of allCard) {
					if (card.urgency === 'Low') {
						cardsController.addCard(card);
					}
				}
			});
	}
}

//------------large filter function-----------
function statusBtns(e) {
	e.target.classList.add('filter__btn--active');
	if (e.target === openBtn) {
		doneBtn.classList.remove('filter__btn--active');
		highBtn.classList.remove('filter__btn--active');
		normalBtn.classList.remove('filter__btn--active');
		lowBtn.classList.remove('filter__btn--active');
		//----------------clean '.main-section__cards-container'
		cleanContainer(document.querySelector('.main-section__cards-container'));
		//----------------CHECKING...
		fetch('https://ajax.test-danit.com/api/v2/cards', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${sessionStorage.token}`,
			},
		})
			.then(resp => resp.json())
			.then(allCard => {
				//---------------hide title
				let counter = 0;
				if (counter === 0) {
					document.querySelector('.main-section__header-novisit').style.display = 'none';
				}
				//-----------------check input value in context object key and render it
				for (const card of allCard) {
					if (card.visit === 'open') {
						counter++;
						cardsController.addCard(card);
					}
				}
				if (counter === 0) {
					document.querySelector('.main-section__header-novisit').style.display = 'block';
				}
			});
	} else {
		openBtn.classList.remove('filter__btn--active');
		highBtn.classList.remove('filter__btn--active');
		normalBtn.classList.remove('filter__btn--active');
		lowBtn.classList.remove('filter__btn--active');
		//----------------clean '.main-section__cards-container'
		cleanContainer(document.querySelector('.main-section__cards-container'));
		//----------------CHECKING...
		fetch('https://ajax.test-danit.com/api/v2/cards', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${sessionStorage.token}`,
			},
		})
			.then(resp => resp.json())
			.then(allCard => {
				//---------------hide title
				let counter = 0;
				if (counter === 0) {
					document.querySelector('.main-section__header-novisit').style.display = 'none';
				}
				//-----------------check input value in context object key and render it
				for (const card of allCard) {
					if (card.visit === 'close') {
						counter++;
						cardsController.addCard(card);
					}
				}
				if (counter === 0) {
					document.querySelector('.main-section__header-novisit').style.display = 'block';
				}
			});
	}
}

function urgencyBtns(e) {
	e.target.classList.add('filter__btn--active');
	openBtn.classList.remove('filter__btn--active');
	openBtnS.classList.remove('filter__btn--active');
	doneBtn.classList.remove('filter__btn--active');
	doneBtnS.classList.remove('filter__btn--active');

	if (e.target === highBtn) {
		normalBtn.classList.remove('filter__btn--active');
		lowBtn.classList.remove('filter__btn--active');

		//----------------clean '.main-section__cards-container'
		cleanContainer(document.querySelector('.main-section__cards-container'));

		//----------------CHECKING...
		fetch('https://ajax.test-danit.com/api/v2/cards', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${sessionStorage.token}`,
			},
		})
			.then(resp => resp.json())
			.then(allCard => {
				//---------------hide title
				let counter = 0;
				if (counter === 0) {
					document.querySelector('.main-section__header-novisit').style.display = 'none';
				}
				//-----------------check input value in context object key and render it
				for (const card of allCard) {
					if (card.urgency === 'High') {
						counter++;
						cardsController.addCard(card);
					}
				}
				if (counter === 0) {
					document.querySelector('.main-section__header-novisit').style.display = 'block';
				}
			});
	} else if (e.target === normalBtn) {
		highBtn.classList.remove('filter__btn--active');
		lowBtn.classList.remove('filter__btn--active');

		//----------------clean '.main-section__cards-container'
		cleanContainer(document.querySelector('.main-section__cards-container'));

		//----------------CHECKING...
		fetch('https://ajax.test-danit.com/api/v2/cards', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${sessionStorage.token}`,
			},
		})
			.then(resp => resp.json())
			.then(allCard => {
				//---------------hide title
				let counter = 0;
				if (counter === 0) {
					document.querySelector('.main-section__header-novisit').style.display = 'none';
				}
				//-----------------check input value in context object key and render it
				for (const card of allCard) {
					if (card.urgency === 'Normal') {
						cardsController.addCard(card);
					}
				}
				if (counter === 0) {
					document.querySelector('.main-section__header-novisit').style.display = 'block';
				}
			});
	} else {
		highBtn.classList.remove('filter__btn--active');
		normalBtn.classList.remove('filter__btn--active');

		//----------------clean '.main-section__cards-container'
		cleanContainer(document.querySelector('.main-section__cards-container'));

		//----------------CHECKING...
		fetch('https://ajax.test-danit.com/api/v2/cards', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${sessionStorage.token}`,
			},
		})
			.then(resp => resp.json())
			.then(allCard => {
				//---------------hide title
				let counter = 0;
				if (counter === 0) {
					document.querySelector('.main-section__header-novisit').style.display = 'none';
				}
				//-----------------check input value in context object key and render it
				for (const card of allCard) {
					if (card.urgency === 'Low') {
						cardsController.addCard(card);
					}
				}
				if (counter === 0) {
					document.querySelector('.main-section__header-novisit').style.display = 'block';
				}
			});
	}
}
