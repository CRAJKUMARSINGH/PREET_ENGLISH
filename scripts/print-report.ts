import fs from 'fs';
import path from 'path';

const report = fs.readFileSync(path.join(process.cwd(), 'mission_report.txt'), 'utf16le');
const lines = report.split('\n');
const summary = lines.slice(-25).join('\n');
console.log(summary);
