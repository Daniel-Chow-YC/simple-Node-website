const http = require('http');
const url = require('url');
const fs = require('fs');
const PORT = process.env.PORT || 8080;


const server = http.createServer(function(req, res) {
    let reqURL = url.parse(req.url, true);
    let filename = `.${reqURL.path}.html`;

    if (reqURL.path == '/') {
        fs.readFile('index.html', (err, data) => {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data)
            return res.end()
        }) 
    }

    else {
        fs.readFile(filename, function(err, data) {

            if (err) {
                fs.readFile('404.html', (err, data) => {
                    res.writeHead(200, {'Content-Type': 'text/html'});
                    res.write(data)
                    return res.end();
                });
            }

            else { 
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(data);
                return res.end();
            }

        })
    }

})


server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));