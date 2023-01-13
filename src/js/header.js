const headerBtnLogin = document.querySelector('.header__btn-login');
const headerBtnExit = document.querySelector('.header__btn-exit');
const headerBtns = document.querySelector('.header__btns');
const modalLoginBtnDone = document.querySelector('.modal-login__btn-done');
const modalLoginBtnClose = document.querySelector('.modal-login__btn-close');
const token = '';

//-----------------------------header btn function------------------------------------
function headerLogin() {
	const modalLogin = document.querySelector('.modal-login');
	modalLogin.classList.remove('invisible');
}

headerBtnLogin.onclick = headerLogin;

function headerExit() {
	location.reload();
}

headerBtnExit.onclick = headerExit;

//-----------------------------modal login btns functions------------------------------------

async function modalDoneBtn() {
	const modalLogin = document.querySelector('.modal-login');
	const email = document.querySelector('#loginEmail').value;
	const password = document.querySelector('#loginPassword').value;
	const headerText = document.querySelector('.header__text');

	await fetch('https://ajax.test-danit.com/api/v2/cards/login', {
		//------------------------request for token and login
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ email: `${email}`, password: `${password}` }),
	})
		.then(response => {
			if (response.status >= 400) {
				let emailText = document.querySelector('#emailHelp');
				emailText.style.color = 'red';
				emailText.innerHTML = 'Incorrect username or password!';
			} else {
				headerText.innerHTML = `Вітаємо, ${email}!`;
				modalLogin.classList.add('invisible');
				headerBtnLogin.classList.add('invisible');
				headerBtns.classList.remove('invisible');
				return response.text();
			}
		})
		.then(resp => {
			sessionStorage.setItem('token', resp);
			return resp;
		})
		.then(async resp => {
			//----------------------request for card render
			await fetch('https://ajax.test-danit.com/api/v2/cards', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${resp}`,
				},
			})
				.then(resp => resp.json())
				.then(allCard => {
					console.log(allCard);
					const forRender = new DoctorVisitModal();
               if (allCard.length != 0){
                  document.querySelector('.main-section__header-novisit').style.display = 'none';
               }
					for (const card of allCard) {
						const mainContainer = document.createElement('div');
						mainContainer.classList.add('main-section__card');
						forRender.render(
							card.id,
							mainContainer,
							card.patientName,
							card.doctor,
							card.ergency
						);
					}
				});
		});
}

function modalCloseBtn() {
	const modalLogin = document.querySelector('.modal-login');
	modalLogin.classList.add('invisible');
}

modalLoginBtnDone.onclick = modalDoneBtn;
modalLoginBtnClose.onclick = modalCloseBtn;
