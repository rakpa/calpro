import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NavBar from "@/components/nav-bar";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Percentage from "@/pages/percentage";
import Basic from "@/pages/basic";
import Convert from "@/pages/convert";
import Financial from "@/pages/financial";
import Scientific from "@/pages/scientific";
import Time from "@/pages/time";
import Age from "@/pages/age";
import Mortgage from "@/pages/mortgage";
import Discount from "@/pages/discount";
import DateDiff from "@/pages/date-diff";

function Router() {
  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      <main className="container mx-auto px-4 py-8">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/percentage" component={Percentage} />
          <Route path="/basic" component={Basic} />
          <Route path="/convert" component={Convert} />
          <Route path="/financial" component={Financial} />
          <Route path="/scientific" component={Scientific} />
          <Route path="/time" component={Time} />
          <Route path="/age" component={Age} />
          <Route path="/mortgage" component={Mortgage} />
          <Route path="/discount" component={Discount} />
          <Route path="/date-diff" component={DateDiff} />
          <Route component={NotFound} />
        </Switch>
      </main>
    </div>
  );
}

function App() {
  // Base element to handle client-side routing
  if (typeof window !== 'undefined') {
    const base = document.createElement('base');
    base.href = '/';
    document.head.appendChild(base);
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;