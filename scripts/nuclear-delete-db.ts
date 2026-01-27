
import fs from 'fs';
import path from 'path';

const dbPath = path.resolve(process.cwd(), 'sqlite.db');
console.log(`Current Working Directory: ${process.cwd()}`);
console.log(`Checking path: ${dbPath}`);
if (fs.existsSync(dbPath)) {
    console.log(`Deleting ${dbPath}...`);
    fs.unlinkSync(dbPath);
    console.log('✅ Deleted.');
} else {
    console.log('File not found at root.');
    // Try to find it
    const files = fs.readdirSync(process.cwd());
    console.log(`Files in root: ${files.join(', ')}`);
}
