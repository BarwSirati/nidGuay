import Link from "next/link";

const login = () => {
  return (
    <div className="hero min-h-screen bg-[#F7F5EB]">
      <div className="w-1/2 h-4/5 bg-[#EAE0DA] rounded-xl py-11 px-20">
        <h1 className="text-5xl pb-14 font-semibold flex justify-center">
          Sign in
        </h1>
        <h2 className="text-2xl font-semibold pb-2">Username</h2>
        <div className="pb-6">
          <input
            type="text"
            placeholder="Enter username"
            className="w-full rounded-lg px-4 py-3 focus: outline-[#A0C3D2]"
          />
        </div>
        <h2 className="text-2xl font-semibold pb-2">Password</h2>
        <div className="pb-10">
          <input
            type="text"
            placeholder="Enter password"
            className="w-full rounded-lg px-4 py-3 focus: outline-[#A0C3D2]"
          />
        </div>
        <div className="pb-4 ">
          <button className="w-full h-16 rounded-lg bg-[#EAC7C7] text-2xl font-semibold text-gray-600 hover:bg-[#EFC7C7]">
            Submit
          </button>
        </div>
        <div>
          <a className=" text-slate-600" href="/register">Don't have an account? Sign Up</a>
        </div>
      </div>
    </div>
  );
};

export default login;
