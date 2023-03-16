const createFormHandler = async (event) => {
  event.preventDefault();

  console.log("Create button submitted");


  const title = document.querySelector('#title-input').value.trim();
  const content = document.querySelector('#content-input').value.trim();
  const createdDate = Date.now();

  console.log(title);
  console.log(content);
  console.log(createdDate);



  if (title && content && createdDate) {
    const response = await fetch('/api/users/newpost', {
      method: 'POST',
      body: JSON.stringify({ title, content, createdDate}),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to create new post');
    }
  }
};

console.log("Waiting for new post")

document
  .querySelector('#create-post-btn')
  .addEventListener('click', createFormHandler);