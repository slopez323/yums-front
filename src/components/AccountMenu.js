import { useEffect, useRef } from "react";
import { useAuth } from "../contexts/authContext";

const AccountMenu = ({ setShowAccountMenu, setError, setShowConfirm }) => {
  const { logOut } = useAuth();
  const menuRef = useRef();

  const onSignOut = async () => {
    const response = await logOut();
    if (response) {
      setError({ show: true, message: response });
    } else {
      setShowAccountMenu(false);
    }
  };

  const onDeleteAccount = async () => {
    setShowAccountMenu(false);
    setShowConfirm({ show: true, type: "delete-account" });
  };

  const handleClickOutside = (e) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(e.target) &&
      !e.target.closest(".username")
    ) {
      setShowAccountMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="account-menu" ref={menuRef}>
      <div onClick={onSignOut}>Sign Out</div>
      <div className="del-account" onClick={onDeleteAccount}>
        Delete Account
      </div>
    </div>
  );
};

export default AccountMenu;
