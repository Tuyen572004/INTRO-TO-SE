import React from "react";
import { useOutletContext } from "react-router-dom";
import NewPost from "../../molecules/NewPost/NewPost";

const Dashboard = () => {
  // Access `toggleIsPostPopup` from the outlet context
  const { toggleIsPostPopup } = useOutletContext();

  return (
    <>
      <NewPost toggleIsPostPopup={toggleIsPostPopup} />
    </>
  );
};

export default Dashboard;
