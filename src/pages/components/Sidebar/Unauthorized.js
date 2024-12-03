const Unauthorized = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f8d7da",
        color: "black",
        textAlign: "center",
        padding: "20px",
        boxSizing: "border-box",
      }}
    >
      <h1
        style={{
          fontSize: "4em",
          margin: "0",
          padding: "0",
        }}
      >
        Unauthorized
      </h1>
      <p
        style={{
          fontSize: "1.5em",
          margin: "20px 0 0 0",
        }}
      >
        You are not authorized to view this page
      </p>
    </div>
  );
};

export default Unauthorized;
