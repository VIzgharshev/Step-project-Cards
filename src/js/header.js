const headerBtnLogin = document.querySelector('.header__btn-login');
const headerBtnExit = document.querySelector('.header__btn-exit');
const headerBtns = document.querySelector('.header__btns');
const modalLoginBtnDone = document.querySelector('.modal-login__btn-done');
const modalLoginBtnClose = document.querySelector('.modal-login__btn-close');
const modalLogin = document.querySelector('.modal-login');

let token = '';

window.addEventListener('reload', sessionStorage.clear());

//-----------------------------header btn function------------------------------------
function headerLogin() {
  modalLogin.classList.remove('invisible');
}

headerBtnLogin.onclick = headerLogin;

function headerExit() {
  location.reload();
  sessionStorage.token = null;
}

headerBtnExit.onclick = headerExit;

modalLogin.addEventListener('click', (e) => {
  if (e.target === modalLogin) {
    modalLogin.classList.add('invisible');
  }
});

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
    .then((response) => {
      if (response.status >= 400) {
        let emailText = document.querySelector('#emailHelp');
        emailText.style.color = 'red';
        emailText.innerHTML = 'Incorrect username or password!';
      } else {
        headerText.innerHTML = `Вітаємо, <b>${email}</b>!`;
        modalLogin.classList.add('invisible');
        headerBtnLogin.classList.add('invisible');
        headerBtns.classList.remove('invisible');
        return response.text();
      }
    })
    .then((resp) => {
      sessionStorage.setItem('token', resp);
      return resp;
    })
    .then(async (resp) => {
      //----------------------request for card render
      await fetch('https://ajax.test-danit.com/api/v2/cards', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${resp}`,
        },
      })
        .then((resp) => resp.json())
        .then((allCard) => {
          //----------------clean '.main-section__cards-container'
          cleanContainer(
            document.querySelector('.main-section__cards-container')
          );

          if (allCard.length != 0) {
            document.querySelector(
              '.main-section__header-novisit'
            ).style.display = 'none';
          }
          for (const card of allCard) {
            cardsController.addCard(card);
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
