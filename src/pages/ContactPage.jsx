import { useState } from "react";
import { PageHero, FormInput, FormSelect, FormTextarea, GoldButton, SectionLabel } from "../components/UI";

export default function ContactPage({ navigate }) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "", email: "", phone: "",
    subject: "", message: "",
  });

  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  return (
    <div style={{ background: "#08080A", minHeight: "100vh" }}>
      <PageHero
        label="Get in Touch"
        title="Contact Harpo Automotives"
        subtitle="We'd love to hear from you. Whether you have a question about a specific vehicle or just want advice from a specialist, we're here."
      />

      {/* Contact Info + Form */}
      <section style={{ padding: "5rem 2rem 7rem" }}>
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "4rem",
          }}
        >
          {/* Left: Info */}
          <div>
            <SectionLabel>Contact Details</SectionLabel>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "2.2rem",
                fontWeight: "300",
                color: "#fff",
                marginBottom: "2.5rem",
              }}
            >
              Speak to a Specialist
            </h2>

            {/* Phone */}
            <a
              href="tel:07342252057"
              style={{
                display: "block",
                padding: "1.75rem",
                border: "1px solid rgba(255,255,255,0.07)",
                marginBottom: "1rem",
                textDecoration: "none",
                transition: "all 0.3s ease",
                background: "rgba(255,255,255,0.01)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(212,175,55,0.4)";
                e.currentTarget.style.background = "rgba(212,175,55,0.03)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
                e.currentTarget.style.background = "rgba(255,255,255,0.01)";
              }}
            >
              <div
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "0.6rem",
                  color: "#D4AF37",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  marginBottom: "0.5rem",
                }}
              >
                📞 Phone
              </div>
              <div
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "1.8rem",
                  color: "#fff",
                }}
              >
                07342 252057
              </div>
              <div
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "0.7rem",
                  color: "rgba(255,255,255,0.35)",
                  marginTop: "0.25rem",
                }}
              >
                Click to call now
              </div>
            </a>

            {/* Email */}
            <a
              href="mailto:crwh02@icloud.com"
              style={{
                display: "block",
                padding: "1.75rem",
                border: "1px solid rgba(255,255,255,0.07)",
                marginBottom: "1rem",
                textDecoration: "none",
                transition: "all 0.3s ease",
                background: "rgba(255,255,255,0.01)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(212,175,55,0.4)";
                e.currentTarget.style.background = "rgba(212,175,55,0.03)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
                e.currentTarget.style.background = "rgba(255,255,255,0.01)";
              }}
            >
              <div
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "0.6rem",
                  color: "#D4AF37",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  marginBottom: "0.5rem",
                }}
              >
                ✉ Email
              </div>
              <div
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "1.5rem",
                  color: "#fff",
                  wordBreak: "break-all",
                }}
              >
                crwh02@icloud.com
              </div>
              <div
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "0.7rem",
                  color: "rgba(255,255,255,0.35)",
                  marginTop: "0.25rem",
                }}
              >
                We aim to respond within 4 hours
              </div>
            </a>

            {/* Location */}
            <div
              style={{
                padding: "1.75rem",
                border: "1px solid rgba(255,255,255,0.07)",
                marginBottom: "1rem",
                background: "rgba(255,255,255,0.01)",
              }}
            >
              <div
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "0.6rem",
                  color: "#D4AF37",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  marginBottom: "0.5rem",
                }}
              >
                📍 Location
              </div>
              <div
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "1.4rem",
                  color: "#fff",
                }}
              >
                Northern Ireland
              </div>
              <div
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "0.7rem",
                  color: "rgba(255,255,255,0.35)",
                  marginTop: "0.25rem",
                }}
              >
                Nationwide delivery available
              </div>
            </div>

            {/* Hours */}
            <div
              style={{
                padding: "1.75rem",
                border: "1px solid rgba(255,255,255,0.07)",
                background: "rgba(255,255,255,0.01)",
              }}
            >
              <div
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "0.6rem",
                  color: "#D4AF37",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  marginBottom: "1rem",
                }}
              >
                🕐 Opening Hours
              </div>
              {[
                { day: "Monday – Friday", hours: "9:00am – 6:00pm" },
                { day: "Saturday", hours: "9:00am – 5:00pm" },
                { day: "Sunday", hours: "By Appointment Only" },
              ].map(({ day, hours }) => (
                <div
                  key={day}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "0.65rem",
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
                      color: "rgba(255,255,255,0.75)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {hours}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <div>
            <SectionLabel>Send a Message</SectionLabel>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "2.2rem",
                fontWeight: "300",
                color: "#fff",
                marginBottom: "2.5rem",
              }}
            >
              We'll Get Back to You
            </h2>

            {submitted ? (
              <div
                style={{
                  textAlign: "center",
                  padding: "4rem 2rem",
                  border: "1px solid rgba(212,175,55,0.2)",
                }}
              >
                <div
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "3.5rem",
                    color: "#D4AF37",
                    marginBottom: "1rem",
                  }}
                >
                  ✓
                </div>
                <h3
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "2rem",
                    color: "#fff",
                    marginBottom: "1rem",
                  }}
                >
                  Message Received
                </h3>
                <p
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: "0.8rem",
                    color: "rgba(255,255,255,0.5)",
                    lineHeight: 1.8,
                  }}
                >
                  Thank you for reaching out. A member of the team will be in touch within 4 hours during business hours.
                </p>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 1rem" }}>
                  <FormInput label="Full Name" value={form.name} onChange={update("name")} placeholder="Your full name" required />
                  <FormInput label="Phone Number" type="tel" value={form.phone} onChange={update("phone")} placeholder="07xxx xxxxxx" />
                </div>
                <FormInput label="Email Address" type="email" value={form.email} onChange={update("email")} placeholder="your@email.com" required />
                <FormSelect
                  label="Subject"
                  value={form.subject}
                  onChange={update("subject")}
                  options={["General Enquiry", "Vehicle Enquiry", "Finance Enquiry", "Sell My Car", "Part Exchange", "Test Drive Request", "Other"]}
                  required
                />
                <FormTextarea
                  label="Your Message"
                  value={form.message}
                  onChange={update("message")}
                  placeholder="How can we help you today?"
                  required
                  rows={6}
                />
                <GoldButton type="submit" fullWidth>
                  Send Message
                </GoldButton>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
