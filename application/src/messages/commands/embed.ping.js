const os = require('os');

module.exports = {
    type: 'info',
    title: 'Ping Command',
    description: 'Server Information',
    fields: [
        { name: 'Server Name', value: os.hostname(), inline: true },
        { name: 'Total Memory', value: `${(os.totalmem() / (1024 ** 3)).toFixed(2)} GB`, inline: true },
        { name: 'Free Memory', value: `${(os.freemem() / (1024 ** 3)).toFixed(2)} GB`, inline: true },
        { name: 'CPU Cores', value: os.cpus().length.toString(), inline: true },
        { name: 'CPU Model', value: os.cpus()[0].model, inline: true },
        { name: 'Uptime', value: `${(os.uptime() / 3600).toFixed(2)} hours`, inline: true }
    ],
    footer: { text: 'Ping Command Footer' },
    color: '#3498db',
    url: '',
    timestamp: new Date(),
    thumbnail: 'https://example.com/thumbnail.png',
    image: '',
    author: { name: 'Bot Name', iconURL: 'https://example.com/author.png' }
};