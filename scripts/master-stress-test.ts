
import { spawn } from "child_process";
import path from "path";


function runScript(scriptName: string): Promise<void> {
    return new Promise((resolve, reject) => {
        // Use relative path from project root
        const scriptPath = `scripts/${scriptName}`;
        console.log(`\n▶️ Executing: ${scriptName}`);

        const child = spawn("npx", ["tsx", scriptPath], {
            stdio: "inherit",
            shell: true,
            cwd: process.cwd() // Ensure running from project root
        });

        child.on("close", (code) => {
            if (code === 0) resolve();
            else reject(new Error(`Script ${scriptName} failed with code ${code}`));
        });
    });
}

function runScriptAsync(scriptName: string): void {
    const scriptPath = `scripts/${scriptName}`;
    console.log(`\n▶️ Spawning Async: ${scriptName}`);
    spawn("npx", ["tsx", scriptPath], {
        stdio: "inherit",
        shell: true,
        cwd: process.cwd()
    });
}


async function masterStressTest() {
    console.log("🔥 STARTING MASTER STRESS TEST PROTOCOL 🔥");
    console.log("==================================================");

    try {
        // 1. Create Users (Foundational Step)
        await runScript("create-massive-users.ts");

        // 2. Run Bigul2 Beginner Simulation
        console.log("\n🚀 Launching Phase 1: 1000 Beginner Users (Bigul2)...");
        // User wants "simultaneously", but then says "after 15 seconds run robotically as bigul".
        // This implies Bigul2 runs, and 15 seconds LATER Bigul starts. 
        // If Bigul2 is meant to finish first, user would say "then". 
        // "Simultaneously" probably means the users IN bigul2 run simultaneously.
        // Or Bigul2 and Bigul run overlaps? "after 15 seconds >>> run robotically... simultaneous cache deletion"

        // I will trigger Bigul2, wait 15s (without waiting for Bigul2 to finish), then trigger Bigul.

        runScriptAsync("simulate-bigul2-beginner.ts");

        console.log("⏳ Waiting 15 seconds before launching Phase 2...");
        await new Promise(resolve => setTimeout(resolve, 15000));

        // 3. Run Bigul Advanced Simulation
        console.log("\n🚀 Launching Phase 2: 15000 Advanced Users (Bigul) + Cache Deletion...");
        // This one I'll await to know when the whole test is done, assuming Bigul2 finishes around same time or earlier (1000 vs 15000 users).
        await runScript("simulate-bigul-advanced.ts");

        console.log("\n✅ MASTER STRESS TEST COMPLETED.");
    } catch (error) {
        console.error("❌ Master Test Failed:", error);
    }
}

masterStressTest().catch(console.error);
