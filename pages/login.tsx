import Link from "next/link";
import Input from "../components/InputLogin";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { setCookie } from "cookies-next";
import { useRouter } from "next/router";
import { Fragment } from "react";
import { ImGithub } from "react-icons/im";
import { useState } from "react";
import { BiError } from "react-icons/bi";

interface FormLogin {
  username: string;
  password: string;
}

const schema = yup.object().shape({
  username: yup.string().required("กรุณากรอกรหัสนักศึกษา"),
  password: yup.string().required("กรุณากรอกรหัสผ่าน"),
});

const Login: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormLogin>({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data: FormLogin) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND}/auth/login`,
        data
      );
      if (res.status === 201) {
        setCookie("token", res.data.access_token[0], {
          maxAge: 7 * 24 * 60 * 60,
          path: "/",
          sameSite: "strict",
          secure: true,
        });
        router.push("/");
      }
    } catch (err) {
      setIsOpen(true);
    }
  };
  return (
    <Fragment>
      <div className="flex flex-col justify-center items-center px-4 space-y-8 min-h-screen bg-orange-400">
        <h1 className="text-3xl font-semibold">ระบบคิดคำนวณหน่วยกิต</h1>
        <div className="flex overflow-hidden flex-row w-full max-w-5xl rounded-2xl shadow">
          <div className="hidden flex-col flex-auto items-center p-8 space-y-10 bg-orange-300 md:flex">
            <div className="flex flex-row items-center self-start"></div>
            <Image
              src={"/images/loginLogo.svg"}
              alt="access-account"
              width={2}
              height={2}
              className="w-80"
            />
            <div className="text-sm font-medium text-center">
              <label htmlFor="my-modal">
                <p className="link-primary cursor-pointer">
                  [ รายละเอียดระบบ ]
                </p>
              </label>

              <p>คณะวิศวกรรมศาสตร์ สาขาวิศวกรรมคอมพิวเตอร์</p>
              <p>สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง</p>
            </div>
          </div>
          <div className="flex flex-col flex-auto p-8 bg-white divide-y divide-gray-200">
            <div className="pb-4 space-y-2">
              <div className="text-3xl font-semibold text-center">
                ลงชื่อเข้าสู่ระบบ
              </div>
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="pt-4 space-y-5 text-lg font-medium"
            >
              <div>
                รหัสนักศึกษา
                <Input
                  type="text"
                  placeholder="รหัสนักศึกษา"
                  register={register("username", { required: true })}
                />
                {errors.username && (
                  <p className="text-base font-semibold text-red-500">
                    * {errors.username.message}
                  </p>
                )}
              </div>

              <div>
                รหัสผ่าน
                <Input
                  type="password"
                  placeholder="รหัสผ่าน"
                  register={register("password", { required: true })}
                />
                {errors.password && (
                  <p className="text-base font-semibold text-red-500">
                    * {errors.password.message}
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="py-4 px-16 w-full text-white bg-orange-500 rounded-xl hover:border-transparent"
              >
                เข้าสู่ระบบ
              </button>
              <div className="text-base font-medium text-center">
                ยังไม่มีบัญชีผู้ใช้งาน?
                <Link href="register" className="ml-1 text-orange-600">
                  สมัครสมาชิก
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
      <input type="checkbox" id="my-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg text-center">รายละเอียดระบบ</h3>
          <p className="py-4">
            ระบบนี้ไม่เกี่ยวข้องกับทางสถาบันหรือระบบของทางสำนักทะเบียน
            เป็นระบบที่นักศึกษาวิศวกรรมศาสตร์ สาขาคอมพิวเตอร์ กลุ่มนึง
            ที่ขี้เกียจคิดคำนวณหน่วยกิตทีได้เรียนมา
            จึงได้รวมตัวและทำระบบนี้ขึ้นมา
          </p>
          <a
            href="https://github.com/BarwSirati/nidGuay"
            target={"_blank"}
            rel="noreferrer"
          >
            <ImGithub className="mx-auto text-2xl" />
          </a>
          <div className="modal-action">
            <label htmlFor="my-modal" className="btn btn-error text-white">
              close
            </label>
          </div>
        </div>
      </div>

      <div className={`modal ${isOpen ? "modal-open" : ""}`} id="my-modal-2">
        <div className="modal-box">
          <h3 className="font-bold text-lg space-x-5 flex justify-center text-red-500">
            <BiError className="text-2xl" /> Fail To Login
          </h3>
          <p className="pt-5 text-center font-semibold">
            Try Again !!! <br />
            <span>Username or Password is wrong </span>
          </p>
          <div className="modal-action">
            <button
              className="btn btn-error text-white"
              onClick={() => {
                setIsOpen(false);
              }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
