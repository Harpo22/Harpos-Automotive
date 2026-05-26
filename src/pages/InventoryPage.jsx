import { useState } from "react";

import VehicleCard from "../components/VehicleCard";
import { PageHero } from "../components/UI";

export default function InventoryPage({ navigate, vehicles = [] }) {
  const [search, setSearch] = useState("");
  const [filterFuel, setFilterFuel] = useState("All");
  const [filterTrans, setFilterTrans] = useState("All");
  const [sortBy, setSortBy] = useState("default");

  const fuels = ["All", ...new Set(vehicles.map((v) => v.fuel))];
  const trans = ["All", "Automatic", "Manual"];

  const filtered = vehicles
    .filter((v) => {
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        v.make.toLowerCase().includes(q) ||
        v.model.toLowerCase().includes(q) ||
        v.year.toString().includes(q) ||
        v.color.toLowerCase().includes(q);
      const matchFuel = filterFuel === "All" || v.fuel === filterFuel;
      const matchTrans = filterTrans === "All" || v.transmission === filterTrans;
      return matchSearch && matchFuel && matchTrans;
    })
    .sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "mileage") return a.mileage - b.mileage;
      if (sortBy === "year") return b.year - a.year;
      return 0;
    });

  const selectStyle = {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.1)",
    padding: "0.7rem 1rem",
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "0.72rem",
    color: "rgba(255,255,255,0.7)",
    outline: "none",
    cursor: "pointer",
    minWidth: "150px",
  };

  return (
    <div style={{ background: "#08080A", minHeight: "100vh" }}>
      <PageHero
        label="Our Collection"
        title="Vehicle Inventory"
        subtitle={`${filtered.length} prestige vehicle${filtered.length !== 1 ? "s" : ""} currently available`}
      />

      {/* Filters */}
      <section
        style={{
          background: "#08080A",
          borderBottom: "1px solid rgba(212,175,55,0.1)",
          padding: "1.5rem 2rem",
          position: "sticky",
          top: "56px",
          zIndex: 100,
          backdropFilter: "blur(20px)",
        }}
      >
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            display: "flex",
            gap: "1rem",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          {/* Search */}
          <input
            type="text"
            placeholder="Search by make, model, year..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              ...selectStyle,
              flex: 1,
              minWidth: "220px",
            }}
          />

          {/* Fuel */}
          <select
            value={filterFuel}
            onChange={(e) => setFilterFuel(e.target.value)}
            style={selectStyle}
          >
            {fuels.map((f) => (
              <option key={f} value={f} style={{ background: "#0E0E12" }}>
                {f === "All" ? "All Fuel Types" : f}
              </option>
            ))}
          </select>

          {/* Transmission */}
          <select
            value={filterTrans}
            onChange={(e) => setFilterTrans(e.target.value)}
            style={selectStyle}
          >
            {trans.map((t) => (
              <option key={t} value={t} style={{ background: "#0E0E12" }}>
                {t === "All" ? "All Transmissions" : t}
              </option>
            ))}
          </select>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={selectStyle}
          >
            <option value="default" style={{ background: "#0E0E12" }}>Sort: Default</option>
            <option value="price-asc" style={{ background: "#0E0E12" }}>Price: Low to High</option>
            <option value="price-desc" style={{ background: "#0E0E12" }}>Price: High to Low</option>
            <option value="mileage" style={{ background: "#0E0E12" }}>Lowest Mileage</option>
            <option value="year" style={{ background: "#0E0E12" }}>Newest First</option>
          </select>

          {/* Clear */}
          {(search || filterFuel !== "All" || filterTrans !== "All") && (
            <button
              onClick={() => {
                setSearch("");
                setFilterFuel("All");
                setFilterTrans("All");
              }}
              style={{
                background: "transparent",
                border: "1px solid rgba(212,175,55,0.3)",
                color: "#D4AF37",
                padding: "0.7rem 1rem",
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "0.68rem",
                letterSpacing: "0.1em",
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
            >
              Clear Filters
            </button>
          )}
        </div>
      </section>

      {/* Vehicle Grid */}
      <section style={{ padding: "3rem 2rem 6rem" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          {filtered.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "6rem 0",
              }}
            >
              <div
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "3rem",
                  color: "rgba(255,255,255,0.15)",
                  marginBottom: "1rem",
                }}
              >
                No vehicles found
              </div>
              <p
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "0.8rem",
                  color: "rgba(255,255,255,0.3)",
                }}
              >
                Try adjusting your filters or{" "}
                <button
                  onClick={() => navigate("contact")}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#D4AF37",
                    cursor: "pointer",
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: "0.8rem",
                    textDecoration: "underline",
                  }}
                >
                  contact us
                </button>{" "}
                for specific requests.
              </p>
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
                gap: "1.5rem",
              }}
            >
              {filtered.map((vehicle) => (
                <VehicleCard
                  key={vehicle.id}
                  vehicle={vehicle}
                  navigate={navigate}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
