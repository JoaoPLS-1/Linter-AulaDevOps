const { mkdirSync, copyFileSync } = require('node:fs');

mkdirSync('dist', { recursive: true });
copyFileSync('index.html', 'dist/index.html');
console.log('Build concluido: dist/index.html');