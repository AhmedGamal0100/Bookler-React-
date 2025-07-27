import { useForm } from "react-hook-form";
import { useBlocker } from "../../hooks/useBlocker";
import { Link, useNavigate } from "react-router-dom";
import logo from '../../assets/imgs/logoAuth.png';
import { Divider, Alert, Button, Modal, Tooltip, Result } from 'antd';
import { FaFacebook, FaGoogle } from 'react-icons/fa';
import { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { setAccount } from '../../stores/AccountSlicer';
import './Register.css';

const countries = [
  "Egypt",
  "Saudi Arabia",
  "United Arab Emirates",
  "Jordan",
  "Kuwait",
  "Qatar",
  "Bahrain",
  "Oman",
  "Lebanon",
  "Morocco",
  "Algeria",
  "Tunisia",
  "Other"
];

function Register() {
  const [isSuccess, SetIsSuccess] = useState(false);

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isDirty }
  } = useForm({
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      country: '',
      phone: '',
    }
  });

  const dispatch = useDispatch();
  const onSubmit = async (data) => {
    dispatch(setAccount(data));
    SetIsSuccess(true);
    await reset();

    setTimeout(() => {
      navigate("/login");
    }, 3000);
  };

  const [modalOpen, setModalOpen] = useState(false);
  const [isCloseAnyWay, setIsCloseAnyWay] = useState(false);

  const showModal = () => {
    setModalOpen(true);
  };

  const handleModalClose = async (val) => {
    setModalOpen(false);
    await setIsCloseAnyWay(val)
    if (val) {
      navigate("/login");
    }
  };

  useBlocker(() => {
    if (isDirty) {
      showModal()
      if (isCloseAnyWay)
        return true
      else return false
    }
    return false;
  }, isDirty);

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
      <section className='register'>
        <div className='register__container'>
          <div className="register__logo">
            <img src={logo} alt="logo register" />
          </div>

          <h2>SIGNUP</h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* User Name */}
            <div className="register__input">
              <label>Name</label>
              <input
                {...register("username", {
                  required: "User Name is required",
                  validate: value =>
                    /\s/.test(value) ? "No spaces allowed in username" : true
                })}
                placeholder="user name"
              />
              {errors.username && (
                <Alert
                  message={errors.username.message}
                  type="error"
                  showIcon
                  style={{ marginTop: 5 }}
                />
              )}
            </div>

            {/* Email */}
            <div className="register__input">
              <label>Email</label>
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email address"
                  }
                })}
                placeholder="yourmail@gmail.com"
              />
              {errors.email && (
                <Alert
                  message={errors.email.message}
                  type="error"
                  showIcon
                  style={{ marginTop: 5 }}
                />
              )}
            </div>

            {/* Password */}
            <div className="register__input">
              <label>Password</label>
              <input
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters"
                  },
                  validate: value =>
                    /(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/.test(value)
                      ? true
                      : "Must include 1 uppercase, 1 number, 1 special char"
                })}
                placeholder="********"
              />
              {errors.password && (
                <Alert
                  message={errors.password.message}
                  type="error"
                  showIcon
                  style={{ marginTop: 5 }}
                />
              )}
            </div>

            {/* Confirm Password */}
            <div className="register__input">
              <label>Confirm Password</label>
              <input
                type="password"
                {...register("confirmPassword", {
                  required: "Confirm your password",
                  validate: (value) =>
                    value === watch('password') || "Passwords do not match"
                })}
                placeholder="********"
              />
              {errors.confirmPassword && (
                <Alert
                  message={errors.confirmPassword.message}
                  type="error"
                  showIcon
                  style={{ marginTop: 5 }}
                />
              )}
            </div>

            {/* Country */}
            <div className="register__input">
              <label>Country</label>
              <select
                {...register("country", {
                  required: "Please select your country"
                })}
              >
                <option value="">Select your country</option>
                {countries.map((country, index) => (
                  <option key={index} value={country}>{country}</option>
                ))}
              </select>
              {errors.country && (
                <Alert
                  message={errors.country.message}
                  type="error"
                  showIcon
                  style={{ marginTop: 5 }}
                />
              )}
            </div>

            {/* Phone */}
            <div className="register__input">
              <label>Phone</label>
              <input
                type="tel"
                {...register("phone", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^\+201(0|1|2|5)\d{8}$/,
                    message: "Enter a valid Egyptian phone number"
                  }
                })}
                placeholder="+20 100 000 0000"
              />
              {errors.phone && (
                <Alert
                  message={errors.phone.message}
                  type="error"
                  showIcon
                  style={{ marginTop: 5 }}
                />
              )}
            </div>

            {/* Submit Button */}
            <div className="register__submit">
              <button type="submit" className="register__submit-btn">
                SIGN UP
              </button>
            </div>
          </form>

          <p className="register__register">
            Already have an account? <Link to="/login">Login</Link>
          </p>

          <div className='register__others'>
            <Divider className='register__divider' style={{ borderColor: '#dfdfdf' }}>
              <b>Signup</b> with Others
            </Divider>
            <div className="register__others-btns">
              <Tooltip title="This feature is not ready yet!" >
                <button><FaGoogle style={{ width: "30px", height: "30px" }} /> <span>Register with <b>Google</b></span></button>
              </Tooltip>
              <Tooltip placement="bottom" title="This feature is not ready yet!" >
                <button><FaFacebook style={{ width: "30px", height: "30px" }} /><span>Register with <b>Facebook</b></span></button>
              </Tooltip>
            </div>
          </div>
        </div>
      </section >

      <Modal
        title="Register Success"
        open={modalOpen}
        footer={[
          <Button key='login' type="primary" onClick={() => handleModalClose(true)} danger>
            Go to Login
          </Button>,
          <Button key='close' type="primary" onClick={() => handleModalClose(false)}>
            Close
          </Button>
        ]}
        closable={false}
        centered
      >
        <p style={{ textAlign: "center" }}><b>You didn't save the form!</b></p>
      </Modal>

      {isSuccess &&
        <div className={`register__result ${isSuccess ? "show" : ""}`}>
          <Result
            status="success"
            title="You Successfully Registered!"
            subTitle="Redirecting to login page..."
          />
        </div>}
    </>
  );
}

export default Register;
