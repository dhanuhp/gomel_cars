function SkeletonCard() {
  return (
    <div
      style={{
        width: "260px",
        padding: "15px",
        borderRadius: "12px",
        background: "#f0f0f0",
        animation: "pulse 1.5s infinite"
      }}
    >
      <div
        style={{
          height: "160px",
          background: "#ddd",
          borderRadius: "10px",
          marginBottom: "15px"
        }}
      />

      <div
        style={{
          height: "20px",
          width: "70%",
          background: "#ddd",
          marginBottom: "10px",
          borderRadius: "5px"
        }}
      />

      <div
        style={{
          height: "16px",
          width: "50%",
          background: "#ddd",
          marginBottom: "10px",
          borderRadius: "5px"
        }}
      />

      <div
        style={{
          height: "35px",
          width: "100%",
          background: "#ddd",
          borderRadius: "6px"
        }}
      />
    </div>
  );
}

export default SkeletonCard;