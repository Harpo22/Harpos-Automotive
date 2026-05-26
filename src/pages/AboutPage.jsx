import { PageHero, SectionLabel, GoldButton, OutlineButton } from "../components/UI";

export default function AboutPage({ navigate }) {
  return (
    <div style={{ background: "#08080A", minHeight: "100vh" }}>
      <PageHero
        label="Our Story"
        title="About Harpo Automotives"
        subtitle="Over 15 years of passion, expertise, and an unwavering commitment to excellence in prestige automotive retail."
      />

      {/* Story Section */}
      <section style={{ padding: "6rem 2rem", borderBottom: "1px solid rgba(212,175,55,0.08)" }}>
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "5rem",
            alignItems: "center",
          }}
        >
          <div>
            <SectionLabel>Est. 2010</SectionLabel>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: "300",
                color: "#fff",
                lineHeight: 1.15,
                marginBottom: "1.5rem",
              }}
            >
              Built on Passion.
              <br />
              <span style={{ color: "#D4AF37" }}>Driven by Excellence.</span>
            </h2>
            <p
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "0.83rem",
                color: "rgba(255,255,255,0.5)",
                lineHeight: 1.9,
                marginBottom: "1.5rem",
              }}
            >
              Harpo Automotives was founded with a simple belief: that buying and selling 
              a prestige vehicle should be an experience as extraordinary as the car itself. 
              Based in the heart of Northern Ireland, we've built a reputation that stretches 
              across the UK.
            </p>
            <p
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "0.83rem",
                color: "rgba(255,255,255,0.5)",
                lineHeight: 1.9,
                marginBottom: "2rem",
              }}
            >
              Every vehicle in our collection is meticulously sourced, independently inspected, 
              and presented to a standard that reflects our unwavering commitment to quality. 
              We don't just sell cars — we match exceptional people with exceptional machines.
            </p>
            <GoldButton onClick={() => navigate("contact")}>
              Get in Touch
            </GoldButton>
          </div>

          {/* Image */}
          <div
            style={{
              position: "relative",
              aspectRatio: "4/5",
              overflow: "hidden",
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1486006920555-c77dcf18193c?w=800&q=80"
              alt="Luxury showroom"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                filter: "brightness(0.7)",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: "40%",
                background: "linear-gradient(to top, rgba(8,8,10,0.8), transparent)",
              }}
            />
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={{ padding: "6rem 2rem", background: "#050507", borderBottom: "1px solid rgba(212,175,55,0.08)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <SectionLabel>What We Stand For</SectionLabel>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: "300",
                color: "#fff",
              }}
            >
              Our Core Values
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "2rem",
            }}
          >
            {[
              {
                number: "01",
                title: "Integrity",
                desc: "Honest, transparent dealings. We tell you everything about a vehicle — the good and the not so good. Your trust is everything.",
              },
              {
                number: "02",
                title: "Excellence",
                desc: "From the vehicles we source to the service we provide, we hold ourselves to the highest standard — without exception.",
              },
              {
                number: "03",
                title: "Passion",
                desc: "We're enthusiasts first. We genuinely love what we do, and that passion shows in every car we sell and every client we serve.",
              },
              {
                number: "04",
                title: "Personalisation",
                desc: "No two customers are the same. We take time to understand your needs and tailor our service to match your lifestyle.",
              },
            ].map(({ number, title, desc }) => (
              <div
                key={number}
                style={{
                  padding: "2.5rem",
                  border: "1px solid rgba(255,255,255,0.06)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "-0.5rem",
                    right: "1.5rem",
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "5rem",
                    fontWeight: "700",
                    color: "rgba(212,175,55,0.06)",
                    lineHeight: 1,
                    pointerEvents: "none",
                  }}
                >
                  {number}
                </div>
                <div
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: "0.6rem",
                    color: "#D4AF37",
                    letterSpacing: "0.25em",
                    textTransform: "uppercase",
                    marginBottom: "0.75rem",
                  }}
                >
                  {number}
                </div>
                <h3
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "1.5rem",
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

      {/* Stats */}
      <section style={{ padding: "5rem 2rem", background: "#08080A" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "2rem",
              textAlign: "center",
            }}
          >
            {[
              { value: "15+", label: "Years in Business" },
              { value: "200+", label: "Prestige Vehicles Sold" },
              { value: "5★", label: "Average Review Rating" },
              { value: "100%", label: "Client Satisfaction Goal" },
            ].map(({ value, label }) => (
              <div
                key={label}
                style={{
                  padding: "2.5rem 1rem",
                  border: "1px solid rgba(212,175,55,0.1)",
                }}
              >
                <div
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "3.5rem",
                    fontWeight: "600",
                    color: "#D4AF37",
                    lineHeight: 1,
                    marginBottom: "0.75rem",
                  }}
                >
                  {value}
                </div>
                <div
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: "0.65rem",
                    color: "rgba(255,255,255,0.4)",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                  }}
                >
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        style={{
          padding: "5rem 2rem",
          background: "#050507",
          borderTop: "1px solid rgba(212,175,55,0.08)",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <SectionLabel>Work With Us</SectionLabel>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: "300",
              color: "#fff",
              marginBottom: "1.5rem",
            }}
          >
            Ready to Experience the Harpo Difference?
          </h2>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <GoldButton onClick={() => navigate("inventory")}>Browse Vehicles</GoldButton>
            <OutlineButton onClick={() => navigate("contact")}>Contact Us</OutlineButton>
          </div>
        </div>
      </section>
    </div>
  );
}
