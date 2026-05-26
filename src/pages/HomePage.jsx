import { testimonials } from "../data/vehicles";
import { useState, useEffect } from "react";

import VehicleCard from "../components/VehicleCard";
import { GoldButton, OutlineButton, SectionLabel } from "../components/UI";

export default function HomePage({ navigate, vehicles = [] }) {
  const [heroLoaded, setHeroLoaded] = useState(false);
  const featured = vehicles.filter((v) => v.featured).slice(0, 3);

  useEffect(() => {
    const timer = setTimeout(() => setHeroLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {/* ══════════════════════════════════════════
          HERO SECTION
      ══════════════════════════════════════════ */}
      <section
        style={{
          position: "relative",
          height: "100vh",
          minHeight: "700px",
          overflow: "hidden",
          background: "#050507",
        }}
      >
        {/* Background image */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=2000&q=85)`,
            backgroundSize: "cover",
            backgroundPosition: "center 40%",
            filter: "brightness(0.35)",
            transform: heroLoaded ? "scale(1)" : "scale(1.05)",
            transition: "transform 2s ease, opacity 1s ease",
            opacity: heroLoaded ? 1 : 0,
          }}
        />

        {/* Gradient overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(135deg, rgba(8,8,10,0.6) 0%, transparent 50%, rgba(8,8,10,0.3) 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "30%",
            background: "linear-gradient(to top, #050507, transparent)",
          }}
        />

        {/* Content */}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            height: "100%",
            display: "flex",
            alignItems: "center",
            padding: "0 2rem",
            maxWidth: "1400px",
            margin: "0 auto",
          }}
        >
          <div
            style={{
              opacity: heroLoaded ? 1 : 0,
              transform: heroLoaded ? "translateY(0)" : "translateY(30px)",
              transition: "all 1.2s ease 0.3s",
            }}
          >
            <SectionLabel>Northern Ireland's Finest</SectionLabel>
            <h1
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(3rem, 8vw, 7rem)",
                fontWeight: "300",
                color: "#fff",
                lineHeight: 1,
                marginBottom: "1.5rem",
                maxWidth: "800px",
              }}
            >
              Drive Beyond
              <br />
              <span style={{ color: "#D4AF37", fontStyle: "italic" }}>
                Expectation
              </span>
            </h1>
            <p
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "clamp(0.8rem, 1.5vw, 0.95rem)",
                color: "rgba(255,255,255,0.6)",
                maxWidth: "420px",
                lineHeight: 1.9,
                marginBottom: "2.5rem",
              }}
            >
              Harpo Automotives — curating the world's most desirable performance 
              and luxury vehicles for discerning drivers across Northern Ireland.
            </p>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <GoldButton onClick={() => navigate("inventory")}>
                Explore Our Collection
              </GoldButton>
              <OutlineButton onClick={() => navigate("contact")}>
                Speak to a Specialist
              </OutlineButton>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div
          style={{
            position: "absolute",
            bottom: "2rem",
            right: "2rem",
            display: "flex",
            gap: "2.5rem",
            opacity: heroLoaded ? 1 : 0,
            transition: "opacity 1s ease 0.8s",
          }}
        >
          {[
            { value: "200+", label: "Vehicles Sold" },
            { value: "15+", label: "Years Experience" },
            { value: "5★", label: "Customer Rating" },
          ].map(({ value, label }) => (
            <div key={label} style={{ textAlign: "center" }}>
              <div
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "1.8rem",
                  fontWeight: "600",
                  color: "#D4AF37",
                  lineHeight: 1,
                }}
              >
                {value}
              </div>
              <div
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "0.55rem",
                  color: "rgba(255,255,255,0.4)",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  marginTop: "0.3rem",
                }}
              >
                {label}
              </div>
            </div>
          ))}
        </div>

        {/* Scroll indicator */}
        <div
          style={{
            position: "absolute",
            bottom: "2rem",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.5rem",
            opacity: heroLoaded ? 0.6 : 0,
            transition: "opacity 1s ease 1.2s",
          }}
        >
          <div
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "0.55rem",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.5)",
            }}
          >
            Scroll
          </div>
          <div
            style={{
              width: "1px",
              height: "40px",
              background: "linear-gradient(to bottom, rgba(212,175,55,0.7), transparent)",
              animation: "pulse 2s ease-in-out infinite",
            }}
          />
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FEATURED VEHICLES
      ══════════════════════════════════════════ */}
      <section
        style={{
          background: "#08080A",
          padding: "6rem 2rem",
        }}
      >
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              marginBottom: "3rem",
              flexWrap: "wrap",
              gap: "1.5rem",
            }}
          >
            <div>
              <SectionLabel>Handpicked Selection</SectionLabel>
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(2rem, 4vw, 3.2rem)",
                  fontWeight: "300",
                  color: "#fff",
                  lineHeight: 1.1,
                }}
              >
                Featured Vehicles
              </h2>
            </div>
            <OutlineButton onClick={() => navigate("inventory")}>
              View All Stock
            </OutlineButton>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {featured.map((vehicle) => (
              <VehicleCard
                key={vehicle.id}
                vehicle={vehicle}
                navigate={navigate}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          WHY CHOOSE US
      ══════════════════════════════════════════ */}
      <section
        style={{
          background: "#050507",
          padding: "6rem 2rem",
          borderTop: "1px solid rgba(212,175,55,0.08)",
        }}
      >
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <SectionLabel>The Harpo Standard</SectionLabel>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(2rem, 4vw, 3.2rem)",
                fontWeight: "300",
                color: "#fff",
              }}
            >
              Why Choose Harpo Automotives
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "2rem",
            }}
          >
            {[
              {
                icon: "◈",
                title: "Curated Collection",
                desc: "Every vehicle is handpicked, verified, and prepared to the highest standard before entering our showroom.",
              },
              {
                icon: "◇",
                title: "Transparent Pricing",
                desc: "No hidden fees, no surprises. Our pricing is clear, competitive, and reflects true market value.",
              },
              {
                icon: "◆",
                title: "Flexible Finance",
                desc: "Bespoke finance packages tailored to your circumstances, with competitive rates and flexible terms.",
              },
              {
                icon: "◉",
                title: "Expert Knowledge",
                desc: "Over 15 years of prestige vehicle expertise. We speak your language and understand performance cars.",
              },
              {
                icon: "◎",
                title: "Aftersales Support",
                desc: "Our relationship doesn't end at the handover. We're here for every question, service, and part exchange.",
              },
              {
                icon: "✦",
                title: "Part Exchange Welcome",
                desc: "Upgrade seamlessly with our hassle-free part exchange service. We'll give you the best price for your current vehicle.",
              },
            ].map(({ icon, title, desc }) => (
              <div
                key={title}
                style={{
                  padding: "2rem",
                  border: "1px solid rgba(255,255,255,0.06)",
                  transition: "all 0.4s ease",
                  position: "relative",
                  overflow: "hidden",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(212,175,55,0.25)";
                  e.currentTarget.style.background = "rgba(212,175,55,0.03)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
                  e.currentTarget.style.background = "transparent";
                }}
              >
                <div
                  style={{
                    fontSize: "1.5rem",
                    color: "#D4AF37",
                    marginBottom: "1rem",
                    opacity: 0.8,
                  }}
                >
                  {icon}
                </div>
                <h3
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "1.25rem",
                    fontWeight: "500",
                    color: "#fff",
                    marginBottom: "0.75rem",
                  }}
                >
                  {title}
                </h3>
                <p
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: "0.78rem",
                    color: "rgba(255,255,255,0.45)",
                    lineHeight: 1.8,
                  }}
                >
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CINEMATIC BANNER
      ══════════════════════════════════════════ */}
      <section
        style={{
          position: "relative",
          height: "500px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=2000&q=80)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
            filter: "brightness(0.25)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(8,8,10,0.4)",
          }}
        />
        <div
          style={{
            position: "relative",
            zIndex: 1,
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "0 2rem",
          }}
        >
          <div>
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(0.9rem, 2vw, 1.1rem)",
                fontStyle: "italic",
                color: "rgba(255,255,255,0.5)",
                letterSpacing: "0.1em",
                marginBottom: "1rem",
              }}
            >
              "The art of driving, elevated."
            </p>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(2.5rem, 6vw, 5rem)",
                fontWeight: "300",
                color: "#fff",
                lineHeight: 1.1,
                marginBottom: "2rem",
              }}
            >
              Your Dream Car <br />
              <span style={{ color: "#D4AF37" }}>Awaits You</span>
            </h2>
            <GoldButton onClick={() => navigate("inventory")}>
              Browse Collection
            </GoldButton>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FINANCE SECTION
      ══════════════════════════════════════════ */}
      <section
        style={{
          background: "#08080A",
          padding: "6rem 2rem",
          borderTop: "1px solid rgba(212,175,55,0.08)",
        }}
      >
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "4rem",
            alignItems: "center",
          }}
        >
          <div>
            <SectionLabel>Finance Solutions</SectionLabel>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: "300",
                color: "#fff",
                lineHeight: 1.1,
                marginBottom: "1.5rem",
              }}
            >
              Premium Finance,
              <br />
              <span style={{ color: "#D4AF37" }}>Made Simple</span>
            </h2>
            <p
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "0.83rem",
                color: "rgba(255,255,255,0.5)",
                lineHeight: 1.9,
                marginBottom: "2rem",
              }}
            >
              Whether you're looking for PCP, HP, or a bespoke lease arrangement, 
              our finance specialists work with leading lenders to secure you the 
              most competitive rates available — often approved within 24 hours.
            </p>
            <GoldButton onClick={() => navigate("finance")}>
              Explore Finance Options
            </GoldButton>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1rem",
            }}
          >
            {[
              { label: "Personal Contract Purchase", abbr: "PCP" },
              { label: "Hire Purchase", abbr: "HP" },
              { label: "Personal Contract Hire", abbr: "PCH" },
              { label: "Bespoke Business Lease", abbr: "B2B" },
            ].map(({ label, abbr }) => (
              <div
                key={abbr}
                style={{
                  padding: "1.75rem",
                  border: "1px solid rgba(255,255,255,0.07)",
                  background: "rgba(212,175,55,0.02)",
                  textAlign: "center",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(212,175,55,0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
                }}
              >
                <div
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "2rem",
                    fontWeight: "600",
                    color: "#D4AF37",
                    marginBottom: "0.5rem",
                  }}
                >
                  {abbr}
                </div>
                <div
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: "0.65rem",
                    color: "rgba(255,255,255,0.4)",
                    letterSpacing: "0.05em",
                  }}
                >
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SELL YOUR CAR
      ══════════════════════════════════════════ */}
      <section
        style={{
          background: "#050507",
          padding: "6rem 2rem",
          borderTop: "1px solid rgba(212,175,55,0.08)",
        }}
      >
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "4rem",
            alignItems: "center",
          }}
        >
          <div
            style={{
              position: "relative",
              borderRadius: "0",
              overflow: "hidden",
              aspectRatio: "4/3",
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&q=80"
              alt="Sell your car"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                filter: "brightness(0.6)",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: "1.5rem",
                left: "1.5rem",
                padding: "0.75rem 1.25rem",
                background: "rgba(8,8,10,0.85)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(212,175,55,0.3)",
              }}
            >
              <div
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "1.5rem",
                  color: "#D4AF37",
                }}
              >
                Best Price Guaranteed
              </div>
              <div
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "0.65rem",
                  color: "rgba(255,255,255,0.5)",
                  letterSpacing: "0.1em",
                }}
              >
                No obligation valuation
              </div>
            </div>
          </div>

          <div>
            <SectionLabel>Sell or Part Exchange</SectionLabel>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: "300",
                color: "#fff",
                lineHeight: 1.1,
                marginBottom: "1.5rem",
              }}
            >
              Get Top Value
              <br />
              <span style={{ color: "#D4AF37" }}>For Your Vehicle</span>
            </h2>
            <p
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "0.83rem",
                color: "rgba(255,255,255,0.5)",
                lineHeight: 1.9,
                marginBottom: "2rem",
              }}
            >
              Looking to sell your prestige or performance vehicle? Our specialist 
              buyers will provide a fast, fair, and hassle-free valuation. We handle 
              all the paperwork — you just receive the payment.
            </p>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <GoldButton onClick={() => navigate("sell")}>
                Get a Valuation
              </GoldButton>
              <OutlineButton onClick={() => navigate("contact")}>
                Call Us Today
              </OutlineButton>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          TESTIMONIALS
      ══════════════════════════════════════════ */}
      <section
        style={{
          background: "#08080A",
          padding: "6rem 2rem",
          borderTop: "1px solid rgba(212,175,55,0.08)",
        }}
      >
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <SectionLabel>Client Stories</SectionLabel>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(2rem, 4vw, 3.2rem)",
                fontWeight: "300",
                color: "#fff",
              }}
            >
              What Our Clients Say
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {testimonials.map((t) => (
              <div
                key={t.id}
                style={{
                  padding: "2.5rem",
                  border: "1px solid rgba(255,255,255,0.07)",
                  background: "rgba(255,255,255,0.01)",
                  position: "relative",
                }}
              >
                {/* Quote mark */}
                <div
                  style={{
                    position: "absolute",
                    top: "1.5rem",
                    right: "1.5rem",
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "4rem",
                    color: "rgba(212,175,55,0.15)",
                    lineHeight: 1,
                  }}
                >
                  "
                </div>

                {/* Stars */}
                <div
                  style={{
                    display: "flex",
                    gap: "2px",
                    marginBottom: "1.25rem",
                  }}
                >
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <span key={i} style={{ color: "#D4AF37", fontSize: "0.75rem" }}>
                      ★
                    </span>
                  ))}
                </div>

                <p
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "1.05rem",
                    fontStyle: "italic",
                    color: "rgba(255,255,255,0.75)",
                    lineHeight: 1.7,
                    marginBottom: "1.5rem",
                  }}
                >
                  "{t.text}"
                </p>

                <div
                  style={{
                    borderTop: "1px solid rgba(255,255,255,0.08)",
                    paddingTop: "1rem",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'Montserrat', sans-serif",
                      fontSize: "0.75rem",
                      fontWeight: "600",
                      color: "#fff",
                    }}
                  >
                    {t.name}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Montserrat', sans-serif",
                      fontSize: "0.65rem",
                      color: "#D4AF37",
                      marginTop: "0.2rem",
                    }}
                  >
                    {t.vehicle} · {t.location}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CTA SECTION
      ══════════════════════════════════════════ */}
      <section
        style={{
          background: "#D4AF37",
          padding: "4rem 2rem",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: "500",
              color: "#08080A",
              marginBottom: "1rem",
            }}
          >
            Ready to Find Your Perfect Car?
          </h2>
          <p
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "0.83rem",
              color: "rgba(8,8,10,0.65)",
              marginBottom: "2rem",
              lineHeight: 1.8,
            }}
          >
            Speak to our team today — no pressure, no obligation. Just expert advice 
            and a truly premium experience.
          </p>
          <div
            style={{
              display: "flex",
              gap: "1rem",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <a
              href="tel:07342252057"
              style={{
                background: "#08080A",
                color: "#D4AF37",
                border: "none",
                padding: "1rem 2.5rem",
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "0.68rem",
                fontWeight: "600",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                textDecoration: "none",
                transition: "all 0.3s ease",
                display: "inline-block",
              }}
            >
              📞 07342 252057
            </a>
            <button
              onClick={() => navigate("contact")}
              style={{
                background: "transparent",
                color: "#08080A",
                border: "1px solid rgba(8,8,10,0.4)",
                padding: "1rem 2.5rem",
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "0.68rem",
                fontWeight: "600",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
            >
              Send Enquiry
            </button>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 0.2; }
        }
      `}</style>
    </div>
  );
}
