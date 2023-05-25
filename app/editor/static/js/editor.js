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
    /*
    const postTitle = document.getElementById("content-title").innerText;
    const postSnippet = document.getElementById("content-snippet").innerText;
    const postThumbnailURL = document.getElementById("content-thumbnail-url").innerText;
    const postContent = quill.root.innerHTML;
    */

    const content = JSON.stringify({
        post_title: document.getElementById("content-title").innerText,
        post_snippet: document.getElementById("content-snippet").innerText,
        post_thumbnail_url: document.getElementById("content-thumbnail-url").innerText,
        post_content: quill.root.innerHTML
    })

    fetch('/save_content', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: content
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