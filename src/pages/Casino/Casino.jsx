/* eslint-disable react/no-unknown-property */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API, Settings } from "../../api";
import Loader from "../../components/ui/Loader/Loader";
import { AxiosSecure } from "../../lib/AxiosSecure";

const Casino = () => {
  const [iFrame, setIFrame] = useState("");
  const token = localStorage.getItem("token");
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
    const getCasinoVideo = async () => {
      setLoading(true);

      let payload = {
        gameId: id?.toString(),
        isHome: false,
        mobileOnly: true,
        casino_currency: Settings.casino_currency,
      };
      try {
        const res = await AxiosSecure.post(API.liveCasinoIFrame, payload);
        const data = res?.data;
        setIFrame(data?.gameUrl);
        setLoading(false);
        // window.open(data?.gameUrl, "_blank");
      } catch (error) {
        setLoading(false);
        console.error("Error opening casino game:", error);
        // Handle error as needed
      }
    };
    getCasinoVideo();
  }, [id, token]);

  if (loading) {
    return <Loader />;
  }
  return (
    <div
      _ngcontent-ng-c943649379=""
      class="page-body"
      style={{ height: "100vh", backgroundColor: "black" }}
    >
      <iframe
        allow="fullscreen;"
        src={iFrame}
        style={{
          // position: "fixed",
          // top: "0",
          // left: "0",
          // bottom: "0",
          // right: "0",
          width: "100%",
          height: "100vh",
          border: "none",
          margin: "0",
          padding: "0",
          overflow: "hidden",
          zIndex: "999999",
        }}
      ></iframe>
    </div>
  );
};

export default Casino;
