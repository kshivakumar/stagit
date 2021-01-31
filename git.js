import http from 'https://unpkg.com/isomorphic-git/http/web/index.js'


const fetchConfig = async () => fetch('./config.json').then(r => r.json()).catch(err => err)


export async function addPost(title, content, commitMessage, authorEmail) {
  let config
  try {
    config = await fetchConfig()
    console.log(config)
    const [fs, pfs, dir] = await init(config)
    
    const filePath = `posts/${title.toLowerCase().replace(' ', '_')}.md`
    pfs.writeFile(`${dir}/${filePath}`, `${content}`, 'utf8')
    await git.add({fs, dir, filepath: filePath})

    if (!commitMessage) commitMessage = `Added post '${title}'`
    await gitCommit(commitMessage, 'Shiva Kumar', authorEmail)
  
    let token = 'abcdef' // Take input from user
    await gitPush(authorEmail, token)
    
  } catch(err) {
    console.error('Something went boom!!', err)
  }
}

export function updatePost(postId, content) {
  
}

async function init(config) {
  window.fs = new LightningFS('fs', {wipe: 'clean'})
  window.pfs = window.fs.promises
  
  window.dir = '/working'
  await pfs.mkdir(dir);

  await git.clone({
    fs,
    http,
    dir,
    corsProxy: config.corsProxy,
    url: config.repo,
    ref: 'master',
    singleBranch: true,
    depth: 10
  })
  return [fs, pfs, dir]
}

async function gitCommit(message, name, email) {
  await git.commit({
    fs,
    dir,
    message,
    author: {
      name,
      email
    }
  })
}

async function gitPush(username, accessToken) {
  await git.push({
    http,
    fs,
    dir,
    onAuth: () => ({
      username,
      password: accessToken
    })
  })
}
