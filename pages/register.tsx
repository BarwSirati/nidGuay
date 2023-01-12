import Input from "../components/Input";

const Register: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center p-4 space-y-8 min-h-screen bg-orange-400">
      <div className="flex flex-col p-8 space-y-10 w-full max-w-5xl bg-white rounded-2xl shadow">
        <div className="text-3xl font-semibold text-center">
          Register สมัครสมาชิก
        </div>
        <form className="space-y-8 text-lg font-medium">
          <div className="grid gap-4 lg:grid-cols-3">
            <div className="w-full">
              <label htmlFor="">รหัสนักศึกษา</label>
              <Input type="text" placeholder="รหัสนักศึกษา" />
            </div>
            <div className="w-full">
              <label htmlFor="">ชื่อ</label>
              <Input type="text" placeholder="ชื่อ" />
            </div>
            <div className="w-full">
              <label htmlFor="">นามสกุล</label>
              <Input type="text" placeholder="นามสกุล" />
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
