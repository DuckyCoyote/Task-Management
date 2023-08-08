import { validateForm, validateFields } from './app.js';

const name = document.querySelector('#name');
const lastName = document.querySelector('#lastName');
const email = document.querySelector('#email');
const password = document.querySelector('#password');

const nameContainer = document.querySelector('.name-container');
const lastNameContainer = document.querySelector('.lastName-container');
const emailContainer = document.querySelector('.email-container');
const passwordContainer = document.querySelector('.password-container');
const form = document.querySelector('#form');
const buttonSubmit = document.querySelector('#button-submit');

const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

function main() {
  const formData = {
    name,
    lastName,
    email,
    password,
  };

  name.addEventListener('input', (e) => {
    validateFields(
      name.value,
      name,
      nameContainer,
      null,
      'Insert your name...!',
      'Name'
    );
    formData.name = e.target.value;
    validateForm(buttonSubmit, formData, regexEmail);
  });

  lastName.addEventListener('input', (e) => {
    validateFields(
      lastName.value,
      lastName,
      lastNameContainer,
      null,
      'Insert your last name...!',
      'LastName'
    );
    formData.lastName = e.target.value;
    validateForm(buttonSubmit, formData, regexEmail);
  });

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
  //   if (buttonSubmit.classList.contains('cursor-not-allowed')) {
  //     e.preventDefault();
  //   } else {
  //     SignUp(form);
  //   }
  // });
}

async function SignUp(form) {
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);

  await fetch('http://localhost:3000/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
}

document.addEventListener('DOMContentLoaded', () => {
  main();
});
