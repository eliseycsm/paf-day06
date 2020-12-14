module.exports = [
    {
        //context is any rss that starts with this prefix 
        //ie set the url calls that u want to proxy to (you dun want a giphy call to go to server)
        context: ['/'],  
        target: 'http://localhost:3000',
        secure: false, // cos we are not using https - s for the secure
        logLevel: 'debug'
    }
]