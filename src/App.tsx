import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { LayoutGrid, ClipboardList, MonitorPlay } from 'lucide-react';
import { POS } from './pages/POS';
import { OrdersManagement } from './pages/OrdersManagement';
import { QueueDisplay } from './pages/QueueDisplay';

function App() {
  return (
    <Router>
      <div className="max-h-screen bg-gray-100">
        <nav className="sticky inset-0 bg-white shadow-md z-10">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-8">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `flex items-center text-gray-900 hover:text-blue-600 ${isActive ? 'font-bold text-blue-600' : ''}`
                  }
                >
                  <LayoutGrid className="w-5 h-5 mr-2" />
                  <span>POS</span>
                </NavLink>
                <NavLink
                  to="/orders"
                  className={({ isActive }) =>
                    `flex items-center text-gray-900 hover:text-blue-600 ${isActive ? 'font-bold text-blue-600' : ''}`
                  }
                >
                  <ClipboardList className="w-5 h-5 mr-2" />
                  <span>Orders</span>
                </NavLink>
                <NavLink
                  to="/queue"
                  className={({ isActive }) =>
                    `flex items-center text-gray-900 hover:text-blue-600 ${isActive ? 'font-bold text-blue-600' : ''}`
                  }
                >
                  <MonitorPlay className="w-5 h-5 mr-2" />
                  <span>Queue Display</span>
                </NavLink>
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