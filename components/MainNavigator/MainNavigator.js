import classes from "./MainNavigator.module.css";
import Link from "next/link";
import { useContext } from "react";
import AuthContext from "../store/auth-context";
import { useRouter } from "next/router";

const MainNavigator = () => {
  const authCtx = useContext(AuthContext);
  const router = useRouter();

  const logoutHandler = () => {
    authCtx.logout();
    router.push("/");
  };
  return (
    <header className={classes.header}>
      <div className={classes.logo}>Alisa Wang</div>
      <nav>
        <ul>
          <li className={classes.item}>
            <Link href="/">Blogs</Link>
          </li>

          <li className={classes.item}>
            <Link href="/login">Login</Link>
          </li>
          {authCtx.isLoggedIn && (
            <li className={classes.item}>
              <Link href="/signup">Signup</Link>
            </li>
          )}
          {authCtx.isLoggedIn && (
            <li className={classes.item}>
              <Link href="/addForm">Form</Link>
            </li>
          )}

          {authCtx.isLoggedIn && (
            <li>
              <button className={classes.logout} onClick={logoutHandler}>
                Logout
              </button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigator;
