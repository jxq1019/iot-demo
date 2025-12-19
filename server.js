// 引入原生WebSocket模块和HTTP模块
const WebSocket = require('ws');
const http = require('http');
const fs = require('fs');
const path = require('path');

// 创建HTTP服务器，用于提供网页访问
const httpServer = http.createServer((req, res) => {
    if (req.url === '/') {
        const htmlPath = path.join(__dirname, 'index.html');
        fs.readFile(htmlPath, (err, data) => {
            if (err) throw err;
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(data);
        });
    }
});

// 创建WebSocket服务器，绑定到HTTP服务器
const wss = new WebSocket.Server({ server: httpServer });
// 监听客户端连接
wss.on('connection', (ws) => {
    console.log('有客户端连接成功');
    // 接收发布者发送的数据，并广播给所有网页端客户端
    ws.on('message', (data) => {
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(data);
            }
        });
    });
});

// 启动服务，监听3000端口
const port = 3000;
httpServer.listen(port, () => {
    console.log(`服务启动成功，访问 http://localhost:${port} 查看数据`);
});