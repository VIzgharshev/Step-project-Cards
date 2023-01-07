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
        headerText.innerHTML = `Вітаємо, ви зайшли в акаунт ${email}!`;
        modalLogin.classList.add('invisible');
        headerBtnLogin.classList.add('invisible');
        headerBtns.classList.remove('invisible');
        return response.text();
      }
    })
    .then((resp) => {
      sessionStorage.setItem('token', resp);
    });
}

function modalCloseBtn() {
  const modalLogin = document.querySelector('.modal-login');
  modalLogin.classList.add('invisible');
}

modalLoginBtnDone.onclick = modalDoneBtn;
modalLoginBtnClose.onclick = modalCloseBtn;
