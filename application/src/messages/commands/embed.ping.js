const os = require('os');
const path = require('path');

function createProgressBar(used, total, length = 20) {
    const filledLength = Math.round((used / total) * length);
    const bar = '█'.repeat(filledLength) + '░'.repeat(length - filledLength);
    return bar;
}

const totalMemory = os.totalmem();
const freeMemory = os.freemem();
const usedMemory = totalMemory - freeMemory;
const memoryProgressBar = createProgressBar(usedMemory, totalMemory);



function formatUptime(seconds) {
    const units = [
        { label: 'year', seconds: 31536000 },
        { label: 'week', seconds: 604800 },
        { label: 'day', seconds: 86400 },
        { label: 'hour', seconds: 3600 },
        { label: 'minute', seconds: 60 },
        { label: 'second', seconds: 1 }
    ];

    for (const unit of units) {
        if (seconds >= unit.seconds) {
            const value = (seconds / unit.seconds).toFixed(2);
            return `${value} ${unit.label}${value > 1 ? 's' : ''}`;
        }
    }
    return '0 seconds';
}

const formattedUptime = formatUptime(os.uptime());



const cpuUsage = os.loadavg()[0];  // 1-minute load average
const maxCpu = os.cpus().length;   // Max CPU usage is the number of cores
const cpuProgressBar = createProgressBar(cpuUsage, maxCpu);


let serverHealth = '🟢 Healthy';
if (cpuUsage > 2.5 || usedMemory / totalMemory > 0.8) {
    serverHealth = '🔴 Critical';
} else if (cpuUsage > 1.5 || usedMemory / totalMemory > 0.6) {
    serverHealth = '🟠 Warning';
}


const totalDisk = os.totalmem();  // You could use a disk library to fetch actual disk data.
const freeDisk = os.freemem();
const usedDisk = totalDisk - freeDisk;
const diskProgressBar = createProgressBar(usedDisk, totalDisk);




module.exports = {
    type: 'info',
    title: 'Ping Command',
    description: 'Server Information',
    fields: [
        { name: 'Server Name', value: os.hostname(), inline: true },
        { name: 'Server Health', value: serverHealth, inline: true },
        { name: 'Disk Usage', value: diskProgressBar, inline: true },
        { name: 'Total Memory', value: `${(totalMemory / (1024 ** 3)).toFixed(2)} GB`, inline: true },
        { name: 'Free Memory', value: `${(freeMemory / (1024 ** 3)).toFixed(2)} GB`, inline: false },
        { name: 'Memory Usage', value: `${(usedMemory / (1024 ** 3)).toFixed(2)} GB ${memoryProgressBar} ${(totalMemory / (1024 ** 3)).toFixed(2)} GB`, inline: false },
        { name: 'CPU Usage', value: cpuProgressBar, inline: true },
        { name: 'CPU Cores', value: os.cpus().length.toString(), inline: true },
        { name: 'CPU Model', value: os.cpus()[0].model, inline: true },
        { name: 'Uptime', value: `${formattedUptime}`, inline: true },
    ],
    footer: { text: 'Ping Command Footer' },
    color: '#3498db',
    url: '',
    timestamp: new Date(),
    thumbnail: 'https://example.com/thumbnail.png',
    image: '',
    author: { name: 'Bot Name', iconURL: 'https://example.com/author.png' }
};
