// Week 14: Referral System
import { prisma } from '../prisma';
import crypto from 'crypto';

export class ReferralSystem {
  generateReferralCode(userId: string): string {
    return crypto.createHash('md5').update(userId + Date.now()).digest('hex').substring(0, 8).toUpperCase();
  }

  async createReferral(userId: string): Promise<string> {
    const code = this.generateReferralCode(userId);
    
    await prisma.user.update({
      where: { id: userId },
      data: { referralCode: code },
    });
    
    return code;
  }

  async processReferral(referralCode: string, newUserId: string): Promise<void> {
    const referrer = await prisma.user.findFirst({
      where: { referralCode },
    });
    
    if (referrer) {
      // Reward referrer with 1 month free premium
      await prisma.user.update({
        where: { id: referrer.id },
        data: {
          subscriptionEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        },
      });
      
      // Track referral
      console.log(`Referral processed: ${referrer.id} referred ${newUserId}`);
    }
  }
}
