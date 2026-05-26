import { useState } from "react";
import { PageHero, FormInput, FormSelect, FormTextarea, GoldButton, SectionLabel } from "../components/UI";

export default function SellPage({ navigate }) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    make: "",
    model: "",
    year: "",
    mileage: "",
    fuel: "",
    transmission: "",
    color: "",
    condition: "",
    serviceHistory: "",
    asking: "",
    notes: "",
  });

  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={{ background: "#08080A", minHeight: "100vh" }}>
      <PageHero
        label="Sell or Part Exchange"
        title="Get Top Value For Your Car"
        subtitle="Fast, fair, and completely hassle-free. Our specialist buyers will provide a competitive valuation with no obligation."
      />

      {/* Why Sell With Us */}
      <section style={{ padding: "5rem 2rem", borderBottom: "1px solid rgba(212,175,55,0.08)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "2rem",
            }}
          >
            {[
              { icon: "⚡", title: "Fast Process", desc: "Receive a valuation within 24 hours of submitting your details. No waiting, no games." },
              { icon: "£", title: "Best Prices", desc: "We're actively sourcing stock for our showroom — you'll receive a genuine, market-leading offer." },
              { icon: "📋", title: "We Handle Everything", desc: "From paperwork to payment transfer, we manage the entire process so you don't have to." },
              { icon: "✓", title: "No Obligation", desc: "Our valuation is completely free. There's no pressure to accept — just an honest offer." },
            ].map(({ icon, title, desc }) => (
              <div
                key={title}
                style={{
                  padding: "2rem",
                  border: "1px solid rgba(255,255,255,0.06)",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontSize: "1.8rem",
                    marginBottom: "1rem",
                    color: "#D4AF37",
                  }}
                >
                  {icon}
                </div>
                <h3
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "1.2rem",
                    color: "#fff",
                    marginBottom: "0.75rem",
                  }}
                >
                  {title}
                </h3>
                <p
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: "0.75rem",
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

      {/* Form */}
      <section style={{ padding: "5rem 2rem 7rem" }}>
        <div style={{ maxWidth: "820px", margin: "0 auto" }}>
          {submitted ? (
            <div
              style={{
                textAlign: "center",
                padding: "5rem 2rem",
                border: "1px solid rgba(212,175,55,0.2)",
              }}
            >
              <div
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "4rem",
                  color: "#D4AF37",
                  marginBottom: "1rem",
                }}
              >
                ✓
              </div>
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "2.5rem",
                  color: "#fff",
                  marginBottom: "1rem",
                }}
              >
                Valuation Request Received
              </h2>
              <p
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "0.83rem",
                  color: "rgba(255,255,255,0.5)",
                  lineHeight: 1.9,
                  maxWidth: "460px",
                  margin: "0 auto 2rem",
                }}
              >
                Thank you for submitting your vehicle details. A member of our specialist team 
                will contact you within 24 hours with a competitive valuation.
              </p>
              <GoldButton onClick={() => navigate("home")}>Return Home</GoldButton>
            </div>
          ) : (
            <>
              <div style={{ marginBottom: "3rem", textAlign: "center" }}>
                <SectionLabel>Vehicle Details Form</SectionLabel>
                <h2
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "2.5rem",
                    fontWeight: "300",
                    color: "#fff",
                  }}
                >
                  Tell Us About Your Vehicle
                </h2>
              </div>

              <form onSubmit={handleSubmit}>
                {/* Contact Details */}
                <div
                  style={{
                    background: "rgba(212,175,55,0.03)",
                    border: "1px solid rgba(212,175,55,0.1)",
                    padding: "2rem",
                    marginBottom: "1.5rem",
                  }}
                >
                  <h3
                    style={{
                      fontFamily: "'Montserrat', sans-serif",
                      fontSize: "0.62rem",
                      fontWeight: "600",
                      letterSpacing: "0.25em",
                      textTransform: "uppercase",
                      color: "#D4AF37",
                      marginBottom: "1.5rem",
                    }}
                  >
                    Your Contact Details
                  </h3>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 1rem" }}>
                    <FormInput label="Full Name" value={form.name} onChange={update("name")} placeholder="Your full name" required />
                    <FormInput label="Phone Number" type="tel" value={form.phone} onChange={update("phone")} placeholder="07xxx xxxxxx" required />
                  </div>
                  <FormInput label="Email Address" type="email" value={form.email} onChange={update("email")} placeholder="your@email.com" required />
                </div>

                {/* Vehicle Details */}
                <div
                  style={{
                    background: "rgba(212,175,55,0.03)",
                    border: "1px solid rgba(212,175,55,0.1)",
                    padding: "2rem",
                    marginBottom: "1.5rem",
                  }}
                >
                  <h3
                    style={{
                      fontFamily: "'Montserrat', sans-serif",
                      fontSize: "0.62rem",
                      fontWeight: "600",
                      letterSpacing: "0.25em",
                      textTransform: "uppercase",
                      color: "#D4AF37",
                      marginBottom: "1.5rem",
                    }}
                  >
                    Vehicle Details
                  </h3>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 1rem" }}>
                    <FormInput label="Make" value={form.make} onChange={update("make")} placeholder="e.g. BMW" required />
                    <FormInput label="Model" value={form.model} onChange={update("model")} placeholder="e.g. M3 Competition" required />
                    <FormInput label="Year" value={form.year} onChange={update("year")} placeholder="e.g. 2022" required />
                    <FormInput label="Mileage" value={form.mileage} onChange={update("mileage")} placeholder="e.g. 15,000" required />
                    <FormSelect
                      label="Fuel Type"
                      value={form.fuel}
                      onChange={update("fuel")}
                      options={["Petrol", "Diesel", "Hybrid", "Mild Hybrid", "Electric", "Other"]}
                      required
                    />
                    <FormSelect
                      label="Transmission"
                      value={form.transmission}
                      onChange={update("transmission")}
                      options={["Automatic", "Manual"]}
                      required
                    />
                    <FormInput label="Colour" value={form.color} onChange={update("color")} placeholder="e.g. Nardo Grey" />
                    <FormSelect
                      label="Overall Condition"
                      value={form.condition}
                      onChange={update("condition")}
                      options={["Excellent", "Very Good", "Good", "Fair", "Needs Attention"]}
                      required
                    />
                  </div>
                  <FormSelect
                    label="Service History"
                    value={form.serviceHistory}
                    onChange={update("serviceHistory")}
                    options={["Full Manufacturer Service History", "Full Service History", "Partial Service History", "No Service History"]}
                  />
                  <FormInput
                    label="Desired Price (£)"
                    value={form.asking}
                    onChange={update("asking")}
                    placeholder="Your ideal price or 'open to offers'"
                  />
                </div>

                {/* Additional Notes */}
                <div
                  style={{
                    background: "rgba(212,175,55,0.03)",
                    border: "1px solid rgba(212,175,55,0.1)",
                    padding: "2rem",
                    marginBottom: "2rem",
                  }}
                >
                  <FormTextarea
                    label="Additional Information"
                    value={form.notes}
                    onChange={update("notes")}
                    placeholder="Any modifications, known defects, extras included, or anything else we should know..."
                    rows={4}
                  />
                </div>

                <GoldButton type="submit" fullWidth>
                  Submit Valuation Request
                </GoldButton>

                <p
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: "0.65rem",
                    color: "rgba(255,255,255,0.3)",
                    textAlign: "center",
                    marginTop: "1rem",
                    lineHeight: 1.6,
                  }}
                >
                  By submitting this form you agree to be contacted by Harpo Automotives 
                  regarding your vehicle valuation. We never share your details with third parties.
                </p>
              </form>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
