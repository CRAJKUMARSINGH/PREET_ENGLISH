// Week 5: Vector Database Integration
import { Pinecone } from '@pinecone-database/pinecone';

const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY || '',
});

export class VectorDB {
  private index: any;

  async initialize() {
    this.index = pinecone.index('preet-english-lessons');
  }

  async upsertLesson(lessonId: string, embedding: number[], metadata: any) {
    await this.index.upsert([
      {
        id: lessonId,
        values: embedding,
        metadata,
      },
    ]);
  }

  async searchSimilar(embedding: number[], topK: number = 5) {
    const results = await this.index.query({
      vector: embedding,
      topK,
      includeMetadata: true,
    });
    return results.matches;
  }
}
