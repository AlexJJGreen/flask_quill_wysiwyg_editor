const quill = new Quill('#editor', {
    theme: 'snow',
    modules: {
        toolbar: [[{ header: [1, 2, 3, false] }],
        ['bold', 'italic', 'underline'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        ['link', 'image', 'code-block']]
    }
});


document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("content-form");
    const editor = document.getElementById("editor").firstChild;

    // If editing post, retrieve ID param, pass to fetch and populate DOM
    let url = new URL(window.location.href);
    let postID = url.searchParams.get("id");

    if (postID !== null) {
        fetch('/editor/get_post/' + postID)
            .then(response => response.json())
            .then(post => {
                editor.innerHTML = post.content;
            });
    }

    form.addEventListener("submit", (e) => {

        // prevent default behaviour
        e.preventDefault();

        if (postID !== null) {
            console.log("triggred");
            let data = {
                id: postID,
                title: document.getElementById("content-title").value,
                snippet: document.getElementById("content-snippet").value,
                thumbnailUrl: document.getElementById("content-thumbnail-url").value,
                content: editor.innerHTML
            };

            postData("/editor/post_content", data)
                .then(data => console.log(data))
                .catch(error => console.log("Error", error));
        }
        else {
            let data = {
                title: document.getElementById("content-title").value,
                snippet: document.getElementById("content-snippet").value,
                thumbnailUrl: document.getElementById("content-thumbnail-url").value,
                content: editor.innerHTML
            };

            postData("/editor/post_content", data)
                .then(data => console.log(data))
                .catch(error => console.log("Error", error));
        }

    });

    const deleteBtn = document.getElementById("deleteBtn");
    deleteBtn.addEventListener("click", (e) => {
        e.preventDefault();
        postData("/editor/delete_post", { id: postID })
            .then()
            .catch(err => console.log(err));
    });

});

async function postData(url = "", data = {}) {
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    return response.json();
}

async function deletePost(url = "") {
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify()
    });
    return true;
}