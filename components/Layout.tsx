import { Fragment } from "react";
import Navbar from "./Navbar";

type Props = {
  children: JSX.Element;
};

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <Fragment>
      <Navbar />
      <div className="w-full">{children}</div>
    </Fragment>
  );
};

export default Layout;
