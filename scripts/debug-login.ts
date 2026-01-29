
import fetch from 'node-fetch';

async function main() {
    console.log("Testing Login...");
    try {
        const res = await fetch('http://localhost:5000/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: 'k6_user_0', password: 'TestPass123!' })
        });

        console.log(`Status: ${res.status}`);
        const text = await res.text();
        console.log(`Body: ${text}`);
    } catch (e) {
        console.error(e);
    }
}

main();
