import { useRef, useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import logo from '../../assets/imgs/logoAuth.png';
import { Divider, Tooltip, notification, Result } from 'antd';
import { FaFacebook, FaGoogle } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { setLogged } from '../../stores/AccountSlicer';

import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [isSuccess, SetIsSuccess] = useState(false);
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (desc) => {
    api.open({
      message: 'Login Error',
      description: desc,
      type: 'error',
      duration: 3,
    });
  };

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value.trim();

    if (!email || !password) {
      openNotification("Email and Password are required!");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      openNotification("Please enter a valid email address.");
      return;
    }

    const savedUser = JSON.parse(localStorage.getItem("registeredUser"));
    if (savedUser && savedUser.email === email && savedUser.password === password) {
      dispatch(setLogged(true));
      SetIsSuccess(true);
      setTimeout(() => {
        navigate("/");
        window.location.reload();
      }, 3000);
    } else {
      openNotification("Invalid email or password.");
    }


  };

  useEffect(() => {
    if (isSuccess) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
    return () => document.body.classList.remove("no-scroll");
  }, [isSuccess]);

  return (
    <>
      <section className='login'>
        {contextHolder}
        <div className='login__container'>
          <div className="login__logo">
            <img src={logo} alt="logo login" />
          </div>

          <h2>LOGIN</h2>

          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div className='login__email'>
              <label>Email</label>
              <input
                type="email"
                ref={emailRef}
                placeholder="yourmail@gmail.com"
              />
            </div>

            {/* Password */}
            <div className='login__password'>
              <label>Password</label>
              <input
                type="password"
                ref={passwordRef}
                placeholder="********"
              />
            </div>

            {/* Login Button */}
            <div className='login__submit'>
              <button type="submit" className='login__submit-btn'>
                Login
              </button>
            </div>
          </form>

          <p className="login__register">
            Don’t have an account? <Link to="/register">Register</Link>
          </p>

          <div className='login__others'>
            <Divider className='login__divider' style={{ borderColor: '#dfdfdf' }}>
              <b>Login</b> with Others
            </Divider>
            <div className="login__others-btns">
              <Tooltip title="This feature is not ready yet!" >
                <button><FaGoogle style={{ width: "30px", height: "30px" }} /> <span>Login with <b>Google</b></span></button>
              </Tooltip>
              <Tooltip placement="bottom" title="This feature is not ready yet!" >
                <button><FaFacebook style={{ width: "30px", height: "30px" }} /><span>Login with <b>Facebook</b></span></button>
              </Tooltip>
            </div>
          </div>
        </div>
      </section>
      {isSuccess &&
        <div className={`login__result ${isSuccess ? "show" : ""}`}>
          <Result
            status="success"
            title="You Successfully Logged in!"
            subTitle="Redirecting to home page..."
          />
        </div>}
    </>
  );
}

export default Login;
