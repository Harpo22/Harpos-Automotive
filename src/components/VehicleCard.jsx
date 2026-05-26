export default function VehicleCard({ vehicle, navigate }) {
  const formatPrice = (price) =>
    new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
      maximumFractionDigits: 0,
    }).format(price);

  const formatMileage = (m) =>
    new Intl.NumberFormat("en-GB").format(m) + " miles";

  return (
    <div
      onClick={() => navigate("vehicle", vehicle.id)}
      style={{
        background: "#0E0E12",
        border: "1px solid rgba(255,255,255,0.07)",
        cursor: "pointer",
        overflow: "hidden",
        transition: "all 0.4s ease",
        position: "relative",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "rgba(212,175,55,0.4)";
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "0 20px 60px rgba(0,0,0,0.5)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* Badge */}
      {vehicle.badge && (
        <div
          style={{
            position: "absolute",
            top: "1rem",
            left: "1rem",
            zIndex: 2,
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

      {/* Image */}
      <div
        style={{
          width: "100%",
          paddingBottom: "62%",
          position: "relative",
          overflow: "hidden",
          background: "#0a0a0e",
        }}
      >
        <img
          src={vehicle.image}
          alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.6s ease",
          }}
          onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
          onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(14,14,18,0.8) 0%, transparent 50%)",
          }}
        />
      </div>

      {/* Content */}
      <div style={{ padding: "1.5rem" }}>
        <div style={{ marginBottom: "1rem" }}>
          <div
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "0.6rem",
              fontWeight: "500",
              letterSpacing: "0.2em",
              color: "#D4AF37",
              textTransform: "uppercase",
              marginBottom: "0.3rem",
            }}
          >
            {vehicle.year} · {vehicle.make}
          </div>
          <h3
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "1.4rem",
              fontWeight: "500",
              color: "#fff",
              marginBottom: "0.2rem",
              lineHeight: 1.1,
            }}
          >
            {vehicle.model}
          </h3>
          <div
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "0.7rem",
              color: "rgba(255,255,255,0.45)",
            }}
          >
            {vehicle.trim}
          </div>
        </div>

        {/* Stats row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "0.5rem",
            marginBottom: "1.25rem",
            padding: "1rem 0",
            borderTop: "1px solid rgba(255,255,255,0.07)",
            borderBottom: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          {[
            { label: "Mileage", value: formatMileage(vehicle.mileage) },
            { label: "Fuel", value: vehicle.fuel },
            { label: "Trans", value: vehicle.transmission === "Automatic" ? "Auto" : "Manual" },
          ].map(({ label, value }) => (
            <div key={label} style={{ textAlign: "center" }}>
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
                  fontSize: "0.7rem",
                  fontWeight: "500",
                  color: "rgba(255,255,255,0.8)",
                }}
              >
                {value}
              </div>
            </div>
          ))}
        </div>

        {/* Price + CTA */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "1.5rem",
              fontWeight: "600",
              color: "#D4AF37",
            }}
          >
            {formatPrice(vehicle.price)}
          </div>
          <div
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "0.6rem",
              fontWeight: "600",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.5)",
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
            }}
          >
            View →
          </div>
        </div>
      </div>
    </div>
  );
}
