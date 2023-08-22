import { map } from "lodash";
import { Link } from "@remix-run/react";

const Footer = () => {
  const footerMenuItems = [
    { id: 1, label: "Home", link: "/" },
    { id: 2, label: "About", link: "/about" },
    { id: 3, label: "Sign Up", link: "/sign-up" },
    // { id: 4, label: "Support", link: "/support" },
    { id: 5, label: "Licensing", link: "/support/licensing" },
    //{ id: 6, label: "Join our Discord", link: "https://discord.gg/anM9ytZTSu" },
  ];

  return (
    <>
      <div className="flex flex-col p-5">
        <div className="flex-1">
          <div className="flex flex-row align-middle gap-4 items-center justify-center flex-wrap">
            {map(footerMenuItems, (item) => (
              <div key={item.id} className="uppercase text-xs text-neutral-600">
                <Link to={item.link} className="hover:underline">
                  {item.label}
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full text-center text-xs p-4 pt-10 uppercase text-neutral-600">
          Copyright © 2023 aida-x.cc
        </div>
      </div>
    </>
  );
};

export default Footer;
