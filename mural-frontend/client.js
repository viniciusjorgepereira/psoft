let listagem_view = document.getElementById('listagem');
let mensagens = [];
let user = '';

name_view();

function name_view() {
    if (user.length == 0) {
        document.getElementById('nameview').innerText = `Login`;
    } else {
        document.getElementById('nameview').innerHTML = `Logout`;
    }
}

function update_msg() {
    fetch('http://150.165.85.16:9900/api/msgs')
    .then(r => r.json())
    .then(data => { 
        Object.assign(mensagens, data.reverse());
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
    if (user.length == 0) {
        show(document.getElementById('log'));
        show(document.getElementById('add'));
        alert('Não existe usuário logado');
    } else {
        fetch('http://150.165.85.16:9900/api/msgs', {
            method: 'POST',
            body: JSON.stringify({
                title: document.getElementById('subject').value,
                msg: document.getElementById('msg').value, 
                author: document.getElementById('author').value, 
                credentials: user
            })
        })
        .then(dado => dado.json());
    }
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
    lista = user.split(':');
    return mensagens.filter(a => a.frontend == lista[0]);
}

function remove (tag) {
    if (user.length == 0) {
        alert('Nenhum usuário logado');
        show(document.getElementById('log'));
    } else {
        const msgs = JSON.stringify({
            credentials: user
        });
        fetch(`http://150.165.85.16:9900/api/msgs/${tag.value}`, {
            method: 'DELETE',
            body: msgs
        })
        .then(a => localmessages())
        .then(a => update_msg());
        show(document.getElementById('del'));
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

function logout() {
    if (user.length != 0) {
        user = '';
    }
    name_view();
}

function login(username, pswd) {
    if (username.value.length == 0 | pswd.value.length == 0) {
        alert('Os campos não podem ser vazios');
    } else {
        user = username.value + ':' + pswd.value;
        name_view();
        update_view(localmessages());
    }
}