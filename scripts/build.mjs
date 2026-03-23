import { cpSync, existsSync, mkdirSync, rmSync } from 'node:fs';

if (existsSync('dist')) rmSync('dist', { recursive: true, force: true });
mkdirSync('dist', { recursive: true });
cpSync('public', 'dist', { recursive: true, force: true });
cpSync('index.html', 'dist/index.html', { force: true });
cpSync('build', 'dist', { recursive: true, force: true });

cpSync('src/styles/index.css', 'dist/styles.css', { force: true });
