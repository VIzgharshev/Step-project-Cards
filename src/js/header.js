const headerBtnLogin = document.querySelector('.header__btn-login');
const headerBtnExit = document.querySelector('.header__btn-exit');
const headerBtns = document.querySelector('.header__btns');
const modalLoginBtnDone = document.querySelector('.modal-login__btn-done');
const modalLoginBtnClose = document.querySelector('.modal-login__btn-close');
const modalLogin = document.querySelector('.modal-login');
const headerText = document.querySelector('.header__text');

let token = '';
let userEmail = null;
let userPassword = null;

//window.addEventListener('reload', sessionStorage.clear());
window.addEventListener('load', async (e) => {
  if (
    sessionStorage.getItem('email') != null &&
    sessionStorage.getItem('password') != null &&
    sessionStorage.getItem('token') != null
  ) {
    headerText.innerHTML = `Вітаємо, <b>${sessionStorage.getItem('email')}</b>!`;
    modalLogin.classList.add('invisible');
    headerBtnLogin.classList.add('invisible');
    headerBtns.classList.remove('invisible');

    await fetch('https://ajax.test-danit.com/api/v2/cards', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
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
  }
});

//-----------------------------header btn function------------------------------------
function headerLogin() {
  modalLogin.classList.remove('invisible');
}

headerBtnLogin.onclick = headerLogin;

function headerExit() {
  location.reload();
  sessionStorage.clear();
}

headerBtnExit.onclick = headerExit;

modalLogin.addEventListener('click', (e) => {
  if (e.target === modalLogin) {
    modalLogin.classList.add('invisible');
  }
});

//-----------------------------modal login btns functions------------------------------------

function modalDoneBtn() {
  const email = document.querySelector('#loginEmail').value;
  const password = document.querySelector('#loginPassword').value;

  fetch('https://ajax.test-danit.com/api/v2/cards/login', {
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
      let userEmail = document.querySelector('#loginEmail').value;
      let userPassword = document.querySelector('#loginPassword').value;
      sessionStorage.setItem('token', resp);
      sessionStorage.setItem('email', userEmail);
      sessionStorage.setItem('password', userPassword);
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
