const listagem_view = document.getElementById("listagem");
const title = document.getElementById("title");
const msg = document.getElementById("msg");
const author = document.getElementById("author");

const mensagens = [];

function update_view() {
    const items = mensagens.map(e => `
    <div class="card">
        <div class="card-body">
            <h5 class="card-title">${e.title}</h5> 
            <p class="card-text">${e.msg}</p> 
            <p class="card-text">
                <small class="text-muted">@${e.author}</small>
                <small class="text-muted">${e.created_at}</small>
            </p>
        </div>
    </div><br>`).join("\n");
    listagem_view.innerHTML = items;
};

function submit() {
    fetch('http://150.165.85.16:9900/api/msgs', {
        method: 'post',
        body: JSON.stringify({
            title: title.value, 
            msg: msg.value, 
            author: author.value, 
            credentials:"vjsilva:avengers"})
    })
    .then(dado => dado.json());
};

fetch('http://150.165.85.16:9900/api/msgs')
.then(r => r.json())
.then(data => {
    Object.assign(mensagens, data);
    update_view();
});