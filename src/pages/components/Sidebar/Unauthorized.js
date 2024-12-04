const Unauthorized = () => {
  const handleRedirect = () => {
    window.location.href = "/login";
  };

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
      <button
        onClick={handleRedirect}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          fontSize: "1em",
          cursor: "pointer",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "5px",
          transition: "all 0.3 ease",
        }}
      >
        Go to Login
      </button>
    </div>
  );
};

export default Unauthorized;