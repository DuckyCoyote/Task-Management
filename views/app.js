export function validateFields(
  value,
  inputElement,
  containerElement,
  regex,
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
    (value.length < 8 && fieldType === 'Password') ||
    (!value && fieldType === 'Name') ||
    (!value && fieldType === 'LastName')
  ) {
    if (errors.length < 1) {
      containerElement.appendChild(error);
    }
    inputElement.classList.remove('border-success');
    inputElement.classList.add('border-danger');
  } else {
    if (errors.length > 0) {
      containerElement.removeChild(document.querySelector(`.${errorClass}`));
    }
    inputElement.classList.remove('border-danger');
    inputElement.classList.add('border-success');
  }
}

export function validateForm(buttonSubmit, formData, regexEmail) {
  if (
    (regexEmail.test(formData.email) && formData.password.length >= 8) ||
    (regexEmail.test(formData.email) &&
      formData.password.length >= 8 &&
      formData.name != '' &&
      formData.lastName != '')
  ) {
    buttonSubmit.classList.remove('cursor-not-allowed');
    buttonSubmit.disabled = false;
  } else {
    buttonSubmit.classList.add('cursor-not-allowed');
    buttonSubmit.disabled = true;
  }
}
