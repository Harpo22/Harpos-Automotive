import { useState, useEffect } from "react";

const navLinks = [
  { label: "Inventory", page: "inventory" },
  { label: "Finance", page: "finance" },
  { label: "Sell Your Car", page: "sell" },
  { label: "About", page: "about" },
  { label: "Contact", page: "contact" },
];

export default function Navigation({ currentPage, navigate, menuOpen, setMenuOpen }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          transition: "all 0.4s ease",
          background: scrolled
            ? "rgba(8, 8, 10, 0.97)"
            : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(212,175,55,0.15)" : "none",
          padding: scrolled ? "0.75rem 0" : "1.5rem 0",
        }}
      >
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            padding: "0 2rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <button
            onClick={() => navigate("home")}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "1px",
            }}
          >
            <span
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "1.5rem",
                fontWeight: "600",
                color: "#D4AF37",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                lineHeight: 1,
              }}
            >
              Harpo
            </span>
            <span
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "0.6rem",
                fontWeight: "400",
                color: "rgba(255,255,255,0.5)",
                letterSpacing: "0.35em",
                textTransform: "uppercase",
              }}
            >
              Automotives
            </span>
          </button>

          {/* Desktop Links */}
          <div
            className="desktop-nav"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "2.5rem",
            }}
          >
            {navLinks.map((link) => (
              <button
                key={link.page}
                onClick={() => navigate(link.page)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "0.7rem",
                  fontWeight: "500",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color:
                    currentPage === link.page
                      ? "#D4AF37"
                      : "rgba(255,255,255,0.75)",
                  transition: "color 0.3s ease",
                  padding: "0.25rem 0",
                  borderBottom:
                    currentPage === link.page
                      ? "1px solid #D4AF37"
                      : "1px solid transparent",
                }}
                onMouseEnter={(e) => {
                  if (currentPage !== link.page)
                    e.target.style.color = "#fff";
                }}
                onMouseLeave={(e) => {
                  if (currentPage !== link.page)
                    e.target.style.color = "rgba(255,255,255,0.75)";
                }}
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => navigate("inventory")}
              style={{
                background: "#D4AF37",
                border: "none",
                cursor: "pointer",
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "0.65rem",
                fontWeight: "600",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#08080A",
                padding: "0.65rem 1.4rem",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.target.style.background = "#fff";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "#D4AF37";
              }}
            >
              View Stock
            </button>
          </div>

          {/* Hamburger */}
          <button
            className="hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              display: "none",
              background: "none",
              border: "none",
              cursor: "pointer",
              flexDirection: "column",
              gap: "5px",
              padding: "4px",
            }}
            aria-label="Toggle menu"
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  display: "block",
                  width: "24px",
                  height: "1.5px",
                  background: "#D4AF37",
                  transition: "all 0.3s ease",
                  transformOrigin: "center",
                  transform:
                    menuOpen
                      ? i === 0
                        ? "translateY(6.5px) rotate(45deg)"
                        : i === 2
                        ? "translateY(-6.5px) rotate(-45deg)"
                        : "scaleX(0)"
                      : "none",
                }}
              />
            ))}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 999,
          background: "rgba(8,8,10,0.98)",
          transform: menuOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.4s cubic-bezier(0.77, 0, 0.175, 1)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "2.5rem",
        }}
      >
        {navLinks.map((link, i) => (
          <button
            key={link.page}
            onClick={() => navigate(link.page)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "2.5rem",
              fontWeight: "300",
              color: currentPage === link.page ? "#D4AF37" : "rgba(255,255,255,0.85)",
              letterSpacing: "0.05em",
              transition: "color 0.3s ease",
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? "translateY(0)" : "translateY(20px)",
              transitionDelay: `${i * 0.08}s`,
            }}
          >
            {link.label}
          </button>
        ))}
        <button
          onClick={() => navigate("inventory")}
          style={{
            background: "#D4AF37",
            border: "none",
            cursor: "pointer",
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "0.7rem",
            fontWeight: "600",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "#08080A",
            padding: "1rem 2.5rem",
            marginTop: "1rem",
            opacity: menuOpen ? 1 : 0,
            transform: menuOpen ? "translateY(0)" : "translateY(20px)",
            transitionDelay: "0.4s",
            transition: "all 0.3s ease",
          }}
        >
          View Stock
        </button>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: flex !important; }
        }
      `}</style>
    </>
  );
}
