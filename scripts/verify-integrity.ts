const API = 'http://localhost:5000/api';

async function verify() {
    console.log('🧪 Starting Programmatic Verification...');

    const endpoints = [
        '/lessons',
        '/stories',
        '/scenarios',
        '/speaking-topics',
        '/listenings',
        '/activity-feed'
    ];

    for (const ep of endpoints) {
        try {
            const res = await fetch(`${API}${ep}`);
            const data = await res.json();
            console.log(`✅ ${ep}: ${data.length} items found.`);
            if (data.length === 0) {
                console.warn(`⚠️ Warning: ${ep} is empty!`);
            }
        } catch (err: any) {
            console.error(`❌ ${ep} failed: ${err.message}`);
        }
    }

    // Check specific IDs
    try {
        const storiesRes = await fetch(`${API}/stories`);
        const stories = await storiesRes.json();
        if (stories.length > 0) {
            const sid = stories[0].id;
            const sRes = await fetch(`${API}/stories/${sid}`);
            const s = await sRes.json();
            console.log(`✅ Story detail accessible for ID ${sid}`);
            if (!s.content && !s.paragraphs) {
                console.error(`❌ Story ${sid} is missing content or paragraphs!`);
            }
        }
    } catch (err: any) {
        console.error(`❌ Detailed check failed: ${err.message}`);
    }

    console.log('🧪 Verification complete.');
}

// Note: This script assumes the server is running.
// If the server isn't running, we might need a different approach.
// But as an agent, I can start the server in the background.
verify();
