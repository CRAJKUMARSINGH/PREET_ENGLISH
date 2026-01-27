import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

/**
 * Database backup system for Preet English
 * Creates timestamped backups of the SQLite database
 */
export class DatabaseBackup {
  private backupDir: string;
  private dbPath: string;

  constructor() {
    this.backupDir = path.join(process.cwd(), 'backups');
    this.dbPath = process.env.DATABASE_URL?.replace('file:', '') || './preet_english.db';
    
    // Create backup directory if it doesn't exist
    if (!fs.existsSync(this.backupDir)) {
      fs.mkdirSync(this.backupDir, { recursive: true });
    }
  }

  /**
   * Create a timestamped backup of the database
   */
  async createBackup(): Promise<string> {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupFileName = `preet_english_backup_${timestamp}.db`;
    const backupPath = path.join(this.backupDir, backupFileName);

    // Copy the database file
    fs.copyFileSync(this.dbPath, backupPath);
    
    console.log(`✅ Database backup created: ${backupPath}`);
    return backupPath;
  }

  /**
   * Restore database from backup
   */
  async restoreFromBackup(backupPath: string): Promise<void> {
    if (!fs.existsSync(backupPath)) {
      throw new Error(`Backup file does not exist: ${backupPath}`);
    }

    fs.copyFileSync(backupPath, this.dbPath);
    console.log(`✅ Database restored from: ${backupPath}`);
  }

  /**
   * List all available backups
   */
  listBackups(): string[] {
    const files = fs.readdirSync(this.backupDir);
    return files
      .filter(file => file.startsWith('preet_english_backup_') && file.endsWith('.db'))
      .sort()
      .map(file => path.join(this.backupDir, file));
  }

  /**
   * Clean old backups (keep only last 10)
   */
  cleanOldBackups(keepCount: number = 10): void {
    const backups = this.listBackups();
    if (backups.length <= keepCount) {
      return;
    }

    const backupsToDelete = backups.slice(0, backups.length - keepCount);
    for (const backupPath of backupsToDelete) {
      fs.unlinkSync(backupPath);
      console.log(`🗑️  Deleted old backup: ${backupPath}`);
    }
  }
}

/**
 * Configuration management system
 */
export class ConfigManager {
  private configPath: string;
  private config: Record<string, any>;

  constructor(configPath: string = './config.json') {
    this.configPath = configPath;
    this.config = this.loadConfig();
  }

  private loadConfig(): Record<string, any> {
    if (fs.existsSync(this.configPath)) {
      const content = fs.readFileSync(this.configPath, 'utf8');
      return JSON.parse(content);
    }
    
    // Default configuration
    return {
      database: {
        url: process.env.DATABASE_URL || './preet_english.db',
        backup: {
          enabled: true,
          interval: 86400000, // 24 hours in ms
          keepCount: 10
        }
      },
      content: {
        generation: {
          batchSize: 50,
          maxRetries: 3,
          dryRun: false
        },
        validation: {
          qualityThreshold: 0.8,
          enableAuditing: true
        }
      },
      llm: {
        provider: 'openai', // or 'anthropic', 'custom'
        maxTokens: 2048,
        temperature: 0.7
      }
    };
  }

  saveConfig(): void {
    fs.writeFileSync(this.configPath, JSON.stringify(this.config, null, 2));
  }

  get<T>(key: string): T | undefined {
    return this.getNestedValue(this.config, key);
  }

  set(key: string, value: any): void {
    this.setNestedValue(this.config, key, value);
    this.saveConfig();
  }

  getFullConfig(): Record<string, any> {
    return this.config;
  }

  private getNestedValue(obj: Record<string, any>, path: string): any {
    return path.split('.').reduce((current, part) => current?.[part], obj);
  }

  private setNestedValue(obj: Record<string, any>, path: string, value: any): void {
    const parts = path.split('.');
    const lastKey = parts.pop()!;
    const target = parts.reduce((current, part) => {
      if (!current[part]) current[part] = {};
      return current[part];
    }, obj);
    target[lastKey] = value;
  }
}

// CLI interface
async function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  switch (command) {
    case 'backup':
      const dbBackup = new DatabaseBackup();
      await dbBackup.createBackup();
      dbBackup.cleanOldBackups();
      break;

    case 'list':
      const listBackup = new DatabaseBackup();
      const backups = listBackup.listBackups();
      console.log('Available backups:');
      backups.forEach(backup => console.log(`  - ${backup}`));
      break;

    case 'config':
      const configManager = new ConfigManager();
      console.log('Current configuration:');
      console.log(JSON.stringify(configManager.getFullConfig(), null, 2));
      break;

    default:
      console.log('Usage:');
      console.log('  npm run backup:db    - Create a database backup');
      console.log('  npm run backup:list  - List all backups');
      console.log('  npm run config       - Show current configuration');
      console.log('');
      console.log('Or run directly:');
      console.log('  tsx scripts/backup-db.ts backup');
      console.log('  tsx scripts/backup-db.ts list');
      console.log('  tsx scripts/backup-db.ts config');
  }
}

if (require.main === module) {
  main().catch(console.error);
}