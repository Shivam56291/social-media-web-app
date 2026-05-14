import {
  House,
  Compass,
  Bell,
  ChatCircleDots,
  BookmarkSimple,
  SignOut,
  User,
} from "@phosphor-icons/react";

import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { logout } from "../../features/auth/authSlice";
import { canAccessRoute } from "../../utils/onboardingGuard";

export default function Sidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  // CENTRAL NAV HANDLER
  const handleNav = (path, e) => {
    const allowed = canAccessRoute(user, path);

    if (!allowed) {
      e?.preventDefault();
      return;
    }

    navigate(path);
  };

  return (
    <aside
      className="
        hidden
        h-screen
        w-[260px]
        p-6
        lg:block
      "
    >
      {/* LOGO */}
      <div className="mb-10 flex items-center gap-3">
        <div
          className="
            flex h-12 w-12
            items-center justify-center
            rounded-2xl
            bg-gradient-to-br
            from-indigo-500
            to-cyan-500
            text-xl font-bold
          "
        >
          C
        </div>

        <div>
          <h1 className="text-xl font-black">
            ConnectSphere
          </h1>

          <p className="text-sm text-slate-400">
            Social Platform
          </p>
        </div>
      </div>

      {/* NAVIGATION */}
      <nav className="space-y-2">
        <SidebarItem
          to="/dashboard/feed"
          icon={<House size={22} />}
          text="Home"
          onClick={handleNav}
        />

        <SidebarItem
          to="/dashboard/explore"
          icon={<Compass size={22} />}
          text="Explore"
          onClick={handleNav}
        />

        <SidebarItem
          to="/dashboard/notifications"
          icon={<Bell size={22} />}
          text="Notifications"
          onClick={handleNav}
        />

        <SidebarItem
          to="/dashboard/messages"
          icon={<ChatCircleDots size={22} />}
          text="Messages"
          onClick={handleNav}
        />

        <SidebarItem
          to="/dashboard/saved"
          icon={<BookmarkSimple size={22} />}
          text="Saved"
          onClick={handleNav}
        />

        <SidebarItem
          to="/dashboard/profile"
          icon={<User size={22} />}
          text="Profile"
          onClick={handleNav}
        />
      </nav>

      {/* USER SECTION */}
      <div
        className="
          mt-10 rounded-3xl
          border border-white/10
          bg-white/[0.03]
          p-5
        "
      >
        <div className="flex items-center gap-4">
          {user?.avatar_url ? (
            <img
              src={user.avatar_url}
              alt={user.username}
              className="
                h-14 w-14
                rounded-2xl
                object-cover
                border border-white/10
              "
            />
          ) : (
            <div
              className="
                flex h-14 w-14
                items-center justify-center
                rounded-2xl
                bg-gradient-to-br
                from-indigo-500
                to-cyan-500
                text-lg font-bold
              "
            >
              {user?.username?.charAt(0)?.toUpperCase()}
            </div>
          )}

          <div>
            <h3 className="font-semibold">
              {user?.username}
            </h3>

            <p className="text-sm text-slate-400">
              @{user?.username}
            </p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="
            mt-5 flex w-full
            items-center
            justify-center gap-2
            rounded-2xl
            border border-red-500/20
            bg-red-500/10
            px-4 py-3
            text-red-300
            transition-all
            hover:bg-red-500/20
          "
        >
          <SignOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}

/* ---------------- SIDEBAR ITEM ---------------- */

function SidebarItem({ to, icon, text, onClick }) {
  return (
    <NavLink
      to={to}
      onClick={(e) => onClick(to, e)}
      className={({ isActive }) =>
        `
          flex w-full
          items-center gap-4
          rounded-2xl px-4 py-3
          transition-all
          ${
            isActive
              ? "bg-white text-black"
              : "text-slate-300 hover:bg-white/5"
          }
        `
      }
    >
      {icon}

      <span className="font-medium">
        {text}
      </span>
    </NavLink>
  );
}