const checkBox = document.querySelectorAll('.check-complete');
const checkedCheckboxes = document.querySelectorAll('input[checked]');

function main() {
  checkBox.forEach((check) => {
    const tableBody = check.parentElement.parentElement.parentElement;
    check.addEventListener('change', async (e) => {
      const idTask = e.target.id;
      tableBody.classList.add('completed');
      await taskComplete(idTask);
    });
  });

  checkedCheckboxes.forEach((checked) => {
    const tableBody = checked.parentElement.parentElement.parentElement;
    checked.classList.contains('task-check')
      ? tableBody.classList.add('completed')
      : tableBody;
  });
}

async function taskComplete(id) {
  try {
    fetch(`http://localhost:3000/task/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        status: true,
      }),
    }).then((response) => {
      if (response.status === 200) {
        console.log('Task completed successfully');
      } else {
        console.log(response, "Can't connect to server");
      }
    });
  } catch (error) {
    console.error(error);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  main();
});
