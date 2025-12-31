import { Award, Download, Share2 } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';

interface CertificateProps {
  userName: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  lessonsCompleted: number;
  completionDate: string;
}

export function CertificateGenerator({
  userName,
  level,
  lessonsCompleted,
  completionDate,
}: CertificateProps) {
  const handleDownload = () => {
    // Create certificate canvas
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 800;
    const ctx = canvas.getContext('2d')!;

    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, 1200, 800);
    gradient.addColorStop(0, '#4F46E5');
    gradient.addColorStop(1, '#7C3AED');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1200, 800);

    // Border
    ctx.strokeStyle = '#FFD700';
    ctx.lineWidth = 20;
    ctx.strokeRect(40, 40, 1120, 720);

    // Title
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 60px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Certificate of Completion', 600, 150);

    // Subtitle
    ctx.font = '30px Arial';
    ctx.fillText('Preet English - English Learning Platform', 600, 200);

    // Awarded to
    ctx.font = '24px Arial';
    ctx.fillText('This certificate is proudly awarded to', 600, 280);

    // User name
    ctx.font = 'bold 48px Arial';
    ctx.fillText(userName, 600, 350);

    // Achievement text
    ctx.font = '24px Arial';
    ctx.fillText(`For successfully completing ${lessonsCompleted} lessons`, 600, 420);
    ctx.fillText(`at ${level} level`, 600, 460);

    // Date
    ctx.font = '20px Arial';
    ctx.fillText(`Completed on: ${completionDate}`, 600, 540);

    // Signature
    ctx.font = 'italic 18px Arial';
    ctx.fillText('Prepared on initiative of Mrs. Premlata Jain', 600, 620);
    ctx.fillText('AAO, PWD Udaipur', 600, 650);

    // Award icon (emoji)
    ctx.font = '80px Arial';
    ctx.fillText('🏆', 600, 730);

    // Download
    canvas.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `preet-english-certificate-${level.toLowerCase()}.png`;
        a.click();
        URL.revokeObjectURL(url);
      }
    });
  };

  const handleShare = async () => {
    const text = `🎉 I just completed ${lessonsCompleted} lessons at ${level} level on Preet English! 🏆\n\nLearn English with Hindi support at: ${window.location.origin}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Preet English Achievement',
          text,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      await navigator.clipboard.writeText(text);
      alert('Achievement copied to clipboard!');
    }
  };

  return (
    <Card className="border-2 border-primary">
      <CardContent className="p-6">
        <div className="text-center space-y-4">
          <div className="inline-block p-4 bg-primary/10 rounded-full">
            <Award className="h-12 w-12 text-primary" />
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-2">Congratulations! 🎉</h3>
            <p className="text-muted-foreground">
              You've completed {lessonsCompleted} lessons at {level} level!
            </p>
          </div>

          <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-4 rounded-lg">
            <p className="text-sm font-medium">
              Download your certificate and share your achievement!
            </p>
          </div>

          <div className="flex gap-3">
            <Button onClick={handleDownload} className="flex-1">
              <Download className="h-4 w-4 mr-2" />
              Download Certificate
            </Button>
            <Button onClick={handleShare} variant="outline" className="flex-1">
              <Share2 className="h-4 w-4 mr-2" />
              Share Achievement
            </Button>
          </div>

          <p className="text-xs text-muted-foreground">
            Keep learning to unlock more certificates! 📚
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
