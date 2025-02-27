import { FaUser } from "react-icons/fa6";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import { useState, useEffect, useRef } from "react";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();



    const toggleMenu = (e) => {
        e.stopPropagation();
        setShowMenu(!showMenu);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (ulRef.current && !ulRef.current.contains(e.target))
            setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener('click', closeMenu);
   }, [showMenu]);

     const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };



  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden")

  return (
    <>
      <button onClick={toggleMenu}>
        <FaUser />
      </button>
      <ul className={ulClassName} ref={ulRef}>
        <li>{user.username}</li>
        <li>{user.firstName} {user.lastName}</li>
        <li>{user.email}</li>
        <li>
          <button onClick={logout}>Log Out</button>
        </li>
      </ul>
    </>
  );
}

export default ProfileButton;
