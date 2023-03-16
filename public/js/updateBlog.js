const updateFormHandler = async (event) => {
  event.preventDefault();

  console.log("Update button clicked");

  const title = document.querySelector('#title-input').value.trim();
  const content = document.querySelector('#content-input').value.trim();
  const createdDate = Date.now();
  const blogpostId = document.URL.split('/').slice(-1)[0];

  console.log(title);
  console.log(content);
  console.log(createdDate);

  if (title && content && createdDate && blogpostId) {
    const response = await fetch('/api/users/updatepost', {
      method: 'PUT',
      body: JSON.stringify({ title, content, createdDate, blogpostId}),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to create new post');
    }
  }
};

const deleteFormHandler = async (event) => {
  event.preventDefault();

  console.log("Delete button clicked");

  const blogpostId = document.URL.split('/').slice(-1)[0];

  if (blogpostId) {
    const response = await fetch('/api/users/deletepost', {
      method: 'DELETE',
      body: JSON.stringify({blogpostId}),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to delete a post');
    }
  }
};

console.log("Waiting to update or delete a post");

document
  .querySelector('#update-post-btn')
  .addEventListener('click', updateFormHandler);

document
  .querySelector('#delete-post-btn')
  .addEventListener('click', deleteFormHandler);