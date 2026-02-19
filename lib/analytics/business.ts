// Week 13: Business Analytics
import { prisma } from '../prisma';

export class BusinessAnalytics {
  async calculateMRR(): Promise<number> {
    const subscriptions = await prisma.user.findMany({
      where: {
        subscriptionTier: { in: ['PREMIUM', 'PRO'] },
        subscriptionEnd: { gte: new Date() },
      },
    });
    
    const mrr = subscriptions.reduce((sum, user) => {
      const price = user.subscriptionTier === 'PREMIUM' ? 9.99 : 19.99;
      return sum + price;
    }, 0);
    
    return mrr;
  }

  async calculateChurnRate(days: number = 30): Promise<number> {
    const startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
    
    const totalUsers = await prisma.user.count({
      where: { createdAt: { lte: startDate } },
    });
    
    const churnedUsers = await prisma.user.count({
      where: {
        createdAt: { lte: startDate },
        lastLoginAt: { lte: startDate },
      },
    });
    
    return (churnedUsers / totalUsers) * 100;
  }

  async calculateLTV(): Promise<number> {
    const avgRevenue = await this.calculateMRR();
    const churnRate = await this.calculateChurnRate();
    
    return avgRevenue / (churnRate / 100);
  }
}
