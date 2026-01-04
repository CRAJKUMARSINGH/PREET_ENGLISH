import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import { SaraswatiMascot } from "@/components/SaraswatiMascot";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-50 p-4">
      <div className="max-w-md text-center space-y-8">

        <SaraswatiMascot
          mood="teaching"
          size="lg"
          showMessage={true}
          message="Hmm... I can't find that page!"
        />

        <div className="space-y-2">
          <h1 className="text-4xl font-bold font-display">404</h1>
          <h2 className="text-2xl font-bold">Page Not Found</h2>
          <p className="text-muted-foreground">
            The way has been lost. <br />
            रास्ता भटक गए हैं।
          </p>
        </div>

        <Link href="/">
          <Button size="lg" className="gap-2 rounded-2xl w-full sm:w-auto">
            <Home className="h-4 w-4" />
            Return Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
