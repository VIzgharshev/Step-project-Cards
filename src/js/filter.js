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

//--------------------ARRAY FOR FILTERS
//let arrForFilter = [];

//-----------------------------------INPUT FILTER--------------------------------------------
function onInputEnter(e) {
	if (e.keyCode === 13) {
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
					if (allCard.length != 0) {
						document.querySelector('.main-section__header-novisit').style.display = 'none';
					}
					//-----------------check input value in context object key and render it
					for (const card of allCard) {
						for (const key in card) {
							let arrContext = String(card[key]).toLowerCase().split(' ');

							if (arrContext.includes(inputForCheck.toLowerCase())) {
								cardsController.addCard(card);
							}
						}
					}
				});
			console.log(inputForCheck);
		} else if (inputForCheck === '') {
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
			console.log(inputForCheck);
		}
	}
}

function onInputBtn() {
	const forRender = new DoctorVisitModal();
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
				if (allCard.length != 0) {
					document.querySelector('.main-section__header-novisit').style.display = 'none';
				}
				//-----------------check input value in context object key and render it
				for (const card of allCard) {
					for (const key in card) {
						let arrContext = String(card[key]).toLowerCase().split(' ');

						if (arrContext.includes(inputForCheck.toLowerCase())) {
							cardsController.addCard(card);
						}
					}
				}
			});
	} else if (inputForCheck === '') {
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
					if (card.urgency === 'high') {
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
	} else {
		openBtn.classList.remove('filter__btn--active');
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
				if (allCard.length != 0) {
					document.querySelector('.main-section__header-novisit').style.display = 'none';
				}
				//-----------------check input value in context object key and render it
				for (const card of allCard) {
					if (card.urgency === 'High') {
						cardsController.addCard(card);
					}
				}
				console.log(allCard);
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

	//if (
	//  e.target === highBtn &&
	//  e.target.classList.contains('filter__btn--active') === false
	//) {
	//  e.target.classList.add('filter__btn--active');
	//  normalBtn.classList.remove('filter__btn--active');
	//  lowBtn.classList.remove('filter__btn--active');

	//  const forRender = new DoctorVisitModal();

	//  //----------------clean '.main-section__cards-container'
	//  cleanContainer(document.querySelector('.main-section__cards-container'));

	//  //----------------CHECKING...
	//  if (arrForFilter.length === 0) {
	//    fetch('https://ajax.test-danit.com/api/v2/cards', {
	//      method: 'GET',
	//      headers: {
	//        'Content-Type': 'application/json',
	//        Authorization: `Bearer ${sessionStorage.token}`,
	//      },
	//    })
	//      .then((resp) => resp.json())
	//      .then((allCard) => {
	//        //---------------hide title
	//        if (allCard.length != 0) {
	//          document.querySelector(
	//            '.main-section__header-novisit'
	//          ).style.display = 'none';
	//        }
	//        //-----------------check input value in context object key and render it
	//        let arr = [];
	//        for (const card of allCard) {
	//          if (card.urgency === 'high') {
	//            const mainContainer = document.createElement('div');
	//            mainContainer.classList.add('main-section__card');
	//            //--rendering card
	//            forRender.render(
	//              card.id,
	//              mainContainer,
	//              card.patientName,
	//              card.doctor,
	//              card.urgency
	//            );
	//            //--forming new array for ather filters
	//            arr.push(card);
	//          }
	//        }
	//        arrForFilter = arr;
	//      });
	//  } else {
	//    //---------------hide title
	//    if (arrForFilter.length != 0) {
	//      document.querySelector('.main-section__header-novisit').style.display =
	//        'none';
	//    }
	//    //-----------------check input value in context object key and render it
	//    let arr = [];
	//    for (const card of arrForFilter) {
	//      if (card.urgency === 'high') {
	//        const mainContainer = document.createElement('div');
	//        mainContainer.classList.add('main-section__card');
	//        //--rendering card
	//        forRender.render(
	//          card.id,
	//          mainContainer,
	//          card.patientName,
	//          card.doctor,
	//          card.urgency
	//        );
	//        //--forming new array for ather filters
	//        arr.push(card);
	//      }
	//    }
	//    arrForFilter = arr;
	//  }

	//} else if (
	//  e.target === highBtn &&
	//  e.target.classList.contains('filter__btn--active') === true
	//) {
	//  e.target.classList.remove('filter__btn--active');

	//      const forRender = new DoctorVisitModal();

	//      //----------------clean '.main-section__cards-container'
	//      cleanContainer(
	//        document.querySelector('.main-section__cards-container')
	//      );

	//  fetch('https://ajax.test-danit.com/api/v2/cards', {
	//    method: 'GET',
	//    headers: {
	//      'Content-Type': 'application/json',
	//      Authorization: `Bearer ${sessionStorage.token}`,
	//    },
	//  })
	//    .then((resp) => resp.json())
	//    .then((allCard) => {
	//      //---------------hide title
	//      if (allCard.length != 0) {
	//        document.querySelector(
	//          '.main-section__header-novisit'
	//        ).style.display = 'none';
	//      }
	//      //-----------------check input value in context object key and render it
	//      let arr = [];
	//      for (const card of allCard) {
	//        if (card.urgency === 'high') {
	//          const mainContainer = document.createElement('div');
	//          mainContainer.classList.add('main-section__card');
	//          //--rendering card
	//          forRender.render(
	//            card.id,
	//            mainContainer,
	//            card.patientName,
	//            card.doctor,
	//            card.urgency
	//          );
	//          //--forming new array for ather filters
	//          arr.push(card);
	//        }
	//      }
	//      arrForFilter = arr;
	//    });
	//} else if (
	//  e.target === normalBtn &&
	//  e.target.classList.contains('filter__btn--active') === false
	//) {
	//  highBtn.classList.remove('filter__btn--active');
	//  lowBtn.classList.remove('filter__btn--active');
	//} else if (
	//  e.target === normalBtn &&
	//  e.target.classList.contains('filter__btn--active') === true
	//) {
	//  e.target.classList.remove('filter__btn--active');
	//} else if (
	//  e.target === lowBtn &&
	//  e.target.classList.contains('filter__btn--active') === false
	//) {
	//  highBtn.classList.remove('filter__btn--active');
	//  normalBtn.classList.remove('filter__btn--active');
	//} else if (
	//  e.target === lowBtn &&
	//  e.target.classList.contains('filter__btn--active') === true
	//) {
	//  e.target.classList.remove('filter__btn--active');
	//}
}
