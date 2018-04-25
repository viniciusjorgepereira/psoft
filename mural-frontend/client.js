const listagem_view = document.getElementById('listagem');

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
}

fetch('http://150.165.85.16:9900/api/msgs')
.then(r => r.json())
.then(data => {
    Object.assign(mensagens, data);
    update_view();
})

