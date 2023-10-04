import classes from "./Auth.module.css";
import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { tokenActions } from "../../store";
import { useNavigate } from "react-router-dom";

const AuthForm = () => {
  const [resgistration, setRegistration] = useState(false);
  const [inputError, setInputError] = useState("");

  const switchHandler = () => {
    setRegistration((isCurrent) => !isCurrent);
  };

  const nameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const navigate = useNavigate();
  const dispatch = useDispatch()
  let timeDuration =5000;
  let clearInputError;

  useEffect(()=>{
    if(inputError){
      clearInputError = setTimeout(function(){
        setInputError("")
      },timeDuration)
      return()=>{
        clearTimeout(clearInputError)
      }
    }
  },[inputError])


  // useEffect(()=>{
  //   localStorage.removeItem("token")
  // },[]);// when i reload this page i want to remove the token from localstorage, so the only way one has access to the jobs page/route is to go through loging in.


  const submitHandler = async (e) => {
    e.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    const urlRegister = "http://localhost:5000/api/v1/auth/register";
    const urlLogin = "http://localhost:5000/api/v1/auth/login";

    let url;

    if (resgistration) {
      url = urlLogin;
    } else {
      url = urlRegister;
    }

    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          name: enteredName,
          email: enteredEmail,
          password: enteredPassword,
        }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();
      //console.log(data);
      if (!response.ok) {
        setInputError(data.mgs);
        throw new Error(setInputError(data.msg) || "Something went wrong");
        
      }
      //localStorage.setItem("token",data.token)//:used redux instead.
      dispatch(tokenActions.setActiveToken({token:data.token}))
      navigate("/job-listings");
    } catch (error) {
      console.log(error);
    }

    // e.target.reset() not needed since we ll navigate to jobs.
  };

  return (
    <div className={classes["form-container"]}>
      <form onSubmit={submitHandler}>
        <h1>{resgistration ? "Login" : "Register"}</h1>

        <div className={classes.control}>
          <label htmlFor="name">Name</label>
          <input type="text" ref={nameInputRef} />
        </div>

        <div className={classes.control}>
          <label htmlFor="email">Email</label>
          <input type="text" ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Password</label>
          <input type="password" ref={passwordInputRef} />
        </div>
        <div className={classes.action}>
          <button>{resgistration ? "Login" : "Register"}</button>
        </div>
        <div>
          <p onClick={switchHandler}>
            {resgistration
              ? "Create a new accont"
              : "Log in with existing account"}
          </p>
        </div>
        <p style={{ color: "red" }}>{inputError}</p>
      </form>
    </div>
  );
};

export default AuthForm;

// if (!enteredName || !enteredEmail || !enteredPassword) {
//   setInputError("Please provide credentials");
//   return;
// }
// console.log({
//     name: enteredName,
//     email: enteredEmail,
//     password: enteredPassword,
//   });
