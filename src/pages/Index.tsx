import { useState } from "react";
import { BottomNav, Tab } from "@/components/BottomNav";
import { InboxScreen } from "@/screens/InboxScreen";
import { ReportsScreen } from "@/screens/ReportsScreen";
import { SettingsScreen } from "@/screens/SettingsScreen";
import { ThemeProvider } from "@/components/ThemeProvider";

const PhoneShell = () => {
  const [tab, setTab] = useState<Tab>("inbox");

  return (
    <div className="min-h-screen w-full bg-background md:bg-muted/40 flex items-center justify-center md:p-6">
      {/* Phone frame on desktop, full-bleed on mobile */}
      <div className="relative w-full max-w-[420px] h-screen md:h-[860px] md:max-h-[92vh] md:rounded-[2.5rem] bg-background md:shadow-elevated overflow-hidden md:border md:border-border flex flex-col">
        <main key={tab} className="flex-1 min-h-0 overflow-hidden animate-fade-in">
          {tab === "inbox" && <InboxScreen />}
          {tab === "reports" && <ReportsScreen />}
          {tab === "settings" && <SettingsScreen />}
        </main>
        <BottomNav active={tab} onChange={setTab} />
      </div>
    </div>
  );
};

const Index = () => (
  <ThemeProvider>
    <PhoneShell />
  </ThemeProvider>
);

export default Index;
