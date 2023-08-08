import { validateForm, validateFields } from './app.js';

const email = document.querySelector('#email');
const password = document.querySelector('#password');
const form = document.querySelector('#form');

const emailContainer = document.querySelector('.email-container');
const passwordContainer = document.querySelector('.password-container');

const buttonSubmit = document.querySelector('#button-submit');

const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

function main() {
  const formData = {
    email,
    password,
  };

  email.addEventListener('input', (e) => {
    validateFields(
      email.value,
      email,
      emailContainer,
      regexEmail,
      'Insert valid email!',
      'Email'
    );
    formData.email = e.target.value;
    validateForm(buttonSubmit, formData, regexEmail);
  });

  password.addEventListener('input', (e) => {
    validateFields(
      password.value,
      password,
      passwordContainer,
      null,
      'Insert password higher than 8!',
      'Password'
    );
    formData.password = e.target.value;
    validateForm(buttonSubmit, formData, regexEmail);
  });

  // form.addEventListener('submit', (e) => {
  //   if (buttonSubmit.disabled) {
  //     e.preventDefault();
  //   } else {
  //     sendForm(formData);
  //   }
  // });
}

async function sendForm(data) {
  await fetch('http://localhost:3000/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      /*if(response.status === 200)
        window.location.href = '/welcome';
      else*/ if (response.status === 403)
        console.error({ message: 'Invalid credentials' });
    })
    .catch((error) => {
      console.error(error);
    });
}

document.addEventListener('DOMContentLoaded', () => {
  buttonSubmit.classList.add('cursor-not-allowed');
  main();
});
