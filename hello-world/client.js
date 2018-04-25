const msg = document.getElementById('msg');
const count = document.getElementById('count');

msg.innerText = 'vamos lá de novo';
count.innerText = '...';

fetch('/api')
.then(function (r) {
    return r.json();
})
.then(function (d) {
    msg.innerText = d.msg;
    count.innerText = '' + d.count;
});