import http from 'https://unpkg.com/isomorphic-git/http/web/index.js'

window.fs = new LightningFS('fs')
window.dir = '/tutorial'

fs.mkdir(dir, console.log);

fs.readdir(dir, (...args) => console.log('After mkdir', args));

git.clone({
fs,
http,
dir,
corsProxy: 'https://cors.isomorphic-git.org',
url: 'https://github.com/kshivakumar/stagit.git',
ref: 'master',
singleBranch: true,
depth: 10
});
git.log({fs, dir})
let status = git.status({fs, dir, filepath: 'README.md'})
status.then(d => console.log(d))
fs.readdir(dir, (...args) => console.log('After git.status', args));

// fs.writeFile(`${dir}/testfile.txt`, 'Hello World', 'utf8', console.log)

// git.add({fs, dir, filepath: 'testfile.txt'})

// git.status({fs, dir, filepath: 'testfile.txt'}).then(s => console.log(s))
console.log('Trying to commit')
let sha = git.commit({
    fs,
    dir,
    message: 'Add testfile.txt',
    author: {
      name: 'kshivakumar',
      email: 'kshivakumar@outlook.com'
    }
  }, console.log)
  console.log('asasf')
  console.log(Object.keys(sha))
  
console.log('Committing')
  git.push({
    http,
    fs,
    dir,
    onAuth: () => ({
      username: 'kshivakumar', 
      password: 'password/token', // can be taken as input from the user
    }),
  })