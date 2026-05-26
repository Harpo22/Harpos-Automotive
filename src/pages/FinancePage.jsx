import { useState } from "react";
import { PageHero, FormInput, FormSelect, GoldButton, SectionLabel } from "../components/UI";

export default function FinancePage({ navigate }) {
  const [submitted, setSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState("PCP");
  const [form, setForm] = useState({
    name: "", email: "", phone: "",
    vehicle: "", price: "", deposit: "",
    term: "", employment: "", income: "",
    type: "PCP",
  });

  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const financeTypes = {
    PCP: {
      title: "Personal Contract Purchase",
      desc: "The most popular choice for prestige vehicles. Pay a deposit, make fixed monthly payments over 24–48 months, then choose to return the car, pay a final 'balloon' payment to own it, or part exchange into a new model. Typically offers the lowest monthly payments.",
      pros: ["Lowest monthly payments", "Flexibility at end of term", "Easy to upgrade every 2-3 years", "Manufacturer finance deals available"],
    },
    HP: {
      title: "Hire Purchase",
      desc: "A straightforward way to own your vehicle outright at the end of the agreement. You pay a deposit then fixed monthly payments. Once the final payment is made, the car is yours with no balloon payment or optional final payment.",
      pros: ["You own the car at end", "Simple and transparent", "No mileage restrictions", "No balloon payment risk"],
    },
    PCH: {
      title: "Personal Contract Hire",
      desc: "Essentially a long-term rental arrangement. Pay a fixed monthly fee to use the vehicle for an agreed term and mileage. No option to purchase at the end — simply hand the car back and choose a new one. Great for those who always want the latest models.",
      pros: ["Always drive the latest model", "Fixed monthly costs", "Maintenance packages available", "No depreciation risk"],
    },
    B2B: {
      title: "Business & Fleet Finance",
      desc: "Tailored finance solutions for business owners and company vehicles. Benefit from tax advantages, VAT reclaim, and flexible arrangements designed around your company's cashflow. Speak to our business specialists for a bespoke quote.",
      pros: ["VAT reclaimable on HP/lease", "Corporation tax benefits", "Off-balance-sheet options", "Dedicated account manager"],
    },
  };

  return (
    <div style={{ background: "#08080A", minHeight: "100vh" }}>
      <PageHero
        label="Finance Solutions"
        title="Flexible Finance For Every Driver"
        subtitle="Working with the UK's leading lenders to secure you the most competitive rates — with decisions often within 24 hours."
      />

      {/* Finance Type Explainer */}
      <section style={{ padding: "5rem 2rem", borderBottom: "1px solid rgba(212,175,55,0.08)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <SectionLabel>Finance Options</SectionLabel>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "2.5rem",
                fontWeight: "300",
                color: "#fff",
              }}
            >
              Choose Your Finance Type
            </h2>
          </div>

          {/* Tabs */}
          <div
            style={{
              display: "flex",
              gap: "0",
              marginBottom: "2rem",
              overflowX: "auto",
              borderBottom: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            {Object.keys(financeTypes).map((type) => (
              <button
                key={type}
                onClick={() => setActiveTab(type)}
                style={{
                  background: "none",
                  border: "none",
                  borderBottom: activeTab === type
                    ? "2px solid #D4AF37"
                    : "2px solid transparent",
                  cursor: "pointer",
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "0.65rem",
                  fontWeight: "600",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: activeTab === type ? "#D4AF37" : "rgba(255,255,255,0.4)",
                  padding: "1rem 1.5rem",
                  transition: "all 0.3s",
                  whiteSpace: "nowrap",
                  marginBottom: "-1px",
                }}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "3rem",
              padding: "2rem",
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div>
              <h3
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "1.8rem",
                  color: "#fff",
                  marginBottom: "1rem",
                }}
              >
                {financeTypes[activeTab].title}
              </h3>
              <p
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "0.82rem",
                  color: "rgba(255,255,255,0.5)",
                  lineHeight: 1.9,
                }}
              >
                {financeTypes[activeTab].desc}
              </p>
            </div>
            <div>
              <h4
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "0.6rem",
                  fontWeight: "600",
                  letterSpacing: "0.2em",
                  color: "#D4AF37",
                  textTransform: "uppercase",
                  marginBottom: "1.25rem",
                }}
              >
                Key Benefits
              </h4>
              {financeTypes[activeTab].pros.map((pro) => (
                <div
                  key={pro}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    marginBottom: "0.85rem",
                  }}
                >
                  <span style={{ color: "#D4AF37", fontSize: "0.6rem" }}>◆</span>
                  <span
                    style={{
                      fontFamily: "'Montserrat', sans-serif",
                      fontSize: "0.8rem",
                      color: "rgba(255,255,255,0.65)",
                    }}
                  >
                    {pro}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Finance Enquiry Form */}
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
                Finance Enquiry Received
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
                A finance specialist will review your details and be in touch 
                within one business day with tailored options.
              </p>
              <GoldButton onClick={() => navigate("inventory")}>Browse Vehicles</GoldButton>
            </div>
          ) : (
            <>
              <div style={{ textAlign: "center", marginBottom: "3rem" }}>
                <SectionLabel>Finance Enquiry</SectionLabel>
                <h2
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "2.5rem",
                    fontWeight: "300",
                    color: "#fff",
                    marginBottom: "0.75rem",
                  }}
                >
                  Get a Finance Quote
                </h2>
                <p
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: "0.8rem",
                    color: "rgba(255,255,255,0.4)",
                  }}
                >
                  Subject to status. Finance available to UK residents 18+ only.
                </p>
              </div>

              <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
                {/* Contact */}
                <div style={{ background: "rgba(212,175,55,0.03)", border: "1px solid rgba(212,175,55,0.1)", padding: "2rem", marginBottom: "1.5rem" }}>
                  <h3 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.62rem", fontWeight: "600", letterSpacing: "0.25em", textTransform: "uppercase", color: "#D4AF37", marginBottom: "1.5rem" }}>
                    Your Details
                  </h3>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 1rem" }}>
                    <FormInput label="Full Name" value={form.name} onChange={update("name")} placeholder="Your full name" required />
                    <FormInput label="Phone Number" type="tel" value={form.phone} onChange={update("phone")} placeholder="07xxx xxxxxx" required />
                  </div>
                  <FormInput label="Email Address" type="email" value={form.email} onChange={update("email")} placeholder="your@email.com" required />
                </div>

                {/* Vehicle & Finance */}
                <div style={{ background: "rgba(212,175,55,0.03)", border: "1px solid rgba(212,175,55,0.1)", padding: "2rem", marginBottom: "1.5rem" }}>
                  <h3 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.62rem", fontWeight: "600", letterSpacing: "0.25em", textTransform: "uppercase", color: "#D4AF37", marginBottom: "1.5rem" }}>
                    Vehicle & Finance Details
                  </h3>
                  <FormInput label="Vehicle of Interest" value={form.vehicle} onChange={update("vehicle")} placeholder="e.g. 2023 Audi RS6 or 'Open to suggestions'" />
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 1rem" }}>
                    <FormInput label="Approximate Vehicle Price (£)" value={form.price} onChange={update("price")} placeholder="e.g. 80,000" />
                    <FormInput label="Deposit Amount (£)" value={form.deposit} onChange={update("deposit")} placeholder="e.g. 10,000" />
                    <FormSelect label="Finance Type" value={form.type} onChange={update("type")} options={["PCP", "HP", "PCH", "Business Finance"]} />
                    <FormSelect label="Preferred Term" value={form.term} onChange={update("term")} options={["24 months", "36 months", "48 months", "60 months"]} />
                    <FormSelect label="Employment Status" value={form.employment} onChange={update("employment")} options={["Employed Full-Time", "Employed Part-Time", "Self-Employed", "Director/Business Owner", "Retired", "Other"]} />
                    <FormInput label="Annual Income (£)" value={form.income} onChange={update("income")} placeholder="Approximate gross income" />
                  </div>
                </div>

                <GoldButton type="submit" fullWidth>
                  Submit Finance Enquiry
                </GoldButton>

                <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.62rem", color: "rgba(255,255,255,0.25)", textAlign: "center", marginTop: "1rem", lineHeight: 1.6 }}>
                  Finance is subject to status and affordability checks. Harpo Automotives acts as a credit broker and is not a lender. 
                  All finance products are provided by FCA-authorised lenders.
                </p>
              </form>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
