const Score = ({ score, eventTypeId }) => {
  return (
    <div>
      {eventTypeId == 2 && score ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            fontSize: "10px",
            color: "white",
            lineHeight: "10px",
          }}
        >
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <div style={{ color: "white", width: "150px" }}>
              {score?.player1}
            </div>
            <div style={{ color: "white", width: "150px" }}>
              {score?.player2}
            </div>
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <div style={{ display: "flex", gap: "10px" }}>
              {score?.set1?.map((item, i) => {
                return <div key={i}>{item}</div>;
              })}
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
              {score?.set2?.map((item, i) => {
                return <div key={i}>{item}</div>;
              })}
            </div>
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <span style={{ color: "#41b7fa" }}>{score?.team1Score}</span>
            <span style={{ color: "#41b7fa" }}>{score?.team2Score}</span>
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <span
              className={`${
                score?.service == 1 ? "active_service" : "deActive_service"
              }`}
            ></span>
            <span
              className={`${
                score?.service == 2 ? "active_service" : "deActive_service"
              }`}
            ></span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            <span
              style={{
                border: "1px solid white",
                padding: "1px 2px",
                borderRadius: "2px",
                textAlign: "end",
              }}
            >
              {score?.totalSet1}
            </span>
            <span
              style={{
                border: "1px solid white",
                padding: "1px 2px",
                borderRadius: "2px",
                textAlign: "end",
              }}
            >
              {score?.totalSet2}
            </span>
          </div>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            fontSize: "10px",
            color: "white",
            lineHeight: "10px",
          }}
        >
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <div style={{ color: "white", width: "150px" }}>
              {score?.player1}
            </div>
            <div style={{ color: "white", width: "150px" }}>
              {score?.player2}
            </div>
          </div>

          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <span>{score?.team1Score}</span>
            <span>{score?.team2Score}</span>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "5px",
              marginLeft: "5px",
            }}
          >
            <span>{score?.timeStatus}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Score;
