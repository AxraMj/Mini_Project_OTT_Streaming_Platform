import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { auth, provider, firebaseSignInWithPopup } from "../firebase";
import {
  selectUserName,
  selectUserPhoto,
  setUserLoginDetails,
  setSignOutState,
} from "../features/user/userSlice";
import { FaHome, FaSearch, FaList, FaFilm, FaMoneyBillWave } from 'react-icons/fa';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const userName = useSelector(selectUserName);
  const userPhoto = useSelector(selectUserPhoto);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);
        if (location.pathname === '/') {
          navigate("/home");
        }
      }
    });
    return () => unsubscribe();
  }, [navigate, location.pathname]);

  const handleAuth = async () => {
    if (!userName) {
      try {
        const result = await firebaseSignInWithPopup(auth, provider);
        setUser(result.user);
      } catch (error) {
        alert(error.message);
      }
    } else {
      try {
        await auth.signOut();
        dispatch(setSignOutState());
        navigate("/");
      } catch (error) {
        alert(error.message);
      }
    }
  };

  const setUser = (user) => {
    dispatch(
      setUserLoginDetails({
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
      })
    );
  };

  return (
    <>
      {/* Hide header if on the subscription page */}
      {location.pathname !== '/' && location.pathname !== '/subscription' && (
        <Nav>
          <Logo>
            <img src="/images/logo-new.png" alt="Logo" />
          </Logo>
          {userName && (
            <NavMenu>
              <Link to="/home" className={location.pathname === '/home' ? 'active' : ''} title="Home">
                <FaHome />
              </Link>
              <Link to="/search" className={location.pathname === '/search' ? 'active' : ''} title="Search">
                <FaSearch />
              </Link>
              <Link to="/watchlist" className={location.pathname === '/watchlist' ? 'active' : ''} title="Watchlist">
                <FaList />
              </Link>
              <Link to="/category" className={location.pathname === '/category' ? 'active' : ''} title="Movies">
                <FaFilm />
              </Link>
              <Link to="/subscription" className={location.pathname === '/subscription' ? 'active' : ''} title="Money">
                <FaMoneyBillWave />
              </Link>
            </NavMenu>
          )}
        </Nav>
      )}
      {!userName ? (
        <TopRightButton>
          <Login onClick={handleAuth}>Login</Login>
        </TopRightButton>
      ) : (
        <SignOut>
          <UserImg src={userPhoto} alt={userName} />
          <DropDown>
            <span onClick={handleAuth}>Sign out</span>
          </DropDown>
        </SignOut>
      )}
    </>
  );
};

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 80px;
  background-color: black;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 20px;
  z-index: 3;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.5);
`;

const Logo = styled(Link)`
  width: 100px;
  height: 100px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: auto;
    object-fit: contain;
  }
`;

const NavMenu = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  a {
    display: flex;
    align-items: center;
    padding: 12px 0;
    width: 100%;
    text-decoration: none;
    color: rgb(249, 249, 249);
    opacity: 0.8;
    transition: color 0.3s ease, transform 0.3s ease;
    margin-bottom: 30px;

    svg {
      font-size: 20px;
      transition: transform 0.3s ease;
    }

    &:last-child {
      margin-bottom: 0;
    }

    &.active {
      opacity: 1;
      color: #f9f9f9; /* Change text color for active link */
      svg {
        color: #f9f9f9; /* Change icon color for active link */
        transform: scale(1.2);
      }
    }

    &:hover {
      opacity: 1;
      color: #f9f9f9;
      svg {
        transform: scale(1.2);
      }
    }
  }
`;

const TopRightButton = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 4;
`;

const Login = styled.a`
  background-color: rgba(0, 0, 0, 0.6);
  padding: 8px 16px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  border: 1px solid #f9f9f9;
  border-radius: 4px;
  transition: all 0.2s ease;
  color: #f9f9f9;
  text-decoration: none;

  &:hover {
    background-color: #f9f9f9;
    color: #000;
    border-color: transparent;
  }
`;

const UserImg = styled.img`
  height: 40px;
  width: 48px;
  border-radius: 50%;
`;

const DropDown = styled.div`
  position: absolute;
  top: 60px;
  right: 0;
  background: rgb(19, 19, 19);
  border: 1px solid rgba(151, 151, 151, 0.34);
  border-radius: 4px;
  box-shadow: rgb(0 0 0 / 50%) 0px 0px 18px 0px;
  padding: 10px;
  font-size: 14px;
  letter-spacing: 3px;
  width: 100px;
  opacity: 0;
  z-index: 6;

  span {
    cursor: pointer;
  }
`;

const SignOut = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  height: 48px;
  width: 48px;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  z-index: 5;

  ${UserImg} {
    width: 100%;
    height: 100%;
  }

  &:hover {
    ${DropDown} {
      opacity: 1;
      transition-duration: 1s;
    }
  }
`;

export default Header;
