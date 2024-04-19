import Link from "next/link";

export default function Avatar({nickname, onLogOut} : {nickname:string, onLogOut: () => void}) {
  return (
    <div className="dropdown dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-ghost btn-circle avatar"
      >
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
          />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
      >
        <li>
            <a><strong>Welcome, {nickname}!</strong></a>
        </li>
        <li>
          <a onClick={onLogOut}>Logout</a>
        </li>
      </ul>
    </div>
  );
}
