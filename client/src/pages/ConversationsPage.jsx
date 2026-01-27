import { Layout } from "@/components/Layout";
import { ConversationPractice } from "@/components/ConversationPractice";
import { MessagesSquare, Heart } from "lucide-react";
export default function ConversationsPage() {
    return (<Layout>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-gradient-to-br from-green-500 to-teal-500 p-3 rounded-2xl">
            <MessagesSquare className="h-8 w-8 text-white"/>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Conversation Practice</h1>
            <p className="text-muted-foreground">बातचीत का अभ्यास - Real-life dialogues सीखें</p>
          </div>
        </div>

        {/* Method Explanation */}
        <div className="bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 border border-green-200 dark:border-green-800 rounded-2xl p-5 mb-6">
          <h3 className="font-bold text-green-800 dark:text-green-300 mb-3">💬 बातचीत सीखने का तरीका:</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-3">
              <span className="bg-green-200 dark:bg-green-800 w-8 h-8 rounded-full flex items-center justify-center font-bold text-green-800 dark:text-green-200">1</span>
              <div>
                <p className="font-medium text-green-900 dark:text-green-200">👀 पढ़ें</p>
                <p className="text-sm text-green-700 dark:text-green-400">English dialogue</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="bg-teal-200 dark:bg-teal-800 w-8 h-8 rounded-full flex items-center justify-center font-bold text-teal-800 dark:text-teal-200">2</span>
              <div>
                <p className="font-medium text-teal-900 dark:text-teal-200">🔊 सुनें</p>
                <p className="text-sm text-teal-700 dark:text-teal-400">Speaker icon दबाएं</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="bg-emerald-200 dark:bg-emerald-800 w-8 h-8 rounded-full flex items-center justify-center font-bold text-emerald-800 dark:text-emerald-200">3</span>
              <div>
                <p className="font-medium text-emerald-900 dark:text-emerald-200">📖 समझें</p>
                <p className="text-sm text-emerald-700 dark:text-emerald-400">Hindi translation देखें</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="bg-cyan-200 dark:bg-cyan-800 w-8 h-8 rounded-full flex items-center justify-center font-bold text-cyan-800 dark:text-cyan-200">4</span>
              <div>
                <p className="font-medium text-cyan-900 dark:text-cyan-200">🗣️ बोलें</p>
                <p className="text-sm text-cyan-700 dark:text-cyan-400">Practice करें</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Conversation Practice Component */}
      <ConversationPractice />

      {/* Credits Footer */}
      <footer className="mt-12 pt-6 border-t text-center">
        <div className="flex items-center justify-center gap-2 text-amber-700 dark:text-amber-400">
          <Heart className="h-4 w-4 text-red-500 fill-red-500"/>
          <p className="text-sm font-medium">
            Prepared on Initiative of <span className="font-bold">Mrs. Premlata Jain</span>, AAO, PWD Udaipur
          </p>
          <Heart className="h-4 w-4 text-red-500 fill-red-500"/>
        </div>
      </footer>
    </Layout>);
}
