import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import gif from "../assets/overview.gif";

const Overview = () => {
  const { userId } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (userId) navigate("/dash");
  }, []);

  return (
    <div className="overview">
      <div>
        <div>Food</div>
        <img src={gif} alt="Yums" />
        <div style={{ alignSelf: "flex-end" }}>Remembered</div>
      </div>
    </div>
  );
};

export default Overview;
