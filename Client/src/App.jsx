import  { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import LandingPage from './components/LandingPage';
import AuthModal from './components/AuthModal';

function AppContent() {
  const { isAuthenticated, loading } = useAuth();
  const [authModal, setAuthModal] = useState(null);

  const handleBookAppointment = () => {
    if (isAuthenticated) {
      const dashboardElement = document.getElementById('dashboard');
      if (dashboardElement) {
        dashboardElement.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      setAuthModal({ isOpen: true, mode: 'signup' });
    }
  };

  const handleFindDoctors = () => {
    if (isAuthenticated) {
      const dashboardElement = document.getElementById('dashboard');
      if (dashboardElement) {
        dashboardElement.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      setAuthModal({ isOpen: true, mode: 'signup' });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      {isAuthenticated ? (
        <div id="dashboard">
          <Dashboard />
        </div>
      ) : (
        <LandingPage
          onBookAppointment={handleBookAppointment}
          onFindDoctors={handleFindDoctors}
        />
      )}

      {authModal && (
        <AuthModal
          isOpen={authModal.isOpen}
          mode={authModal.mode}
          onClose={() => setAuthModal(null)}
        />
      )}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
