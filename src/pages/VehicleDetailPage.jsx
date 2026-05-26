import { useState } from "react";

import { GoldButton, OutlineButton, FormInput, FormTextarea, SectionLabel } from "../components/UI";
import VehicleCard from "../components/VehicleCard";

const formatPrice = (price) =>
  new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0,
  }).format(price);

const formatMileage = (m) => new Intl.NumberFormat("en-GB").format(m) + " miles";

export default function VehicleDetailPage({ vehicleId, navigate, vehicles = [] }) {
  const vehicle = vehicles.find((v) => v.id === vehicleId);
  const related = vehicles.filter((v) => v.id !== vehicleId).slice(0, 3);

  const [activeImage, setActiveImage] = useState(0);
  const [showEnquiry, setShowEnquiry] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  if (!vehicle) {
    return (
      <div
        style={{
          background: "#08080A",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: "1.5rem",
        }}
      >
        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "2rem",
            color: "rgba(255,255,255,0.3)",
          }}
        >
          Vehicle not found
        </p>
        <GoldButton onClick={() => navigate("inventory")}>Back to Inventory</GoldButton>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={{ background: "#08080A", minHeight: "100vh" }}>
      {/* Back nav */}
      <div
        style={{
          padding: "7rem 2rem 1rem",
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        <button
          onClick={() => navigate("inventory")}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "0.65rem",
            color: "rgba(255,255,255,0.4)",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: 0,
            transition: "color 0.3s",
          }}
          onMouseEnter={(e) => (e.target.style.color = "#D4AF37")}
          onMouseLeave={(e) => (e.target.style.color = "rgba(255,255,255,0.4)")}
        >
          ← Back to Inventory
        </button>
      </div>

      {/* Main Content */}
      <section style={{ padding: "1rem 2rem 4rem", maxWidth: "1400px", margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "3rem",
          }}
        >
          {/* LEFT: Images */}
          <div>
            {/* Main image */}
            <div
              style={{
                width: "100%",
                paddingBottom: "65%",
                position: "relative",
                overflow: "hidden",
                marginBottom: "1rem",
                background: "#0a0a0e",
              }}
            >
              <img
                src={vehicle.gallery?.[activeImage] || vehicle.image}
                alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "opacity 0.3s ease",
                }}
              />
              {vehicle.badge && (
                <div
                  style={{
                    position: "absolute",
                    top: "1rem",
                    left: "1rem",
                    background: "#D4AF37",
                    color: "#08080A",
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: "0.55rem",
                    fontWeight: "700",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    padding: "0.35rem 0.75rem",
                  }}
                >
                  {vehicle.badge}
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {vehicle.gallery && vehicle.gallery.length > 1 && (
              <div style={{ display: "flex", gap: "0.5rem" }}>
                {vehicle.gallery.map((img, i) => (
                  <div
                    key={i}
                    onClick={() => setActiveImage(i)}
                    style={{
                      flex: 1,
                      paddingBottom: "20%",
                      position: "relative",
                      overflow: "hidden",
                      cursor: "pointer",
                      border: activeImage === i
                        ? "2px solid #D4AF37"
                        : "2px solid transparent",
                      transition: "border-color 0.3s",
                    }}
                  >
                    <img
                      src={img}
                      alt=""
                      style={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        filter: activeImage === i ? "none" : "brightness(0.5)",
                        transition: "filter 0.3s",
                      }}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT: Details */}
          <div>
            <div
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "0.6rem",
                fontWeight: "500",
                letterSpacing: "0.2em",
                color: "#D4AF37",
                textTransform: "uppercase",
                marginBottom: "0.5rem",
              }}
            >
              {vehicle.year} · {vehicle.make}
            </div>
            <h1
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(2rem, 4vw, 3.2rem)",
                fontWeight: "300",
                color: "#fff",
                lineHeight: 1.1,
                marginBottom: "0.4rem",
              }}
            >
              {vehicle.model}
            </h1>
            <p
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "0.8rem",
                color: "rgba(255,255,255,0.4)",
                marginBottom: "1.5rem",
              }}
            >
              {vehicle.trim}
            </p>

            <div
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "2.8rem",
                fontWeight: "600",
                color: "#D4AF37",
                marginBottom: "2rem",
              }}
            >
              {formatPrice(vehicle.price)}
            </div>

            {/* Spec Grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "0",
                border: "1px solid rgba(255,255,255,0.07)",
                marginBottom: "2rem",
              }}
            >
              {[
                { label: "Mileage", value: formatMileage(vehicle.mileage) },
                { label: "Fuel Type", value: vehicle.fuel },
                { label: "Transmission", value: vehicle.transmission },
                { label: "Engine", value: vehicle.engine },
                { label: "Power", value: vehicle.power },
                { label: "Colour", value: vehicle.color },
                { label: "Body Type", value: vehicle.bodyType },
                { label: "Doors", value: vehicle.doors },
              ].map(({ label, value }, i) => (
                <div
                  key={label}
                  style={{
                    padding: "0.9rem 1rem",
                    borderBottom: i < 6 ? "1px solid rgba(255,255,255,0.07)" : "none",
                    borderRight: i % 2 === 0 ? "1px solid rgba(255,255,255,0.07)" : "none",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'Montserrat', sans-serif",
                      fontSize: "0.55rem",
                      color: "rgba(255,255,255,0.3)",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      marginBottom: "0.3rem",
                    }}
                  >
                    {label}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Montserrat', sans-serif",
                      fontSize: "0.78rem",
                      fontWeight: "500",
                      color: "#fff",
                    }}
                  >
                    {value}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div style={{ display: "flex", gap: "1rem", marginBottom: "1.5rem", flexWrap: "wrap" }}>
              <GoldButton onClick={() => setShowEnquiry(true)}>
                Enquire About This Car
              </GoldButton>
              <a
                href="tel:07342252057"
                style={{
                  background: "transparent",
                  border: "1px solid rgba(212,175,55,0.5)",
                  padding: "1rem 1.5rem",
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "0.68rem",
                  fontWeight: "600",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "#D4AF37",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  transition: "all 0.3s ease",
                }}
              >
                📞 Call Now
              </a>
            </div>

            {/* Finance hint */}
            <button
              onClick={() => navigate("finance")}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "0.75rem 1rem",
                borderLeft: "2px solid rgba(212,175,55,0.4)",
                textAlign: "left",
                display: "block",
                width: "100%",
                transition: "border-color 0.3s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.borderColor = "#D4AF37")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.borderColor = "rgba(212,175,55,0.4)")
              }
            >
              <div
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "0.65rem",
                  color: "#D4AF37",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  marginBottom: "0.2rem",
                }}
              >
                Finance Available
              </div>
              <div
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "0.72rem",
                  color: "rgba(255,255,255,0.45)",
                }}
              >
                Explore payment plans from £{Math.round(vehicle.price / 60).toLocaleString()} / month →
              </div>
            </button>
          </div>
        </div>

        {/* Description */}
        <div
          style={{
            marginTop: "3rem",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "3rem",
          }}
        >
          <div>
            <SectionLabel>About This Vehicle</SectionLabel>
            <p
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "0.85rem",
                color: "rgba(255,255,255,0.55)",
                lineHeight: 1.9,
              }}
            >
              {vehicle.description}
            </p>
          </div>

          {/* Features */}
          {vehicle.features && (
            <div>
              <SectionLabel>Key Features</SectionLabel>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "0.6rem",
                }}
              >
                {vehicle.features.map((f) => (
                  <div
                    key={f}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.6rem",
                      fontFamily: "'Montserrat', sans-serif",
                      fontSize: "0.73rem",
                      color: "rgba(255,255,255,0.6)",
                    }}
                  >
                    <span style={{ color: "#D4AF37", fontSize: "0.5rem" }}>◆</span>
                    {f}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Related Vehicles */}
      <section
        style={{
          padding: "4rem 2rem 6rem",
          borderTop: "1px solid rgba(212,175,55,0.08)",
          background: "#050507",
        }}
      >
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <SectionLabel>You May Also Like</SectionLabel>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "2rem",
              fontWeight: "300",
              color: "#fff",
              marginBottom: "2rem",
            }}
          >
            Related Vehicles
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {related.map((v) => (
              <VehicleCard key={v.id} vehicle={v} navigate={navigate} />
            ))}
          </div>
        </div>
      </section>

      {/* Enquiry Modal */}
      {showEnquiry && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(5,5,7,0.92)",
            zIndex: 2000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem",
            backdropFilter: "blur(8px)",
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowEnquiry(false);
          }}
        >
          <div
            style={{
              background: "#0E0E12",
              border: "1px solid rgba(212,175,55,0.2)",
              padding: "3rem",
              maxWidth: "520px",
              width: "100%",
              position: "relative",
              maxHeight: "90vh",
              overflowY: "auto",
            }}
          >
            <button
              onClick={() => setShowEnquiry(false)}
              style={{
                position: "absolute",
                top: "1.5rem",
                right: "1.5rem",
                background: "none",
                border: "none",
                color: "rgba(255,255,255,0.4)",
                fontSize: "1.2rem",
                cursor: "pointer",
              }}
            >
              ✕
            </button>

            {submitted ? (
              <div style={{ textAlign: "center", padding: "2rem 0" }}>
                <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>✓</div>
                <h3
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "1.8rem",
                    color: "#D4AF37",
                    marginBottom: "0.75rem",
                  }}
                >
                  Enquiry Received
                </h3>
                <p
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: "0.8rem",
                    color: "rgba(255,255,255,0.5)",
                    lineHeight: 1.7,
                  }}
                >
                  Thank you for your interest in the {vehicle.year} {vehicle.make} {vehicle.model}.
                  A specialist will be in touch within 24 hours.
                </p>
              </div>
            ) : (
              <>
                <SectionLabel>Enquire Now</SectionLabel>
                <h3
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "1.6rem",
                    color: "#fff",
                    marginBottom: "0.5rem",
                  }}
                >
                  {vehicle.year} {vehicle.make} {vehicle.model}
                </h3>
                <p
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: "0.72rem",
                    color: "#D4AF37",
                    marginBottom: "2rem",
                  }}
                >
                  {formatPrice(vehicle.price)}
                </p>

                <form onSubmit={handleSubmit}>
                  <FormInput
                    label="Full Name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Your full name"
                    required
                  />
                  <FormInput
                    label="Email Address"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="your@email.com"
                    required
                  />
                  <FormInput
                    label="Phone Number"
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="07xxx xxxxxx"
                  />
                  <FormTextarea
                    label="Message"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Any questions or preferred contact times..."
                    rows={4}
                  />
                  <GoldButton type="submit" fullWidth>
                    Submit Enquiry
                  </GoldButton>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
