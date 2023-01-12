import { GetServerSideProps } from "next";
import axios from "axios";
import { getCookie } from "cookies-next";

const Home = () => {
  return <div>Home</div>;
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const token = getCookie("token", { req, res });
  if (!token) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
      props: {},
    };
  }
  return {
    props: {},
  };
};
export default Home;
