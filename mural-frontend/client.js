const listagem_view = document.getElementById('listagem');
const mensagens = [];

function update_msg() {
    fetch('http://150.165.85.16:9900/api/msgs')
    .then(r => r.json())
    .then(data => { 
        Object.assign(mensagens, data);
        update_view(mensagens.reverse())
    }
    );
}

function update_view(array) {
        const items = array.map(e => `
        <div class="card shadow">
            <div class="card-body">
                <h5 class="card-title text-primary">${e.title}</h5> 
                <p class="card-text">${e.msg}</p> 
                <p class="card-text">
                    <small class="text-muted">@${e.author}</small>
                    <small class="text-muted font-italic"> --- ${e.created_at}</small>
                </p>
        </div>
    </div>
    <br>`).join("\n");
    listagem_view.innerHTML = items; 
};

function submit() {
    fetch('http://150.165.85.16:9900/api/msgs', {
        method: 'POST',
        body: JSON.stringify({
            title: document.getElementById('subject').value,
            msg: document.getElementById('msg').value, 
            author: document.getElementById('author').value, 
            credentials:"vjsilva:avengers"})
    })
    .then(dado => dado.json());
    update_msg();
};

function show(tag) {
    tag.hidden = !tag.hidden;
}

function clearvalue(tag) {
    tag.value = '';
}

update_msg();

function searching(tag) {
    const busca = mensagens.filter(a => a.title.toLowerCase().indexOf(tag.value.toLowerCase()) != -1);
    update_view(busca);
}
