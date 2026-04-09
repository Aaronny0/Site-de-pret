export default function Loading() {
  return (
    <div
      style={{
        minHeight: "60vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "1.5rem",
        background: "var(--color-bg)",
      }}
      role="status"
      aria-label="Chargement en cours"
    >
      {/* Animated logo spinner */}
      <div
        style={{
          width: "56px",
          height: "56px",
          borderRadius: "50%",
          border: "3px solid var(--color-border)",
          borderTopColor: "var(--color-accent)",
          animation: "spin 0.8s linear infinite",
        }}
      />

      <div style={{ textAlign: "center" }}>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "1rem",
            fontWeight: "600",
            color: "var(--color-primary)",
            marginBottom: "0.25rem",
          }}
        >
          FinancePro
        </p>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.85rem",
            color: "var(--color-text-muted)",
          }}
        >
          Chargement…
        </p>
      </div>
    </div>
  );
}
