import { GetServerSideProps } from "next";
import axios from "axios";
import { getCookie } from "cookies-next";

interface Prop {
  token: string;
  userId: string;
}
const Home: React.FC<Prop> = ({ token, userId }) => {
  return <div>{userId}</div>;
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const checkToken = getCookie("token", { req, res });
  if (!checkToken) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
      props: {},
    };
  }
  const token = `Bearer ` + checkToken;
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND}/user/current/info`,
    {
      headers: {
        Authorization: token,
      },
    }
  );
  if (response.status !== 200) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
      props: {},
    };
  }
  const userId = response.data.id;
  return { props: { token, userId } };
};
export default Home;
