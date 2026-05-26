import { useState, useEffect } from "react";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import InventoryPage from "./pages/InventoryPage";
import VehicleDetailPage from "./pages/VehicleDetailPage";
import SellPage from "./pages/SellPage";
import FinancePage from "./pages/FinancePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import AdminPage from "./admin/AdminPage";
import { getVehicles } from "./lib/vehicleService";
import { vehicles as fallbackVehicles } from "./data/vehicles";

// Simple hash-based routing for /admin
function useRoute() {
  const [path, setPath] = useState(window.location.pathname);
  useEffect(() => {
    const handler = () => setPath(window.location.pathname);
    window.addEventListener("popstate", handler);
    return () => window.removeEventListener("popstate", handler);
  }, []);
  return path;
}

export default function App() {
  const path = useRoute();
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedVehicleId, setSelectedVehicleId] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [vehicles, setVehicles] = useState([]);
  const [vehiclesLoaded, setVehiclesLoaded] = useState(false);

  // Load vehicles from Supabase (falls back to local data if not configured)
  useEffect(() => {
    getVehicles()
      .then((data) => {
        setVehicles(data.length > 0 ? data : fallbackVehicles);
      })
      .catch(() => {
        setVehicles(fallbackVehicles);
      })
      .finally(() => setVehiclesLoaded(true));
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setMenuOpen(false);
  }, [currentPage, selectedVehicleId]);

  const navigate = (page, vehicleId = null) => {
    setCurrentPage(page);
    if (vehicleId) setSelectedVehicleId(vehicleId);
  };

  // Show admin page if path is /admin
  if (path === "/admin") {
    return <AdminPage />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case "home": return <HomePage navigate={navigate} vehicles={vehicles} />;
      case "inventory": return <InventoryPage navigate={navigate} vehicles={vehicles} />;
      case "vehicle": return <VehicleDetailPage vehicleId={selectedVehicleId} navigate={navigate} vehicles={vehicles} />;
      case "sell": return <SellPage navigate={navigate} />;
      case "finance": return <FinancePage navigate={navigate} />;
      case "about": return <AboutPage navigate={navigate} />;
      case "contact": return <ContactPage navigate={navigate} />;
      default: return <HomePage navigate={navigate} vehicles={vehicles} />;
    }
  };

  return (
    <div className="app">
      <Navigation currentPage={currentPage} navigate={navigate} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <main>{vehiclesLoaded ? renderPage() : <LoadingScreen />}</main>
      <Footer navigate={navigate} />
    </div>
  );
}

function LoadingScreen() {
  return (
    <div style={{ minHeight: "100vh", background: "#08080A", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.5rem", color: "rgba(212,175,55,0.4)", letterSpacing: "0.1em" }}>
        Loading...
      </div>
    </div>
  );
}
