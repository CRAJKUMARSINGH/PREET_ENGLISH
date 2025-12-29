import { Layout } from "@/components/Layout";
import { VocabularyBuilder } from "@/components/VocabularyBuilder";
import { BookOpen, Heart } from "lucide-react";

export default function VocabularyPage() {
  return (
    <Layout>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-gradient-to-br from-blue-500 to-indigo-500 p-3 rounded-2xl">
            <BookOpen className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Vocabulary Builder</h1>
            <p className="text-muted-foreground">शब्दावली निर्माता - रोज़मर्रा के शब्द सीखें</p>
          </div>
        </div>

        {/* Method Explanation */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl p-5 mb-6">
          <h3 className="font-bold text-blue-800 dark:text-blue-300 mb-3">📚 शब्द सीखने का तरीका:</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3">
              <span className="bg-blue-200 dark:bg-blue-800 w-8 h-8 rounded-full flex items-center justify-center font-bold text-blue-800 dark:text-blue-200">1</span>
              <div>
                <p className="font-medium text-blue-900 dark:text-blue-200">👀 देखें</p>
                <p className="text-sm text-blue-700 dark:text-blue-400">शब्द और हिंदी अर्थ</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="bg-indigo-200 dark:bg-indigo-800 w-8 h-8 rounded-full flex items-center justify-center font-bold text-indigo-800 dark:text-indigo-200">2</span>
              <div>
                <p className="font-medium text-indigo-900 dark:text-indigo-200">🔊 सुनें</p>
                <p className="text-sm text-indigo-700 dark:text-indigo-400">सही उच्चारण सीखें</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="bg-purple-200 dark:bg-purple-800 w-8 h-8 rounded-full flex items-center justify-center font-bold text-purple-800 dark:text-purple-200">3</span>
              <div>
                <p className="font-medium text-purple-900 dark:text-purple-200">⭐ याद करें</p>
                <p className="text-sm text-purple-700 dark:text-purple-400">Star करके track करें</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Vocabulary Builder Component */}
      <VocabularyBuilder />

      {/* Credits Footer */}
      <footer className="mt-12 pt-6 border-t text-center">
        <div className="flex items-center justify-center gap-2 text-amber-700 dark:text-amber-400">
          <Heart className="h-4 w-4 text-red-500 fill-red-500" />
          <p className="text-sm font-medium">
            Prepared on Initiative of <span className="font-bold">Mrs. Premlata Jain</span>, AAO, PWD Udaipur
          </p>
          <Heart className="h-4 w-4 text-red-500 fill-red-500" />
        </div>
      </footer>
    </Layout>
  );
}
