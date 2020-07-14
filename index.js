marked.setOptions({
  headerIds: false,
  highlight: function(code, lang) {
      return hljs.highlight(lang, code).value;
    }
})

window.onload = () => {
  loadPosts()
}

const SUBPATH = location.pathname == '/stagit/' ? '/stagit' : ''

function loadPosts() {
  fetch(location.origin + SUBPATH + '/posts.json')
  .then(response => response.json())
  .then(data => {
    let posts = data
    for (post of Object.keys(posts).reverse()) {
      loadPost(post)
    }
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}

function loadPost(post) {
  let url = location.origin + SUBPATH + '/posts/' + post + '.md'

  fetch(url)
  .then(response => response.text())
  .then(text => {
    
    let main = document.getElementById("main-content")
    let to_insert = "<article>" + marked(text) + "</article>"
    main.insertAdjacentHTML(main.childNodes ? 'beforeend' : 'afterbegin', to_insert)

    let editPostButtons = document.getElementsByClassName('editPost')
    for (epb of editPostButtons) {
        epb.onclick = editContent
    }

  })
  .catch(error => {
    console.error('Error: ', error)
  })
}

function editContent(event) {
  let article = event.srcElement.parentElement
  console.log(article.id)
}

