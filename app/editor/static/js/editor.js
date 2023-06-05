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
        fetch('/editor/delete_post', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id: postID })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                window.location.href = data.redirect;  // Redirect to the URL received from the server
            })
            .catch(error => {
                console.log('There has been a problem with your fetch operation: ', error);
            });
        /*postData("/editor/delete_post", { id: postID })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok")
                }
                console.log(response);
                return response.json();
            })
            .then(data => {
                console.log(data);
                window.location.href = data.redirect
            })
            .catch(error => console.log("There is an error", error));*/
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
    return response.json();
}