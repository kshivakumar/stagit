window.onload = () => {
  loadPosts()
}

function loadPosts() {
  fetch(location.origin + '/posts.json')
  .then(response => response.json())
  .then(data => {
    let posts = data
    console.log(posts)
    for (post of Object.keys(posts).reverse()) {
      loadPost(post)
    }
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}

function loadPost(post) {
  let url = location.origin + '/posts/' + post + '.html'
  console.log(url)
  fetch(url)
  .then(response => response.text())
  .then(text => {
    let main = document.getElementById("main-content")
    main.insertAdjacentHTML(main.childNodes ? 'beforeend' : 'afterbegin', text)

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

