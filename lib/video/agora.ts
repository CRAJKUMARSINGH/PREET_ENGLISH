// Week 11: Agora Video Conferencing
import { RtcTokenBuilder, RtcRole } from 'agora-access-token';

const APP_ID = process.env.AGORA_APP_ID || '';
const APP_CERTIFICATE = process.env.AGORA_APP_CERTIFICATE || '';

export class VideoConferencing {
  generateToken(channelName: string, uid: number, role: 'publisher' | 'subscriber'): string {
    const expirationTimeInSeconds = 3600;
    const currentTimestamp = Math.floor(Date.now() / 1000);
    const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;

    const agoraRole = role === 'publisher' ? RtcRole.PUBLISHER : RtcRole.SUBSCRIBER;

    return RtcTokenBuilder.buildTokenWithUid(
      APP_ID,
      APP_CERTIFICATE,
      channelName,
      uid,
      agoraRole,
      privilegeExpiredTs
    );
  }

  async createLiveClass(tutorId: string, studentIds: string[]): Promise<any> {
    const channelName = `class_${Date.now()}`;
    const tutorToken = this.generateToken(channelName, parseInt(tutorId), 'publisher');
    const studentTokens = studentIds.map((id, index) => ({
      userId: id,
      token: this.generateToken(channelName, 1000 + index, 'subscriber'),
    }));

    return {
      channelName,
      tutorToken,
      studentTokens,
      appId: APP_ID,
    };
  }
}
