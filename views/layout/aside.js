const navLink = document.querySelectorAll('.nav-link-custom');
const taskDescription = document.querySelector('#taskDescription');
const buttonSubmit = document.querySelector('.button-submit-task');

const currentPath = window.location.pathname;
const pageName = currentPath.split('/')[2] || 'task';

function main() {
  taskDescription?.addEventListener('input', (e) => {
    validateFields(taskDescription.value, buttonSubmit);
  });
}

function validateFields(input, button) {
  if (input != '') {
    console.log('Valid')
    button.classList.remove('disabled')
  } else if(input === ''){
    button.classList.add('disabled')
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const currentLink = document.querySelector(`.${pageName}-link`);
  currentLink.classList.add('active');

  main();
});
