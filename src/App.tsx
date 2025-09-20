import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ThemeProvider } from './components/theme-provider';
import { Navigation } from './components/navigation';
import { useProfiles } from "./hooks/useProfiles";

// Page imports
import { LandingPage } from './components/pages/landing';
import { Onboarding } from './components/pages/onboarding';
import { Auth } from './components/pages/auth';
import { Dashboard } from './components/pages/dashboard';
import { MoodTracker } from './components/pages/mood-tracker';
import { Chat } from './components/pages/chat';
import { Resources } from './components/pages/resources';
import { CounselorBooking } from './components/pages/counselor-booking';
import { PeerSupport } from './components/pages/peer-support';
import { Settings } from './components/pages/settings';

type Page = 
  | 'landing' 
  | 'onboarding' 
  | 'auth' 
  | 'dashboard' 
  | 'mood-tracker' 
  | 'chat' 
  | 'resources' 
  | 'counselor-booking' 
  | 'peer-support' 
  | 'settings';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing');

  const renderPage = () => {
    const pageProps = { onNavigate: setCurrentPage };
    
    switch (currentPage) {
      case 'landing':
        return <LandingPage {...pageProps} />;
      case 'onboarding':
        return <Onboarding {...pageProps} />;
      case 'auth':
        return <Auth {...pageProps} />;
      case 'dashboard':
        return <Dashboard {...pageProps} />;
      case 'mood-tracker':
        return <MoodTracker {...pageProps} />;
      case 'chat':
        return <Chat {...pageProps} />;
      case 'resources':
        return <Resources {...pageProps} />;
      case 'counselor-booking':
        return <CounselorBooking {...pageProps} />;
      case 'peer-support':
        return <PeerSupport {...pageProps} />;
      case 'settings':
        return <Settings {...pageProps} />;
      default:
        return <LandingPage {...pageProps} />;
    }
  };

  const showNavigation = !['onboarding', 'auth'].includes(currentPage);

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background text-foreground">
        {showNavigation && (
          <Navigation currentPage={currentPage} onNavigate={setCurrentPage} />
        )}
        
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </div>
    </ThemeProvider>
  );
}

