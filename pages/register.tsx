import Input from "../components/InputRegister";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Select from "../components/Select";
import axios from "axios";
import { GetServerSideProps } from "next";
import { Faculty } from "../types/faculty.type";
import { Branch } from "../types/branch.type";
import { Credit } from "../types/credit.type";
import { useRouter } from "next/router";
import { useState } from "react";

interface FormRegister {
  id: string;
  name: string;
  lastname: string;
  password: string;
  facultyId: number;
  branchId: number;
  credit: Credit;
}

interface SelectFaculty {
  name: string;
  value: number;
}

interface SelectBranch {
  name: string;
  value: number;
}

interface Props {
  facultys: SelectFaculty[];
  branchs: SelectBranch[];
}

const schema = yup.object().shape({
  id: yup
    .string()
    .length(8, "กรุณากรอกรหัสนักศึกษาให้ครบ")
    .required("กรุณากรอกรหัสนักศึกษา"),
  name: yup.string().required("กรุณากรอกชื่อ"),
  lastname: yup.string().required("กรุณากรอกนามสกุล"),
  password: yup
    .string()
    .min(8, "กรุณากรอกรหัสผ่านขั้นต่ำ 8 ตัว")
    .required("กรุณากรอกรหัสผ่าน"),

  facultyId: yup
    .number()
    .moreThan(0, "กรุณากรอกเลือกคณะ")
    .required("กรุณากรอกเลือกคณะ"),
  branchId: yup
    .number()
    .moreThan(0, "กรุณากรอกเลือกสาขา")
    .required("กรุณากรอกเลือกสาขา"),
  credit: yup
    .object()
    .shape({
      total: yup.number().required().typeError("กรุณากรอกหน่วยกิต"),
      gened: yup
        .object({
          basic: yup.number().required().typeError("กรุณากรอกหน่วยกิต"),

          language: yup.number().required().typeError("กรุณากรอกหน่วยกิต"),

          faculty: yup.number().required().typeError("กรุณากรอกหน่วยกิต"),

          elective: yup.number().required().typeError("กรุณากรอกหน่วยกิต"),
        })
        .required(),
      specific: yup
        .object({
          core: yup.number().required().typeError("กรุณากรอกหน่วยกิต"),
          specialized: yup.number().required().typeError("กรุณากรอกหน่วยกิต"),

          options: yup.number().required().typeError("กรุณากรอกหน่วยกิต"),

          branch_elective: yup
            .number()
            .required()
            .typeError("กรุณากรอกหน่วยกิต"),
        })
        .required(),
      free_electives: yup.number().required().typeError("กรุณากรอกหน่วยกิต"),
    })
    .required(),
});

const Register: React.FC<Props> = ({ facultys, branchs }) => {
  const [errorText, setErrorText] = useState("");
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormRegister>({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data: FormRegister) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND}/auth/register`,
        data
      );
      if (res.status === 201) {
        router.push("/login");
      }
    } catch (err) {
      setErrorText("มีรหัสนักศึกษานี้ในระบบแล้ว");
    }
  };
  return (
    <div className="flex flex-col justify-center items-center p-4 space-y-8 md:min-h-screen bg-orange-400">
      <div className="flex flex-col p-8 space-y-10 w-full bg-white rounded-2xl shadow max-w-5xl">
        <div className="text-3xl font-semibold text-center">สมัครสมาชิก</div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-2 text-lg font-medium"
        >
          <div className="grid gap-4 lg:grid-cols-3">
            <div className="w-full">
              <label htmlFor="">รหัสนักศึกษา</label>
              <Input
                type="text"
                placeholder="รหัสนักศึกษา"
                register={register("id", { required: true })}
              />
              {errors.id && (
                <p className="text-base font-semibold text-red-500">
                  * {errors.id.message}
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
          <div className="grid gap-4 lg:grid-cols-3">
            <div className="w-full">
              <label htmlFor="">รหัสผ่าน</label>
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
            <div className="w-full">
              <label htmlFor="">คณะ</label>
              <Select
                register={register("facultyId", { required: true })}
                options={facultys}
              />
              {errors.facultyId && (
                <p className="text-base font-semibold text-red-500">
                  * {errors.facultyId.message}
                </p>
              )}
            </div>
            <div className="w-full">
              <label htmlFor="">สาขา</label>
              <Select
                register={register("branchId", { required: true })}
                options={branchs}
              />
              {errors.branchId && (
                <p className="text-base font-semibold text-red-500">
                  * {errors.branchId.message}
                </p>
              )}
            </div>
          </div>
          <div className="grid gap-4 grid-cols">
            <div className="w-full">
              <label htmlFor="">จำนวนหน่วยกิตรวมตลอดหลักสูตร</label>
              <Input
                type="number"
                placeholder="จำนวนหน่วยกิตรวมตลอดหลักสูตร"
                register={register("credit.total", { required: true })}
              />
              {errors.credit?.total && (
                <p className="text-base font-semibold text-red-500">
                  * {errors.credit.total.message}
                </p>
              )}
            </div>
          </div>
          <div className="w-full">
            <label htmlFor="">หมวดวิชาศึกษาทั่วไป</label>
          </div>
          <div className="grid gap-4 lg:grid-cols-4">
            <div className="w-full">
              <Input
                type="number"
                placeholder="วิชาพื้นฐาน"
                register={register("credit.gened.basic", { required: true })}
              />
              {errors.credit?.gened?.basic && (
                <p className="text-base font-semibold text-red-500">
                  * {errors.credit.gened.basic.message}
                </p>
              )}
            </div>
            <div className="w-full">
              <Input
                type="number"
                placeholder="วิชาด้านภาษาและการสื่อสาร "
                register={register("credit.gened.language", { required: true })}
              />
              {errors.credit?.gened?.language && (
                <p className="text-base font-semibold text-red-500">
                  * {errors.credit.gened.language.message}
                </p>
              )}
            </div>
            <div className="w-full">
              <Input
                type="number"
                placeholder="วิชาตามเกณฑ์ของคณะ"
                register={register("credit.gened.faculty", { required: true })}
              />
              {errors.credit?.gened?.faculty && (
                <p className="text-base font-semibold text-red-500">
                  * {errors.credit.gened.faculty.message}
                </p>
              )}
            </div>
            <div className="w-full">
              <Input
                type="number"
                placeholder="วิชาเลือก"
                register={register("credit.gened.elective", { required: true })}
              />
              {errors.credit?.gened?.elective && (
                <p className="text-base font-semibold text-red-500">
                  * {errors.credit.gened.elective.message}
                </p>
              )}
            </div>
          </div>
          <div className="w-full">
            <label htmlFor="">หมวดวิชาเฉพาะ</label>
          </div>
          <div className="grid gap-4 lg:grid-cols-4">
            <div className="w-full">
              <Input
                type="number"
                placeholder="วิชาแกน"
                register={register("credit.specific.core", { required: true })}
              />
              {errors.credit?.specific?.core && (
                <p className="text-base font-semibold text-red-500">
                  * {errors.credit.specific.core.message}
                </p>
              )}
            </div>
            <div className="w-full">
              <Input
                type="number"
                placeholder="วิชาเฉพาะด้าน"
                register={register("credit.specific.specialized", {
                  required: true,
                })}
              />
              {errors.credit?.specific?.specialized && (
                <p className="text-base font-semibold text-red-500">
                  * {errors.credit.specific.specialized.message}
                </p>
              )}
            </div>
            <div className="w-full">
              <Input
                type="number"
                placeholder="วิชาการศึกษาทางเลือก"
                register={register("credit.specific.options", {
                  required: true,
                })}
              />
              {errors.credit?.specific?.options && (
                <p className="text-base font-semibold text-red-500">
                  * {errors.credit.specific.options.message}
                </p>
              )}
            </div>
            <div className="w-full">
              <Input
                type="number"
                placeholder="วิชาเลือกเฉพาะสาขา"
                register={register("credit.specific.branch_elective", {
                  required: true,
                })}
              />
              {errors.credit?.specific?.branch_elective && (
                <p className="text-base font-semibold text-red-500">
                  * {errors.credit.specific.branch_elective.message}
                </p>
              )}
            </div>
          </div>
          <div className="grid gap-4 lg:grid-cols">
            <div className="w-full">
              <div className="w-full">
                <label htmlFor="">หมวดวิชาเลือกเสรี</label>
              </div>
              <Input
                type="number"
                placeholder="หมวดวิชาเลือกเสรี"
                register={register("credit.free_electives", { required: true })}
              />
              {errors.credit?.free_electives && (
                <p className="text-base font-semibold text-red-500">
                  * {errors.credit.free_electives.message}
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
export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const fetchFaculty = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND}/faculty`
  );
  const dataFacultys = fetchFaculty.data;

  const fetchBranch = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND}/branch`
  );
  const dataBranchs = fetchBranch.data;

  const facultys: SelectFaculty[] = [{ name: "เลือกคณะ", value: 0 }];
  const branchs: SelectBranch[] = [{ name: "เลือกสาขา", value: 0 }];
  dataFacultys.forEach((data: Faculty) => {
    const faculty: SelectFaculty = { name: data.name, value: data.id };
    facultys.push(faculty);
  });

  dataBranchs.forEach((data: Branch) => {
    const branch: SelectBranch = { name: data.name, value: data.id };
    branchs.push(branch);
  });

  return { props: { facultys, branchs } };
};
export default Register;
