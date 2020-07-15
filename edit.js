marked.setOptions({
    headerIds: false,
    highlight: function(code, lang) {
        return hljs.highlight(lang, code).value;
      }
})

window.onload = () => {
    loadView()

    let mds = document.getElementById('markdown-side')
    mds.addEventListener('input', editing)

    let btnSC = document.getElementById('save-changes')
    btnSC.onclick = saveChanges
}

function loadView() {
    let subPath = location.pathname == '/stagit/edit' ? '/stagit' : '' 
    fetch(location.origin + subPath + '/posts/' + '20201128.md')
    .then(response => response.text())
    .then(text => {
        document.getElementById('markdown-side').value = text
        document.getElementById('html-side').innerHTML = marked(text)
    })
    .catch(err => console.log('Error: ', err))
}

function editing(args) {
    let md = document.getElementById('markdown-side')
    let html = document.getElementById('html-side')
    html.innerHTML = marked(md.value)
}

function saveChanges() {
    let md = document.getElementById('markdown-side')
    console.log(md.value)
}

