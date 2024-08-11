import { useGeneralContext } from "../utils/contexts/GeneralContext";
import Link from "next/link";
import useLogout from "../utils/hooks/useLogout";

export default function SubNav() {
  const {
    subNavItems,
    setShowLogin,
    setShowSubNav,
    setShowSignup,
    token,
  } = useGeneralContext();
  const { logout } = useLogout();

  return (
    <div className="w-[20rem] space-y-3 shadow-lg absolute bg-white right-2 p-5 rounded-lg top-[5rem]">
      <div>
        {subNavItems.auth.map((item, idx) => {
          if (item.title == "Login") {
            if (token.trim() == "") {
              return (
                <button
                  key={idx}
                  onClick={() => {
                    setShowSubNav(false);
                    setShowLogin(true);
                  }}
                  className="hover_btn block !py-3 !px-4 !w-full text-left"
                >
                  <p className="">{item.title}</p>
                </button>
              );
            }

            return;
          }
          if (item.title == "Signup") {
            if (token.trim() == "") {
              return (
                <button
                  key={idx}
                  onClick={() => {
                    setShowSubNav(false);
                    setShowSignup(true);
                  }}
                  className="hover_btn block !py-3 !px-4 !w-full text-left"
                >
                  <p className="">{item.title}</p>
                </button>
              );
            }
            return;
          }
          return (
            <Link href={item.route} key={idx}>
              <button
                onClick={() => {
                  setShowSubNav(false);
                }}
                className="hover_btn block !py-3 !px-4 !w-full text-left"
              >
                <p className="">{item.title}</p>
              </button>
            </Link>
          );
        })}
      </div>
      {token.trim() == "" && <hr />}
      <div>
        {token.trim() != "" &&
          subNavItems.personal.map((item, idx) => (
            <Link href={item.route} key={idx}>
              <button
                onClick={() => {
                  setShowSubNav(false);
                }}
                className="hover_btn block !py-3 !px-4 !w-full text-left"
              >
                <p className="">{item.title}</p>
              </button>
            </Link>
          ))}
      </div>
      {token.trim() != "" && <hr />}
      <div>
        {subNavItems.other.map((item, idx) => {
          if (item.title == "Logout") {
            if (token && token.trim() != "") {
              return (
                <Link href={item.route} key={idx}>
                  <button
                    onClick={() => {
                      logout();
                      setShowSubNav(false);
                    }}
                    className="hover_btn block !py-3 !px-4 !w-full text-left"
                  >
                    <p className="">{item.title}</p>
                  </button>
                </Link>
              );
            }
            return;
          }
          return (
            <Link href={item.route} key={idx}>
              <button
                onClick={() => {
                  setShowSubNav(false);
                }}
                className="hover_btn block !py-3 !px-4 !w-full text-left"
              >
                <p className="">{item.title}</p>
              </button>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
