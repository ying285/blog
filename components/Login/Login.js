import classes from "./Login.module.css";
import { useState, useRef, useContext } from "react";
import AuthContext from "../store/auth-context";
import { useRouter } from "next/router";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const inputEmailRef = useRef();
  const inputPasswordRef = useRef();
  const router = useRouter();

  const authCtx = useContext(AuthContext);

  const loginSubmitHandler = (e) => {
    e.preventDefault();
    const enteredEmail = inputEmailRef.current.value;
    const enteredPassword = inputPasswordRef.current.value;

    setIsLoading(true);

    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAxCIyp645gBXr3OggDb0eaaxikRkk52Ag";

    if (enteredEmail.trim() !== "" && enteredPassword.trim() !== "") {
      fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          setIsLoading(false);
          router.push("/");
          if (res.ok) {
            return res.json();
          } else {
            return res.json().then((data) => {
              let errorMessage = "authtication failed!";
              throw new Error(errorMessage);
            });
          }
        })
        .then((data) => {
          const expirationTime = new Date(
            new Date().getTime() + +data.expiresIn * 1000
          );
          authCtx.login(data.idToken, expirationTime.toISOString());
        })
        .catch((err) => {
          alert(err.message);
        });
    }
    inputEmailRef.current.value = "";
    inputPasswordRef.current.value = "";
  };

  return (
    <form className={classes.loginForm} onSubmit={loginSubmitHandler}>
      <h3>Login</h3>
      <div className={classes.controlForm}>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" ref={inputEmailRef} />
      </div>
      <div className={classes.controlForm}>
        <label htmlFor="pass">Password</label>
        <input type="password" id="pass" ref={inputPasswordRef} />
      </div>
      <div>
        {!isLoading && (
          <p className={classes.logToggle}>Login with existing account</p>
        )}
        {isLoading && <p className={classes.loading}>Loading...</p>}
      </div>
      <div className={classes.actions}>
        <button>Login</button>
      </div>
    </form>
  );
};

export default Login;
