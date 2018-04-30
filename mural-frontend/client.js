const listagem_view = document.getElementById('listagem');
const mensagens = [];

function update_msg() {
    fetch('http://150.165.85.16:9900/api/msgs')
    .then(r => r.json())
    .then(data => { 
        Object.assign(mensagens, data);
        update_view(mensagens);
    });
}

function update_view(array) {
    const items = array.map(e => `
    <div class="card shadow mx-2 my-2 w-auto">
        <div class="card-body">
            <span title="Identificador da mensagem" class="badge badge-primary badge-pill float-right">#${e.id}</span>
            <h5 class="card-title text-primary">${e.title}</h5> 
            <p class="card-text">${e.msg}</p> 
            <p class="card-text">
                <small class="text-muted">@${e.author}, </small>
                <small class="text-muted font-italic">
                    enviado às ${new Date(e.created_at).toLocaleTimeString()}, 
                    em ${new Date(e.created_at).toLocaleDateString()} &nbsp;&nbsp;
                </small>
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
    //scroll(tag);
}

function set_hidden(tag){
    if (tag.hidden == false) {
        tag.hidden = true;
    }
}

function clearvalue(tag) {
    tag.value = '';
}

update_msg();

function searching(tag) {
    const busca = mensagens.filter(a => 
        a.title.toLowerCase().indexOf(tag.value.toLowerCase()) != -1 ||
        a.msg.toLowerCase().indexOf(tag.value.toLowerCase()) != -1 ||
        a.author.toLowerCase().indexOf(tag.value.toLowerCase()) != -1
    );
    if (busca.length == 0) {
        alert('Nenhuma mensagem correspondente foi encontrada');
    } else {
        update_view(busca);
    }
}

function localmessages() {
    return mensagens.filter(a => a.frontend == 'vjsilva');
}

function remove (tag) {
    if (tag.value.length == 0) {
        alert('Informe um id');
    } else {   
        const msgs = JSON.stringify({
            credentials: "vjsilva:avengers"
        });
        fetch(`http://150.165.85.16:9900/api/msgs/${tag.value}`, {
            method: 'DELETE',
            body: msgs
        })
        .then(a => localmessages);
        update_msg();
        update_view(localmessages);
    }
}

function scroll(tag) {
    let diff=(tag.offsetTop-window.scrollY)/8;
    if (Math.abs(diff)>1) {
        window.scrollTo(0, (window.scrollY+diff))
        clearTimeout(window._TO);
        window._TO=setTimeout(scroll, 20, tag);
    } else {
        window.scrollTo(0, tag.offsetTop);
    }
}