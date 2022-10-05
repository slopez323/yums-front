import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

const Overview = () => {
  const { userId } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (userId) navigate("/dash");
  }, []);

  return (
    <div className="overview">
      <div>
        <p>Food Diary.</p>
        <p>Remember the yums.</p>
      </div>
      <div>
        <img src="" alt="" />
      </div>
    </div>
  );
};

export default Overview;
