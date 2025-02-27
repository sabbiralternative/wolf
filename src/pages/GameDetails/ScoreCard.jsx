const ScoreCard = ({ score2 }) => {
  return (
    <div
      style={{ marginTop: "2px" }}
      id="score-board"
      className="score-board  show mb-md-3"
    >
      <div className="sc_cw-main-container">
        <div className="sc_cw-header">
          <div
            className="sc_cw-team-info-desktop"
            style={{ width: "100%!important", fontWeight: 200 }}
          >
            <div
              style={{
                width: "100%",
                display: "grid",
                gridTemplateColumns: "auto auto auto",
                gridTemplateRows: "auto auto",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <span style={{ fontWeight: 500, fontSize: "16px" }}>
                  {score2?.team_name}
                </span>
                <span style={{ fontWeight: 500, fontSize: "16px" }}>
                  {score2?.team_runs}
                </span>
                <span style={{ fontWeight: 100, fontSize: "12px" }}>
                  {score2?.team_overs}
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  height: "100%!important",
                  textAlign: "center",
                  gridColumn: 2,
                  gridRow: "1/span 2",
                }}
              >
                <span
                  style={{
                    width: "100%",
                    fontWeight: 500,
                    fontSize: "12px",
                    paddingLeft: "50px",
                    paddingRight: "50px",
                    textTransform: "capitalize!important",
                  }}
                >
                  {score2?.status}
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  height: "100%!important",
                  textAlign: "right",
                  gridColumn: 3,
                  gridRow: "1/span 2",
                }}
              >
                <span
                  style={{
                    width: "100%",
                    fontWeight: 500,
                    fontSize: "10px",
                    textTransform: "capitalize!important",
                  }}
                />
              </div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <div>
                  <span style={{ fontWeight: 500, fontSize: "10px" }}>
                    {score2?.crr}
                    {/* CRR:<span style={{ fontWeight: 100 }}>6.47</span> */}
                  </span>
                </div>
                <div>
                  <span style={{ fontWeight: 500, fontSize: "10px" }}>
                    {score2?.rrr}
                    {/* RRR:<span style={{ fontWeight: 100 }}>0</span> */}
                  </span>
                </div>
                <div>
                  <span style={{ fontWeight: 500, fontSize: "10px" }}>
                    {score2?.status2}
                    {/* RRR:<span style={{ fontWeight: 100 }}>0</span> */}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="sc_cw-overs-info"
          style={{
            width: "100%!important",
            paddingTop: "2px",
            paddingBottom: "2px",
          }}
        >
          <div
            className
            style={{
              marginLeft: "5px!important",
              marginRight: "5px!important",
              display: "flex",
              justifyContent: "space-between",
              gap: "16px",
              overflowX: "auto",
              fontSize: "12px",
            }}
          >
            <div className="sc_cw-over">
              <span
                style={{
                  border: ".25px solid #000000",
                  borderRadius: "2px",
                  paddingLeft: "5px",
                  paddingRight: "5px",
                }}
              >
                {score2?.recent_overs?.[0]?.title}
              </span>
              {score2?.recent_overs?.[0]?.balls?.map((ball, i) => (
                <div key={i} className="sc_cw-ball">
                  {ball}
                </div>
              ))}
            </div>
            <div className="sc_cw-over">
              <span
                style={{
                  border: ".25px solid #000000",
                  borderRadius: "2px",
                  paddingLeft: "5px",
                  paddingRight: "5px",
                }}
              >
                {score2?.recent_overs?.[1]?.title}
              </span>
              {score2?.recent_overs?.[1]?.balls?.map((ball, i) => (
                <div key={i} className="sc_cw-ball">
                  {ball}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div
          className="sc_cw-other-info"
          style={{
            display: "flex",
            justifyContent: "space-between",
            overflowX: "auto",
            fontSize: "12px",
          }}
        >
          <div style={{ paddingLeft: "30px", paddingRight: "30px" }}>
            <span style={{ fontWeight: 600 }}>PSHIP R:</span>{" "}
            {score2?.partnership_runs}
          </div>
          <div style={{ paddingLeft: "30px", paddingRight: "30px" }}>
            <span style={{ fontWeight: 600 }}>PSHIP B:</span>{" "}
            {score2?.partnership_balls}
          </div>
          <div style={{ paddingLeft: "30px", paddingRight: "30px" }}>
            <span style={{ fontWeight: 600 }}>LAST WICKET:</span>{" "}
            {score2?.last_wicket}
          </div>
        </div>
        <div style={{ overflowX: "auto", width: "100%" }}>
          <div
            className="sc_cw-table-container"
            style={{
              minWidth: "100%",
              width: "max-content",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              className=" sc_cw-table-row sc_cw-desktop-row"
              style={{
                backgroundColor: "#cbcbcb",
                color: "#000000",
                paddingTop: "2px",
                paddingBottom: "2px",
                fontWeight: 600,
              }}
            >
              <div
                style={{
                  minWidth: "95px!important",
                  whiteSpace: "nowrap",
                  textAlign: "left!important",
                }}
              >
                Batsmen{" "}
              </div>
              <div style={{ minWidth: "40px!important", flex: "auto" }}>R</div>
              <div style={{ minWidth: "40px!important", flex: "auto" }}>B</div>
              <div style={{ minWidth: "40px!important", flex: "auto" }}>4s</div>
              <div style={{ minWidth: "40px!important", flex: "auto" }}>6s</div>
              <div style={{ minWidth: "40px!important", flex: "auto" }}>SR</div>
            </div>
            {score2?.batsmen?.map((batMen, i) => (
              <div
                key={i}
                className="sc_cw-table-row sc_cw-desktop-row"
                style={{ paddingTop: "2px", paddingBottom: "2px" }}
              >
                <div
                  style={{
                    minWidth: "95px!important",
                    whiteSpace: "nowrap",
                    textAlign: "left!important",
                  }}
                >
                  {batMen?.name}
                </div>
                <div style={{ minWidth: "40px!important", flex: "auto" }}>
                  {batMen?.runs}
                </div>
                <div style={{ minWidth: "40px!important", flex: "auto" }}>
                  {batMen?.balls}
                </div>
                <div style={{ minWidth: "40px!important", flex: "auto" }}>
                  {batMen?.four}
                </div>
                <div style={{ minWidth: "40px!important", flex: "auto" }}>
                  {batMen?.six}
                </div>
                <div style={{ minWidth: "40px!important", flex: "auto" }}>
                  {batMen?.sr}
                </div>
              </div>
            ))}
          </div>

          <div
            className="sc_cw-table-container"
            style={{
              minWidth: "100%",
              width: "max-content",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              className="sc_cw-table-row sc_cw-desktop-row"
              style={{
                display: "flex",
                justifyContent: "space-between",
                paddingTop: "2px",
                paddingBottom: "2px",
                backgroundColor: "#cbcbcb",
                color: " #000000",
                fontWeight: 600,
              }}
            >
              <div
                style={{
                  display: "flex!important",
                  alignItems: "center!important",
                  justifyContent: "left!important",
                  minWidth: "95px!important",
                  whiteSpace: "nowrap",
                  textAlign: "left!important",
                  height: "100%",
                }}
              >
                <span style={{ marginLeft: "5px" }}>Bowler</span>
              </div>
              <div style={{ minWidth: "40px!important" }}>O</div>
              <div style={{ minWidth: "40px!important" }}>M</div>
              <div style={{ minWidth: "40px!important" }}>R</div>
              <div style={{ minWidth: "40px!important" }}>W</div>
              <div style={{ minWidth: "40px!important" }}>Eco</div>
            </div>

            <div
              className="sc_cw-table-row sc_cw-desktop-row"
              style={{
                display: "flex",
                justifyContent: "space-between",
                paddingTop: "2px",
                paddingBottom: "2px",
              }}
            >
              <div
                style={{
                  display: "flex!important",
                  alignItems: "center!important",
                  justifyContent: "left!important",
                  minWidth: "95px!important",
                  whiteSpace: "nowrap",
                  textAlign: "left!important",
                  height: "100%",
                }}
              >
                <span style={{ marginLeft: "5px" }}>
                  {score2?.bowler?.name}
                </span>
              </div>
              <div style={{ minWidth: "40px!important" }}>
                {score2?.bowler?.overs}
              </div>
              <div style={{ minWidth: "40px!important" }}>
                {score2?.bowler?.maidens}
              </div>
              <div style={{ minWidth: "40px!important" }}>
                {score2?.bowler?.runs}
              </div>
              <div style={{ minWidth: "40px!important" }}>
                {score2?.bowler?.wickets}
              </div>
              <div style={{ minWidth: "40px!important" }}>
                {score2?.bowler?.eco}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScoreCard;
