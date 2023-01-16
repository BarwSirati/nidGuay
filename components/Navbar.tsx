import { deleteCookie } from "cookies-next";
import { useRouter } from "next/router";
const Navbar = () => {
  const router = useRouter();
  return (
    <div className="navbar bg-orange-500 text-white">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl">
          ระบบคิดคำนวณหน่วยกิต
        </a>
      </div>
      <div className="flex-none">
        <ul className="cursor-pointer btn btn-ghost">
          <li>
            <a
              onClick={() => {
                deleteCookie("token");
                router.push("/")
              }}
            >
              ออกจากระบบ
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
