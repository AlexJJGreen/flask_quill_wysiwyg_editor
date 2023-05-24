const quill = new Quill('#editor', {
    theme: 'snow',
    modules: {
        toolbar: [[{ header: [1, 2, 3, false] }],
        ['bold', 'italic', 'underline'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        ['link', 'image', 'code-block']]
    }
});

const saveBtn = document.querySelector('#saveBtn');
saveBtn.addEventListener('click', () => {
    const postContent = quill.root.innerHTML;

    fetch('/save_post', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ post_content: postContent })
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Post saved successfully.');
            } else {
                alert('Failed to save the post.');
            }
        });
});