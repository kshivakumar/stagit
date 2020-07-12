let turndownService = new TurndownService({
    'headingStyle': 'atx',
    'codeBlockStyle': 'fenced',
    'fence': '```'
})

// let md = turndownService.turndown('<h1>Title</h1><p>Content is good and bad and worse.</p><ul><li>Hyderabad</li><li>Secunderabad</li></ul>')
let html = marked(' Title\nContent is good and bad and worse.\n* Hyderabad\n* Secunderabad')


