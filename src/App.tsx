import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import TransactionsDashboard from './pages/Dashboard';
import queryClient from './technical/common/utils/query-client';
import Overview from './pages/Overview';
import sidebarItems from './technical/common/components/sidebar/sidebar-items';
import Sidebar from './technical/common/components/sidebar';
import Header from './technical/common/components/header';

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="flex h-screen">
          <Sidebar
            sidebarItems={sidebarItems}
            cta={
              <button
                type="button"
                className="cursor-pointer uppercase border border-cyan-200 rounded-lg px-4 py-2 mx-4 text-cyan-200"
              >
                upgrade account
              </button>
            }
          />
          <div className="flex-1 flex flex-col">
            <Header />
            <div className="flex-1 overflow-auto">
              <Routes>
                <Route path="/" element={<Overview />} />
                <Route
                  path="/transactions"
                  element={<TransactionsDashboard />}
                />
              </Routes>
            </div>
          </div>
        </div>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
