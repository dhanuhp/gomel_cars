function SectionContainer({ children, background }) {

  return (
    <section
      style={{
        padding: "80px 20px",
        background: background || "white"
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "auto"
        }}
      >
        {children}
      </div>
    </section>
  );
}

export default SectionContainer;