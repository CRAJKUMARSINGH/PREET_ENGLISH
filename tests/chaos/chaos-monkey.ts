/**
 * CHAOS MONKEY 🐒
 * Introduces randomness and failure into the system to test resilience.
 */

export interface ChaosConfig {
    enableRestarts: boolean;
    restartIntervalMin: number; // ms
    restartIntervalMax: number; // ms
}

export class ChaosMonkey {
    private config: ChaosConfig;
    private restartCallback: () => Promise<void>;
    private running: boolean = false;
    private timer: NodeJS.Timeout | null = null;

    constructor(config: ChaosConfig, onRestart: () => Promise<void>) {
        this.config = config;
        this.restartCallback = onRestart;
    }

    /**
     * Start the chaos!
     */
    start() {
        if (!this.config.enableRestarts) {
            console.log('[CHAOS MONKEY] 😴 Sleeping (Chaos disabled)');
            return;
        }
        this.running = true;
        console.log('[CHAOS MONKEY] 🍌 Waking up...');
        this.scheduleNextChaos();
    }

    /**
     * Stop the chaos.
     */
    stop() {
        this.running = false;
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }
        console.log('[CHAOS MONKEY] 🛑 Stopped');
    }

    private scheduleNextChaos() {
        if (!this.running) return;

        const delay = Math.floor(Math.random() * (this.config.restartIntervalMax - this.config.restartIntervalMin + 1)) + this.config.restartIntervalMin;
        console.log(`[CHAOS MONKEY] 🙈 Planning mischief in ${(delay / 1000).toFixed(1)}s...`);

        this.timer = setTimeout(async () => {
            if (this.running) {
                await this.triggerChaos();
                this.scheduleNextChaos();
            }
        }, delay);
    }

    private async triggerChaos() {
        console.log(`\n[CHAOS MONKEY] 🐒 SCREECH! PULLING THE PLUG! (Restarting server)`);
        try {
            await this.restartCallback();
            console.log(`[CHAOS MONKEY] 😇 Server restarted. Carry on.\n`);
        } catch (error) {
            console.error('[CHAOS MONKEY] 💥 Checks failed to restart server:', error);
        }
    }
}
