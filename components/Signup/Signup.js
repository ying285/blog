import classes from "./Signup.module.css";
import { useState, useRef, useContext } from "react";
import AuthContext from "../store/auth-context";
import { useRouter } from "next/router";

const Signup = () => {
  const signupPasswordRef = useRef();
  const signupEmailRef = useRef();
  const router = useRouter();

  const authCtx = useContext(AuthContext);

  const singupSubmitHandler = (e) => {
    e.preventDefault();

    const singupEmail = signupEmailRef.current.value;
    const signupPassword = signupPasswordRef.current.value;

    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAxCIyp645gBXr3OggDb0eaaxikRkk52Ag";

    if (signupEmail.trim() !== "" && signupPassword.trim() !== "") {
      fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: singupEmail,
          password: signupPassword,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
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
          authCtx.login(data.idToken);
        })
        .catch((err) => {
          alert(err.message);
        });
    }
    signupEmailRef.current.value = "";
    signupPasswordRef.current.value = "";
  };

  return (
    <form onSubmit={singupSubmitHandler} className={classes.signupForm}>
      <h3>SignUp</h3>
      <div className={classes.controlSignup}>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" ref={signupEmailRef} />
      </div>
      <div className={classes.controlSignup}>
        <label htmlFor="pass">Password</label>
        <input type="password" id="pass" ref={signupPasswordRef} />
      </div>
      <div className={classes.actions}>
        <button>SignUp</button>
      </div>
    </form>
  );
};

export default Signup;
