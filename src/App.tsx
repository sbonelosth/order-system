import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { LayoutGrid, ClipboardList, MonitorPlay } from 'lucide-react';
import { POS } from './pages/POS';
import { OrdersManagement } from './pages/OrdersManagement';
import { QueueDisplay } from './pages/QueueDisplay';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white shadow-md">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-8">
                <Link
                  to="/"
                  className="flex items-center text-gray-900 hover:text-blue-600"
                >
                  <LayoutGrid className="w-5 h-5 mr-2" />
                  <span>POS</span>
                </Link>
                <Link
                  to="/orders"
                  className="flex items-center text-gray-900 hover:text-blue-600"
                >
                  <ClipboardList className="w-5 h-5 mr-2" />
                  <span>Orders</span>
                </Link>
                <Link
                  to="/queue"
                  className="flex items-center text-gray-900 hover:text-blue-600"
                >
                  <MonitorPlay className="w-5 h-5 mr-2" />
                  <span>Queue Display</span>
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <main>
          <Routes>
            <Route path="/" element={<POS />} />
            <Route path="/orders" element={<OrdersManagement />} />
            <Route path="/queue" element={<QueueDisplay />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;