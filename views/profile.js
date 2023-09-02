const btnEditar = document.querySelector('.btn-editar');

const inputDisabled = document.querySelectorAll('input[disabled]');
const imageUpload = document.querySelector('#imgUpload');
const profileImage = document.querySelector('.profileImage');

const name = document.querySelector('#name');
const lastName = document.querySelector('#lastName');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const emailContainer = document.querySelector('.emailContainer');
const passwordContainer = document.querySelector('.passwordContainer');

const formProfile = document.querySelector('.form-profile');
const buttonPatchProfile = document.querySelector('.btn-patch-profile');

const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

function main() {
  btnEditar.addEventListener('click', () => {
    inputDisabled.forEach((input) => {
      if (input.disabled) {
        input.disabled = false;
        buttonPatchProfile.disabled = false;
        btnEditar.textContent = 'Cancel';
        btnEditar.classList.remove('btn-primary');
        btnEditar.classList.add('btn-danger');
      } else {
        input.disabled = true;
        buttonPatchProfile.disabled = true;
        btnEditar.textContent = 'Edit';
        btnEditar.classList.remove('btn-danger');
        btnEditar.classList.add('btn-primary');
      }
    });
  });
  let selectedFile;
  imageUpload.addEventListener('change', (e) => {
    selectedFile = e.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        profileImage.src = e.target.result;
      };
      reader.readAsDataURL(selectedFile);
    }
  });

  email.addEventListener('input', (e) => { 
    validateFields(email.value, email, emailContainer, regexEmail, buttonPatchProfile, 'Insert an valid email address', 'Email')
  })
  
  password.addEventListener('input', (e) => { 
    validateFields(password.value, password, passwordContainer, null, buttonPatchProfile, 'Insert password higher than 8!', 'Password')
  })

  formProfile.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formValues = {
      name: name.value,
      lastName: lastName.value,
      email: email.value,
      password: password.value,
    };
    const formData = new FormData();
    Object.entries(formValues).forEach(([key, values]) => {
      if (values != '') {
        formData.append(key, values);
      }
    });
    const dataToSend = Object.fromEntries(formData);
    patchProfile(dataToSend);

    if (selectedFile) await patchPhoto(selectedFile);
  });
}

async function patchProfile(data) {
  const response = await fetch('http://localhost:3000/user/update', {
    method: 'PATCH',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(data),
  });
  if (response) {
    setTimeout(() => {
      window.location.href = 'http://localhost:3000/user';
    }, 1500);
  }
}

async function patchPhoto(img) {
  const formData = new FormData();
  formData.append('photo', img);
  const response = await fetch('http://localhost:3000/user/update/photo', {
    method: 'PATCH',
    body: formData,
  });
  if (response) window.location.href = 'http://localhost:3000/user';
}

function validateFields(
  value,
  inputElement,
  containerElement,
  regex,
  buttonPatchProfile,
  errorMessage,
  fieldType
) {
  const errorClass = `error-${fieldType.toLowerCase()}`;
  const error = document.createElement('p');
  error.classList.add('text-danger', 'text-xs', 'italic', errorClass);
  error.textContent = errorMessage;

  const errors = containerElement.querySelectorAll(`.${errorClass}`);

  if (
    (regex && !regex.test(value)) ||
    ((value.length < 8 ) && fieldType === 'Password')
  ) {
    if (errors.length < 1) {
      containerElement.appendChild(error);
    }
    buttonPatchProfile.disabled = true;
    inputElement.classList.remove('border-success');
    inputElement.classList.add('border-danger');
  } else {
    if (errors.length > 0) {
      containerElement.removeChild(document.querySelector(`.${errorClass}`));
    }
    buttonPatchProfile.disabled = false;
    inputElement.classList.remove('border-danger');
    inputElement.classList.add('border-success');
  }
}

document.addEventListener('DOMContentLoaded', function () {
  main();
});
