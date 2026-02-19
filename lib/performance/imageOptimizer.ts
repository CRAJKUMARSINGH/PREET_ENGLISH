// Week 4: Image Optimization
import sharp from 'sharp';

export class ImageOptimizer {
  async optimizeImage(buffer: Buffer, width?: number): Promise<Buffer> {
    let pipeline = sharp(buffer);
    
    if (width) {
      pipeline = pipeline.resize(width, null, {
        fit: 'inside',
        withoutEnlargement: true,
      });
    }
    
    return pipeline
      .webp({ quality: 80 })
      .toBuffer();
  }

  async generateResponsiveImages(buffer: Buffer): Promise<Map<number, Buffer>> {
    const widths = [320, 640, 768, 1024, 1920];
    const images = new Map<number, Buffer>();
    
    for (const width of widths) {
      const optimized = await this.optimizeImage(buffer, width);
      images.set(width, optimized);
    }
    
    return images;
  }
}
