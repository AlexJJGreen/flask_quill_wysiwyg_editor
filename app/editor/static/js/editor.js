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

    form.addEventListener("submit", (e) => {

        // prevent default behaviour
        e.preventDefault();

        /* create data object from form to model ->
            title = db.Column
            snippet = db.Column
            thumbnail_url = db.Column
            content = db.Text
        */
        let data = {
            title: document.getElementById("content-title").value,
            snippet: document.getElementById("content-snippet").value,
            thumbnailUrl: document.getElementById("content-thumbnail-url").value,
            content: editor.innerHTML
        };

        postData("/editor/post_content", data)
            .then(data => console.log(data))
            .catch(error => console.log("Error", error));

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