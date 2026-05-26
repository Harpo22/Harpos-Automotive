export default function Footer({ navigate }) {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        background: "#050507",
        borderTop: "1px solid rgba(212,175,55,0.15)",
        padding: "5rem 2rem 2rem",
      }}
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        {/* Top Section */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "3rem",
            marginBottom: "4rem",
          }}
        >
          {/* Brand */}
          <div>
            <div style={{ marginBottom: "1.5rem" }}>
              <div
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "1.8rem",
                  fontWeight: "600",
                  color: "#D4AF37",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                }}
              >
                Harpo
              </div>
              <div
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "0.6rem",
                  fontWeight: "400",
                  color: "rgba(255,255,255,0.4)",
                  letterSpacing: "0.35em",
                  textTransform: "uppercase",
                }}
              >
                Automotives
              </div>
            </div>
            <p
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "0.8rem",
                color: "rgba(255,255,255,0.45)",
                lineHeight: 1.8,
                maxWidth: "260px",
              }}
            >
              Northern Ireland's premier prestige vehicle dealership. Delivering uncompromising luxury and performance since 2010.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "0.6rem",
                fontWeight: "600",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "#D4AF37",
                marginBottom: "1.5rem",
              }}
            >
              Navigate
            </h4>
            {[
              { label: "Home", page: "home" },
              { label: "Inventory", page: "inventory" },
              { label: "Finance", page: "finance" },
              { label: "Sell Your Car", page: "sell" },
              { label: "About Us", page: "about" },
              { label: "Contact", page: "contact" },
            ].map((link) => (
              <button
                key={link.page}
                onClick={() => navigate(link.page)}
                style={{
                  display: "block",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "0.78rem",
                  color: "rgba(255,255,255,0.5)",
                  marginBottom: "0.75rem",
                  padding: 0,
                  transition: "color 0.3s",
                  textAlign: "left",
                }}
                onMouseEnter={(e) => (e.target.style.color = "#D4AF37")}
                onMouseLeave={(e) => (e.target.style.color = "rgba(255,255,255,0.5)")}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Contact */}
          <div>
            <h4
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "0.6rem",
                fontWeight: "600",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "#D4AF37",
                marginBottom: "1.5rem",
              }}
            >
              Contact Us
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <a
                href="tel:07342252057"
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "0.78rem",
                  color: "rgba(255,255,255,0.5)",
                  textDecoration: "none",
                  transition: "color 0.3s",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.6rem",
                }}
                onMouseEnter={(e) => (e.target.style.color = "#D4AF37")}
                onMouseLeave={(e) => (e.target.style.color = "rgba(255,255,255,0.5)")}
              >
                📞 07342 252057
              </a>
              <a
                href="mailto:crwh02@icloud.com"
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "0.78rem",
                  color: "rgba(255,255,255,0.5)",
                  textDecoration: "none",
                  transition: "color 0.3s",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.6rem",
                }}
                onMouseEnter={(e) => (e.target.style.color = "#D4AF37")}
                onMouseLeave={(e) => (e.target.style.color = "rgba(255,255,255,0.5)")}
              >
                ✉ crwh02@icloud.com
              </a>
              <div
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "0.78rem",
                  color: "rgba(255,255,255,0.5)",
                  lineHeight: 1.7,
                }}
              >
                📍 Northern Ireland
              </div>
            </div>
          </div>

          {/* Opening Hours */}
          <div>
            <h4
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "0.6rem",
                fontWeight: "600",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "#D4AF37",
                marginBottom: "1.5rem",
              }}
            >
              Opening Hours
            </h4>
            {[
              { day: "Monday – Friday", hours: "9:00 – 18:00" },
              { day: "Saturday", hours: "9:00 – 17:00" },
              { day: "Sunday", hours: "By Appointment" },
            ].map(({ day, hours }) => (
              <div
                key={day}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "0.75rem",
                  gap: "1rem",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: "0.75rem",
                    color: "rgba(255,255,255,0.45)",
                  }}
                >
                  {day}
                </span>
                <span
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: "0.75rem",
                    color: "rgba(255,255,255,0.7)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {hours}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Gold Divider */}
        <div
          style={{
            height: "1px",
            background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.3), transparent)",
            marginBottom: "2rem",
          }}
        />

        {/* Bottom */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <p
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "0.68rem",
              color: "rgba(255,255,255,0.3)",
              letterSpacing: "0.05em",
            }}
          >
            © {year} Harpo Automotives. All rights reserved. Registered in Northern Ireland.
          </p>
          <p
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "0.68rem",
              color: "rgba(255,255,255,0.2)",
            }}
          >
            Finance subject to status. All prices include VAT.
          </p>
        </div>
      </div>
    </footer>
  );
}
