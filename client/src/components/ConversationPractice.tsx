import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageCircle, Play, Pause, Volume2 } from "lucide-react";
import { useState } from "react";

// Sample conversation data
const conversations = [
    {
        id: 1,
        title: "At the Restaurant",
        hindiTitle: "रेस्टोरेंट में",
        dialogue: [
            { speaker: "Waiter", text: "Good evening! Welcome to our restaurant.", hindi: "शुभ संध्या! हमारे रेस्टोरेंट में स्वागत है।" },
            { speaker: "Customer", text: "Good evening. A table for two, please.", hindi: "शुभ संध्या। दो के लिए एक टेबल, कृपया।" },
            { speaker: "Waiter", text: "Certainly! Please follow me.", hindi: "बिल्कुल! कृपया मेरे पीछे आइए।" },
        ],
    },
    {
        id: 2,
        title: "At the Doctor's Office",
        hindiTitle: "डॉक्टर के ऑफिस में",
        dialogue: [
            { speaker: "Receptionist", text: "Hello, do you have an appointment?", hindi: "नमस्ते, क्या आपकी अपॉइंटमेंट है?" },
            { speaker: "Patient", text: "Yes, I have an appointment at 10 AM.", hindi: "हां, मेरी सुबह 10 बजे अपॉइंटमेंट है।" },
            { speaker: "Receptionist", text: "Please have a seat. The doctor will see you shortly.", hindi: "कृपया बैठ जाइए। डॉक्टर जल्द ही आपसे मिलेंगे।" },
        ],
    },
];

export function ConversationPractice() {
    const [selectedConversation, setSelectedConversation] = useState(conversations[0]);
    const [currentLine, setCurrentLine] = useState(0);

    return (
        <div className="space-y-6">
            {/* Conversation Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {conversations.map((conv) => (
                    <Card
                        key={conv.id}
                        className={`cursor-pointer transition-all hover:shadow-lg ${selectedConversation.id === conv.id ? "border-primary ring-2 ring-primary/20" : ""
                            }`}
                        onClick={() => {
                            setSelectedConversation(conv);
                            setCurrentLine(0);
                        }}
                    >
                        <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                                <div className="bg-green-100 dark:bg-green-900 p-2 rounded-xl">
                                    <MessageCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                                </div>
                                <div>
                                    <h3 className="font-bold">{conv.title}</h3>
                                    <p className="text-sm text-muted-foreground">{conv.hindiTitle}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Active Conversation */}
            <Card className="border-2 border-green-200 dark:border-green-800">
                <CardContent className="p-6 space-y-4">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <MessageCircle className="h-5 w-5 text-green-500" />
                        {selectedConversation.title}
                        <Badge variant="secondary">{selectedConversation.hindiTitle}</Badge>
                    </h2>

                    <div className="space-y-4">
                        {selectedConversation.dialogue.map((line, index) => (
                            <div
                                key={index}
                                className={`p-4 rounded-lg transition-all ${index === currentLine
                                        ? "bg-green-50 dark:bg-green-900/30 border-2 border-green-300 dark:border-green-700"
                                        : "bg-gray-50 dark:bg-gray-800"
                                    }`}
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <Badge variant="outline">{line.speaker}</Badge>
                                    <Button variant="ghost" size="sm">
                                        <Volume2 className="h-4 w-4" />
                                    </Button>
                                </div>
                                <p className="text-lg font-medium">{line.text}</p>
                                <p className="text-sm text-muted-foreground mt-1">{line.hindi}</p>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-between pt-4">
                        <Button
                            variant="outline"
                            disabled={currentLine === 0}
                            onClick={() => setCurrentLine((prev) => prev - 1)}
                        >
                            Previous
                        </Button>
                        <Button
                            disabled={currentLine === selectedConversation.dialogue.length - 1}
                            onClick={() => setCurrentLine((prev) => prev + 1)}
                        >
                            Next
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
