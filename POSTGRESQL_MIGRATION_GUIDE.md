# 🗄️ PostgreSQL Migration Guide

**Status:** Ready to implement  
**Time:** 2 hours  
**Benefit:** Production-ready, scalable database

---

## 🎯 Why Migrate to PostgreSQL?

### Current (SQLite):
- ❌ File-based (not cloud-friendly)
- ❌ Single-user only
- ❌ Limited scalability
- ❌ No cloud deployment
- ❌ Manual backups

### After (PostgreSQL):
- ✅ Cloud-based
- ✅ Multi-user support
- ✅ Highly scalable
- ✅ Easy deployment
- ✅ Automatic backups
- ✅ Better performance

---

## 📋 Step-by-Step Migration

### Step 1: Create Supabase Project (5 minutes)

1. Go to [supabase.com](https://supabase.com)
2. Sign up / Log in
3. Click "New Project"
4. Fill in:
   - **Name:** preet-english
   - **Database Password:** (save this!)
   - **Region:** Choose closest to India
5. Wait for project to be created (~2 minutes)

### Step 2: Get Connection String (2 minutes)

1. In Supabase dashboard, go to **Settings** → **Database**
2. Find **Connection string** section
3. Copy the **URI** format:
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres
   ```
4. Replace `[YOUR-PASSWORD]` with your actual password

### Step 3: Update Environment Variables (1 minute)

Update `.env` file:
```bash
# Old (SQLite)
# DATABASE_URL="file:./preet_english.db"

# New (PostgreSQL)
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres"
```

### Step 4: Install PostgreSQL Driver (2 minutes)

```bash
npm install postgres
npm install -D @types/postgres
```

### Step 5: Update Drizzle Config (5 minutes)

Update `drizzle.config.ts`:

```typescript
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './shared/schema.ts',
  out: './drizzle',
  dialect: 'postgresql', // Changed from 'sqlite'
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
```

### Step 6: Update Database Connection (10 minutes)

Update `server/db.ts`:

```typescript
// Old (SQLite)
// import Database from 'better-sqlite3';
// import { drizzle } from 'drizzle-orm/better-sqlite3';
// const sqlite = new Database(process.env.DATABASE_URL || 'preet_english.db');
// export const db = drizzle(sqlite);

// New (PostgreSQL)
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

const connectionString = process.env.DATABASE_URL!;
const client = postgres(connectionString);
export const db = drizzle(client);
```

### Step 7: Update Schema for PostgreSQL (15 minutes)

Update `shared/schema.ts`:

```typescript
// Change imports
import { pgTable, text, integer, serial, timestamp, boolean } from 'drizzle-orm/pg-core';

// Update table definitions
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  isAdmin: boolean("is_admin").default(false),
});

export const lessons = pgTable("lessons", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description").notNull(),
  content: text("content").notNull(),
  difficulty: text("difficulty").notNull(),
  order: integer("order").notNull(),
  imageUrl: text("image_url"),
  emojiTheme: text("emoji_theme"),
  hindiTitle: text("hindi_title"),
  hindiDescription: text("hindi_description"),
  category: text("category").notNull().default("General"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Update all other tables similarly...
```

### Step 8: Push Schema to PostgreSQL (5 minutes)

```bash
npm run db:push
```

This will create all tables in your PostgreSQL database.

### Step 9: Migrate Data (Optional - 30 minutes)

If you want to keep existing data:

```bash
# Export from SQLite
sqlite3 preet_english.db .dump > backup.sql

# Convert to PostgreSQL format (manual or use tool)
# Import to PostgreSQL using Supabase SQL Editor
```

Or start fresh:
```bash
npm run migrate:complete
```

### Step 10: Test Everything (20 minutes)

```bash
# Start dev server
npm run dev

# Test:
1. ✅ Lessons load
2. ✅ Vocabulary displays
3. ✅ Progress saves
4. ✅ Search works
5. ✅ Audio plays
6. ✅ Quizzes work
```

---

## 🔧 Troubleshooting

### Error: "Connection refused"
- Check DATABASE_URL is correct
- Verify Supabase project is running
- Check firewall/network settings

### Error: "SSL required"
- Add `?sslmode=require` to connection string
- Or use Supabase's connection pooler

### Error: "Too many connections"
- Use connection pooling
- Upgrade Supabase plan if needed

---

## 📊 Comparison

| Feature | SQLite | PostgreSQL |
|---------|--------|------------|
| **Deployment** | ❌ Local file | ✅ Cloud |
| **Multi-user** | ❌ No | ✅ Yes |
| **Scalability** | ❌ Limited | ✅ Unlimited |
| **Backups** | ❌ Manual | ✅ Automatic |
| **Performance** | ⚠️ Good | ✅ Excellent |
| **Cost** | ✅ Free | ✅ Free (Supabase) |

---

## 🎯 After Migration

### Benefits:
1. ✅ Deploy to Vercel/Netlify
2. ✅ Multiple users simultaneously
3. ✅ Automatic backups
4. ✅ Better performance
5. ✅ Production-ready
6. ✅ Scalable to 1000s of users

### Supabase Free Tier:
- 500MB database
- 2GB bandwidth
- 50,000 monthly active users
- Automatic backups
- **Perfect for your app!**

---

## 🚀 Quick Migration Script

Create `scripts/migrate-to-postgres.ts`:

```typescript
import { db as sqliteDb } from './server/db-sqlite';
import { db as postgresDb } from './server/db';
import * as schema from './shared/schema';

async function migrate() {
  console.log('Starting migration...');
  
  // Migrate lessons
  const lessons = await sqliteDb.select().from(schema.lessons);
  await postgresDb.insert(schema.lessons).values(lessons);
  console.log(`Migrated ${lessons.length} lessons`);
  
  // Migrate vocabulary
  const vocab = await sqliteDb.select().from(schema.vocabulary);
  await postgresDb.insert(schema.vocabulary).values(vocab);
  console.log(`Migrated ${vocab.length} vocabulary items`);
  
  // Migrate users
  const users = await sqliteDb.select().from(schema.users);
  await postgresDb.insert(schema.users).values(users);
  console.log(`Migrated ${users.length} users`);
  
  console.log('Migration complete!');
}

migrate().catch(console.error);
```

Run:
```bash
tsx scripts/migrate-to-postgres.ts
```

---

## ✅ Migration Checklist

- [ ] Create Supabase project
- [ ] Get connection string
- [ ] Update .env file
- [ ] Install postgres package
- [ ] Update drizzle.config.ts
- [ ] Update server/db.ts
- [ ] Update shared/schema.ts
- [ ] Run db:push
- [ ] Migrate data (optional)
- [ ] Test all features
- [ ] Update README
- [ ] Deploy to production

---

## 🎉 Success!

After migration, your app will be:
- ✅ Production-ready
- ✅ Scalable
- ✅ Cloud-based
- ✅ Multi-user capable
- ✅ Automatically backed up

**Time invested:** 2 hours  
**Value gained:** Production-ready database forever!

---

*Ready to migrate? Follow the steps above and your app will be production-ready!* 🚀
