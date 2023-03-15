const commentFormHandler = async (event) => {
  event.preventDefault();

  console.log("Comment button submitted");
  const blogpostId = document.URL.split('/').slice(-1)[0];

  const comment = document.querySelector('#comment-input').value.trim();

  const createdDate = Date.now();

  console.log("Created date =");
  console.log(createdDate);
  
  console.log(comment);

  if (comment) {
    const response = await fetch('/api/users/comment', {
      method: 'POST',
      body: JSON.stringify({ blogpostId, comment, createdDate}),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace(`/blogpost/${blogpostId}`);
    } else {
      alert('Failed to add comment.');
    }
  }
};

console.log("Waiting for comments")

document
  .querySelector('#comment_btn')
  .addEventListener('click', commentFormHandler);
