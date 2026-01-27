import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  MessageCircle,
  Theater,
  MessageSquare,
  Headphones,
  Users,
  Target,
  Award,
  Sparkles
} from "lucide-react";
import { LegacyConversationPractice } from "@/components/HindiConversation/LegacyConversationPractice";
import { DialoguePractice } from "@/components/HindiConversation/DialoguePractice";
import { RolePlaySimulator } from "@/components/HindiConversation/RolePlaySimulator";
import { CommonPhrases } from "@/components/HindiConversation/CommonPhrases";
import { ListeningPractice } from "@/components/HindiConversation/ListeningPractice";

export default function HindiConversation() {
  const [activeTab, setActiveTab] = useState("dialogue");

  const features = [
    {
      id: "practice",
      title: "शुरुआती अभ्यास",
      titleEn: "Basic Practice",
      icon: Sparkles,
      color: "teal",
      description: "सरल बातचीत से शुरुआत करें"
    },
    {
      id: "dialogue",
      title: "संवाद अभ्यास",
      titleEn: "Dialogue Practice",
      icon: MessageCircle,
      color: "blue",
      description: "वास्तविक बातचीत सीखें"
    },
    {
      id: "roleplay",
      title: "भूमिका अभिनय",
      titleEn: "Role Play",
      icon: Theater,
      color: "purple",
      description: "परिस्थितियों में अभ्यास करें"
    },
    {
      id: "phrases",
      title: "आम वाक्यांश",
      titleEn: "Common Phrases",
      icon: MessageSquare,
      color: "green",
      description: "उपयोगी वाक्यांश सीखें"
    },
    {
      id: "listening",
      title: "सुनने का अभ्यास",
      titleEn: "Listening",
      icon: Headphones,
      color: "orange",
      description: "सुनकर समझें और लिखें"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-purple-900/10 dark:to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg">
              <Users className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                बातचीत अभ्यास
              </h1>
              <p className="text-lg text-muted-foreground">
                Hindi Conversation Practice & Dialogue System
              </p>
            </div>
          </div>

          <p className="text-muted-foreground max-w-2xl mx-auto">
            वास्तविक जीवन की परिस्थितियों में अंग्रेजी बोलने का अभ्यास करें।
            संवाद, भूमिका अभिनय, और सुनने के अभ्यास के माध्यम से अपनी बातचीत कौशल बढ़ाएं।
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="border-blue-200 dark:border-blue-800">
            <CardContent className="p-4 text-center">
              <MessageCircle className="h-8 w-8 mx-auto mb-2 text-blue-600" />
              <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">115+</div>
              <div className="text-sm text-muted-foreground">संवाद</div>
            </CardContent>
          </Card>
          <Card className="border-purple-200 dark:border-purple-800">
            <CardContent className="p-4 text-center">
              <Theater className="h-8 w-8 mx-auto mb-2 text-purple-600" />
              <div className="text-2xl font-bold text-purple-700 dark:text-purple-300">4</div>
              <div className="text-sm text-muted-foreground">भूमिका अभिनय</div>
            </CardContent>
          </Card>
          <Card className="border-green-200 dark:border-green-800">
            <CardContent className="p-4 text-center">
              <MessageSquare className="h-8 w-8 mx-auto mb-2 text-green-600" />
              <div className="text-2xl font-bold text-green-700 dark:text-green-300">26+</div>
              <div className="text-sm text-muted-foreground">वाक्यांश</div>
            </CardContent>
          </Card>
          <Card className="border-orange-200 dark:border-orange-800">
            <CardContent className="p-4 text-center">
              <Headphones className="h-8 w-8 mx-auto mb-2 text-orange-600" />
              <div className="text-2xl font-bold text-orange-700 dark:text-orange-300">10</div>
              <div className="text-sm text-muted-foreground">सुनने के अभ्यास</div>
            </CardContent>
          </Card>
        </div>

        {/* Feature Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2 h-auto p-2 bg-white/50 dark:bg-slate-800/50 backdrop-blur">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <TabsTrigger
                  key={feature.id}
                  value={feature.id}
                  className="flex flex-col items-center gap-1 p-3"
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-xs font-medium">{feature.title}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>

          {/* Feature Description */}
          <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur border-0 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Sparkles className="h-5 w-5 text-yellow-500" />
                <div>
                  <span className="font-bold">
                    {features.find(f => f.id === activeTab)?.title}
                  </span>
                  <span className="text-muted-foreground ml-2">
                    - {features.find(f => f.id === activeTab)?.description}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tab Contents */}
          <TabsContent value="practice" className="mt-0">
            <LegacyConversationPractice />
          </TabsContent>

          <TabsContent value="dialogue" className="mt-0">
            <DialoguePractice />
          </TabsContent>

          <TabsContent value="roleplay" className="mt-0">
            <RolePlaySimulator />
          </TabsContent>

          <TabsContent value="phrases" className="mt-0">
            <CommonPhrases />
          </TabsContent>

          <TabsContent value="listening" className="mt-0">
            <ListeningPractice />
          </TabsContent>
        </Tabs>

        {/* Learning Tips */}
        <Card className="mt-8 border-2 border-blue-200 dark:border-blue-800">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
            <CardTitle className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
              <Target className="h-5 w-5" />
              बातचीत सुधारने के टिप्स
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <Badge className="bg-blue-500 mt-1">1</Badge>
                <div>
                  <p className="font-medium">रोज़ाना अभ्यास करें</p>
                  <p className="text-sm text-muted-foreground">
                    हर दिन कम से कम 15 मिनट बातचीत का अभ्यास करें।
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Badge className="bg-blue-500 mt-1">2</Badge>
                <div>
                  <p className="font-medium">ज़ोर से बोलें</p>
                  <p className="text-sm text-muted-foreground">
                    वाक्यों को ज़ोर से बोलकर अभ्यास करें।
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Badge className="bg-blue-500 mt-1">3</Badge>
                <div>
                  <p className="font-medium">सुनने पर ध्यान दें</p>
                  <p className="text-sm text-muted-foreground">
                    अंग्रेजी सुनने से उच्चारण बेहतर होता है।
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Badge className="bg-blue-500 mt-1">4</Badge>
                <div>
                  <p className="font-medium">गलतियों से न डरें</p>
                  <p className="text-sm text-muted-foreground">
                    गलतियाँ सीखने का हिस्सा हैं, बोलते रहें।
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}