import { GetServerSideProps } from "next";
import axios from "axios";
import { getCookie } from "cookies-next";
import Layout from "../components/Layout";
import Image from "next/image";
import Stat from "../components/Stat";

interface Prop {
  token: string;
  userId: string;
}
const Home: React.FC<Prop> = ({ token, userId }) => {
  return (
    <Layout>
      <div className="w-full p-8">
        <div className="space-x-5 flex justify-center">
          <Stat
            color="bg-red-500"
            name="หมวดวิชาศึกษาทั่วไป"
            percent="21.58"
            total="12/50"
          />
        </div>
      </div>
    </Layout>
  );
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
