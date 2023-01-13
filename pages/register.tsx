import Input from "../components/Input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

interface FormRegister {
  username: string;
  name: string;
  lastname: string;
}

const schema = yup.object().shape({
  username: yup.string().required("กรุณากรอกรหัสนักศึกษา"),
  name: yup.string().required("กรุณากรอกชื่อ"),
  lastname: yup.string().required("กรุณากรอกนามสกุล"),
});

const Register: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormRegister>({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data: FormRegister) => {
    console.log(data);
  };
  return (
    <div className="flex flex-col justify-center items-center p-4 space-y-8 min-h-screen bg-orange-400">
      <div className="flex flex-col p-8 space-y-10 w-full bg-white rounded-2xl shadow max-w-md">
        <div className="text-3xl font-semibold text-center">
          Register สมัครสมาชิก
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-8 text-lg font-medium"
        >
          <div className="grid gap-4 grid-cols">
            <div className="w-full">
              <label htmlFor="">รหัสนักศึกษา</label>
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
            <div className="w-full">
              <label htmlFor="">ชื่อ</label>
              <Input
                type="text"
                placeholder="ชื่อ"
                register={register("name", { required: true })}
              />
              {errors.name && (
                <p className="text-base font-semibold text-red-500">
                  * {errors.name.message}
                </p>
              )}
            </div>
            <div className="w-full">
              <label htmlFor="">นามสกุล</label>
              <Input
                type="text"
                placeholder="นามสกุล"
                register={register("lastname", { required: true })}
              />
              {errors.lastname && (
                <p className="text-base font-semibold text-red-500">
                  * {errors.lastname.message}
                </p>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="py-4 px-16 w-full text-white bg-orange-500 rounded-xl hover:border-transparent"
          >
            สมัครสมาชิก
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
