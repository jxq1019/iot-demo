const WebSocket = require('ws');

// 连接服务端WebSocket
const ws = new WebSocket('ws://localhost:3000');

// 连接成功后，定时发送模拟传感器数据
ws.on('open', () => {
    console.log('已连接到服务端，开始发送模拟传感器数据...');
    
    // 每2秒发送一次数据
    setInterval(() => {
        // 仅生成温度、湿度数据，移除timestamp
        const sensorData = {
            temperature: (20 + Math.random() * 10).toFixed(2),
            humidity: (40 + Math.random() * 20).toFixed(2)
        };

        // 发送数据到服务端
        ws.send(JSON.stringify(sensorData));
    }, 2000);
});

// 连接错误处理
ws.on('error', (error) => {
    console.error('连接服务端失败：', error);
    console.log('请确保服务端已启动（node server.js）');
});

// 连接关闭处理
ws.on('close', () => {
    console.log('与服务端的连接已关闭');
});