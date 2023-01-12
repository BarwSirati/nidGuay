type Props = {
  children: JSX.Element;
};
const AppLayout = ({ children }: Props) => {
  return <div className="app-layout">{children}</div>;
};

export default AppLayout;
