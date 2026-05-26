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

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedVehicleId, setSelectedVehicleId] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setMenuOpen(false);
  }, [currentPage, selectedVehicleId]);

  const navigate = (page, vehicleId = null) => {
    setCurrentPage(page);
    if (vehicleId) setSelectedVehicleId(vehicleId);
  };

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage navigate={navigate} />;
      case "inventory":
        return <InventoryPage navigate={navigate} />;
      case "vehicle":
        return <VehicleDetailPage vehicleId={selectedVehicleId} navigate={navigate} />;
      case "sell":
        return <SellPage navigate={navigate} />;
      case "finance":
        return <FinancePage navigate={navigate} />;
      case "about":
        return <AboutPage navigate={navigate} />;
      case "contact":
        return <ContactPage navigate={navigate} />;
      default:
        return <HomePage navigate={navigate} />;
    }
  };

  return (
    <div className="app">
      <Navigation
        currentPage={currentPage}
        navigate={navigate}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />
      <main>{renderPage()}</main>
      <Footer navigate={navigate} />
    </div>
  );
}
