import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Overview = ({ username }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (username) navigate("/dash");
  }, []);

  return (
    <div id="intro" className="main-content">
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
