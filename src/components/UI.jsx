// Shared styled input/textarea/select components

export function FormInput({ label, type = "text", value, onChange, placeholder, required }) {
  return (
    <div style={{ marginBottom: "1.25rem" }}>
      <label
        style={{
          display: "block",
          fontFamily: "'Montserrat', sans-serif",
          fontSize: "0.6rem",
          fontWeight: "600",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.5)",
          marginBottom: "0.5rem",
        }}
      >
        {label} {required && <span style={{ color: "#D4AF37" }}>*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        style={{
          width: "100%",
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.12)",
          padding: "0.85rem 1rem",
          fontFamily: "'Montserrat', sans-serif",
          fontSize: "0.82rem",
          color: "#fff",
          outline: "none",
          transition: "border-color 0.3s",
          boxSizing: "border-box",
        }}
        onFocus={(e) => (e.target.style.borderColor = "#D4AF37")}
        onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.12)")}
      />
    </div>
  );
}

export function FormTextarea({ label, value, onChange, placeholder, required, rows = 5 }) {
  return (
    <div style={{ marginBottom: "1.25rem" }}>
      <label
        style={{
          display: "block",
          fontFamily: "'Montserrat', sans-serif",
          fontSize: "0.6rem",
          fontWeight: "600",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.5)",
          marginBottom: "0.5rem",
        }}
      >
        {label} {required && <span style={{ color: "#D4AF37" }}>*</span>}
      </label>
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        rows={rows}
        style={{
          width: "100%",
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.12)",
          padding: "0.85rem 1rem",
          fontFamily: "'Montserrat', sans-serif",
          fontSize: "0.82rem",
          color: "#fff",
          outline: "none",
          transition: "border-color 0.3s",
          resize: "vertical",
          boxSizing: "border-box",
        }}
        onFocus={(e) => (e.target.style.borderColor = "#D4AF37")}
        onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.12)")}
      />
    </div>
  );
}

export function FormSelect({ label, value, onChange, options, required }) {
  return (
    <div style={{ marginBottom: "1.25rem" }}>
      <label
        style={{
          display: "block",
          fontFamily: "'Montserrat', sans-serif",
          fontSize: "0.6rem",
          fontWeight: "600",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.5)",
          marginBottom: "0.5rem",
        }}
      >
        {label} {required && <span style={{ color: "#D4AF37" }}>*</span>}
      </label>
      <select
        value={value}
        onChange={onChange}
        required={required}
        style={{
          width: "100%",
          background: "#0E0E12",
          border: "1px solid rgba(255,255,255,0.12)",
          padding: "0.85rem 1rem",
          fontFamily: "'Montserrat', sans-serif",
          fontSize: "0.82rem",
          color: value ? "#fff" : "rgba(255,255,255,0.4)",
          outline: "none",
          transition: "border-color 0.3s",
          boxSizing: "border-box",
          cursor: "pointer",
        }}
        onFocus={(e) => (e.target.style.borderColor = "#D4AF37")}
        onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.12)")}
      >
        <option value="" disabled>Select an option</option>
        {options.map((opt) => (
          <option key={opt} value={opt} style={{ background: "#0E0E12" }}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}

export function GoldButton({ children, onClick, type = "button", fullWidth = false }) {
  return (
    <button
      type={type}
      onClick={onClick}
      style={{
        background: "#D4AF37",
        border: "none",
        cursor: "pointer",
        fontFamily: "'Montserrat', sans-serif",
        fontSize: "0.68rem",
        fontWeight: "600",
        letterSpacing: "0.25em",
        textTransform: "uppercase",
        color: "#08080A",
        padding: "1rem 2.5rem",
        transition: "all 0.3s ease",
        width: fullWidth ? "100%" : "auto",
      }}
      onMouseEnter={(e) => {
        e.target.style.background = "#fff";
        e.target.style.transform = "translateY(-1px)";
      }}
      onMouseLeave={(e) => {
        e.target.style.background = "#D4AF37";
        e.target.style.transform = "translateY(0)";
      }}
    >
      {children}
    </button>
  );
}

export function OutlineButton({ children, onClick, type = "button" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      style={{
        background: "transparent",
        border: "1px solid rgba(212,175,55,0.5)",
        cursor: "pointer",
        fontFamily: "'Montserrat', sans-serif",
        fontSize: "0.68rem",
        fontWeight: "600",
        letterSpacing: "0.25em",
        textTransform: "uppercase",
        color: "#D4AF37",
        padding: "1rem 2.5rem",
        transition: "all 0.3s ease",
      }}
      onMouseEnter={(e) => {
        e.target.style.background = "rgba(212,175,55,0.1)";
        e.target.style.borderColor = "#D4AF37";
      }}
      onMouseLeave={(e) => {
        e.target.style.background = "transparent";
        e.target.style.borderColor = "rgba(212,175,55,0.5)";
      }}
    >
      {children}
    </button>
  );
}

export function SectionLabel({ children }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        marginBottom: "1rem",
      }}
    >
      <div style={{ width: "30px", height: "1px", background: "#D4AF37" }} />
      <span
        style={{
          fontFamily: "'Montserrat', sans-serif",
          fontSize: "0.6rem",
          fontWeight: "600",
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          color: "#D4AF37",
        }}
      >
        {children}
      </span>
    </div>
  );
}

export function PageHero({ label, title, subtitle, children }) {
  return (
    <section
      style={{
        background: "#08080A",
        padding: "10rem 2rem 5rem",
        textAlign: "center",
        borderBottom: "1px solid rgba(212,175,55,0.1)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "600px",
          height: "600px",
          background: "radial-gradient(circle, rgba(212,175,55,0.04) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div style={{ position: "relative", maxWidth: "800px", margin: "0 auto" }}>
        <SectionLabel>{label}</SectionLabel>
        <h1
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
            fontWeight: "300",
            color: "#fff",
            letterSpacing: "0.02em",
            lineHeight: 1.1,
            marginBottom: "1.25rem",
          }}
        >
          {title}
        </h1>
        {subtitle && (
          <p
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "0.85rem",
              color: "rgba(255,255,255,0.5)",
              lineHeight: 1.8,
              maxWidth: "500px",
              margin: "0 auto",
            }}
          >
            {subtitle}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}
