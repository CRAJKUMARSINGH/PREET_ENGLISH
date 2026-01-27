import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Network, ArrowUpDown, Lightbulb, GraduationCap, Target, Award, Sparkles } from "lucide-react";
import { LegacyVocabularyBuilder } from "@/components/HindiVocabulary/LegacyVocabularyBuilder";
import { VocabularyBuilder } from "@/components/HindiVocabulary/VocabularyBuilder";
import { WordAssociation } from "@/components/HindiVocabulary/WordAssociation";
import { SynonymAntonym } from "@/components/HindiVocabulary/SynonymAntonym";
import { ContextClues } from "@/components/HindiVocabulary/ContextClues";
export default function HindiVocabulary() {
    var _a, _b;
    var _c = useState("builder"), activeTab = _c[0], setActiveTab = _c[1];
    var features = [
        {
            id: "daily",
            title: "दैनिक शब्द",
            titleEn: "Daily Words",
            icon: Sparkles,
            color: "pink",
            description: "रोज़मर्रा के शब्द श्रेणियों में सीखें"
        },
        {
            id: "builder",
            title: "शब्द भंडार",
            titleEn: "Vocabulary Builder",
            icon: BookOpen,
            color: "indigo",
            description: "नए शब्द सीखें और याद करें"
        },
        {
            id: "association",
            title: "शब्द संबंध",
            titleEn: "Word Association",
            icon: Network,
            color: "cyan",
            description: "शब्दों के बीच संबंध समझें"
        },
        {
            id: "synonyms",
            title: "समानार्थी/विपरीतार्थी",
            titleEn: "Synonyms & Antonyms",
            icon: ArrowUpDown,
            color: "purple",
            description: "समान और विपरीत अर्थ वाले शब्द"
        },
        {
            id: "context",
            title: "संदर्भ सुराग",
            titleEn: "Context Clues",
            icon: Lightbulb,
            color: "amber",
            description: "वाक्य से अर्थ समझें"
        }
    ];
    return (<div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-purple-900/10 dark:to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg">
              <GraduationCap className="h-8 w-8 text-white"/>
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                शब्द भंडार और शब्द संबंध
              </h1>
              <p className="text-lg text-muted-foreground">
                Hindi Vocabulary Builder & Word Association
              </p>
            </div>
          </div>

          <p className="text-muted-foreground max-w-2xl mx-auto">
            अंग्रेजी शब्दावली को हिंदी के माध्यम से सीखें। समानार्थी, विपरीतार्थी,
            शब्द संबंध और संदर्भ सुराग के साथ अपनी शब्दावली बढ़ाएं।
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="border-indigo-200 dark:border-indigo-800">
            <CardContent className="p-4 text-center">
              <Target className="h-8 w-8 mx-auto mb-2 text-indigo-600"/>
              <div className="text-2xl font-bold text-indigo-700 dark:text-indigo-300">50+</div>
              <div className="text-sm text-muted-foreground">शब्द</div>
            </CardContent>
          </Card>
          <Card className="border-cyan-200 dark:border-cyan-800">
            <CardContent className="p-4 text-center">
              <Network className="h-8 w-8 mx-auto mb-2 text-cyan-600"/>
              <div className="text-2xl font-bold text-cyan-700 dark:text-cyan-300">6</div>
              <div className="text-sm text-muted-foreground">शब्द समूह</div>
            </CardContent>
          </Card>
          <Card className="border-purple-200 dark:border-purple-800">
            <CardContent className="p-4 text-center">
              <ArrowUpDown className="h-8 w-8 mx-auto mb-2 text-purple-600"/>
              <div className="text-2xl font-bold text-purple-700 dark:text-purple-300">100+</div>
              <div className="text-sm text-muted-foreground">समानार्थी/विपरीतार्थी</div>
            </CardContent>
          </Card>
          <Card className="border-amber-200 dark:border-amber-800">
            <CardContent className="p-4 text-center">
              <Award className="h-8 w-8 mx-auto mb-2 text-amber-600"/>
              <div className="text-2xl font-bold text-amber-700 dark:text-amber-300">3</div>
              <div className="text-sm text-muted-foreground">कठिनाई स्तर</div>
            </CardContent>
          </Card>
        </div>

        {/* Feature Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2 h-auto p-2 bg-white/50 dark:bg-slate-800/50 backdrop-blur">
            {features.map(function (feature) {
            var Icon = feature.icon;
            return (<TabsTrigger key={feature.id} value={feature.id} className={"flex flex-col items-center gap-1 p-3 data-[state=active]:bg-".concat(feature.color, "-100 dark:data-[state=active]:bg-").concat(feature.color, "-900/30")}>
                  <Icon className="h-5 w-5"/>
                  <span className="text-xs font-medium">{feature.title}</span>
                </TabsTrigger>);
        })}
          </TabsList>

          {/* Feature Description */}
          <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur border-0 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Sparkles className="h-5 w-5 text-yellow-500"/>
                <div>
                  <span className="font-bold">
                    {(_a = features.find(function (f) { return f.id === activeTab; })) === null || _a === void 0 ? void 0 : _a.title}
                  </span>
                  <span className="text-muted-foreground ml-2">
                    - {(_b = features.find(function (f) { return f.id === activeTab; })) === null || _b === void 0 ? void 0 : _b.description}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tab Contents */}
          <TabsContent value="daily" className="mt-0">
            <LegacyVocabularyBuilder />
          </TabsContent>

          <TabsContent value="builder" className="mt-0">
            <VocabularyBuilder />
          </TabsContent>

          <TabsContent value="association" className="mt-0">
            <WordAssociation />
          </TabsContent>

          <TabsContent value="synonyms" className="mt-0">
            <SynonymAntonym />
          </TabsContent>

          <TabsContent value="context" className="mt-0">
            <ContextClues />
          </TabsContent>
        </Tabs>

        {/* Learning Tips */}
        <Card className="mt-8 border-2 border-green-200 dark:border-green-800">
          <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
            <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-300">
              <Lightbulb className="h-5 w-5"/>
              शब्दावली सीखने के टिप्स
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <Badge className="bg-green-500 mt-1">1</Badge>
                <div>
                  <p className="font-medium">रोज़ाना अभ्यास करें</p>
                  <p className="text-sm text-muted-foreground">
                    हर दिन 10-15 नए शब्द सीखें और पुराने शब्दों को दोहराएं।
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Badge className="bg-green-500 mt-1">2</Badge>
                <div>
                  <p className="font-medium">वाक्यों में प्रयोग करें</p>
                  <p className="text-sm text-muted-foreground">
                    नए शब्दों को वाक्यों में इस्तेमाल करके याद करें।
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Badge className="bg-green-500 mt-1">3</Badge>
                <div>
                  <p className="font-medium">समानार्थी सीखें</p>
                  <p className="text-sm text-muted-foreground">
                    एक शब्द के साथ उसके समानार्थी भी याद करें।
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Badge className="bg-green-500 mt-1">4</Badge>
                <div>
                  <p className="font-medium">संदर्भ से सीखें</p>
                  <p className="text-sm text-muted-foreground">
                    वाक्य के संदर्भ से शब्द का अर्थ समझने की कोशिश करें।
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>);
}
