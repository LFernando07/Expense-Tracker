import type React from "react";
import { Link } from "react-router";

const NotFoundPage: React.FC = () => {
  return (
    <>
      <h1>Not Found Page</h1>
      <p>Return to security page</p>
      <Link to={"/"}>Home</Link>
    </>
  );
};

export default NotFoundPage;
