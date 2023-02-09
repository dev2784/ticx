import React from "react";
import "./login.css";
const Login = (props) => {
  const [otpShow, showOtp] = React.useState(false);
  const [otp, setOtp] = React.useState('');
  const [phoneNo, setPhoneNo] = React.useState("+91");
  const [error, setError] = React.useState("");
  const getOtp = () => {
    fetch(`https://cms.dotcheckout.com/movies/mobile/send?mobile=${phoneNo}`, {
      method: "POST",
    })
      .then((resp) =>
        resp.json().then((res) => {
          if (res.type === "success") {
            showOtp(true);
            setError('');        
          }else{
            setError('something went wrong');
          }
        })
      )
      .catch((err) => setError(err));
  };

  const verifyOtp = () => {
    fetch(`https://cms.dotcheckout.com/movies/mobile/verify?mobile=${phoneNo}&otp=${otp}`, {
      method: "POST",
    })
      .then((resp) =>
        resp.json().then((res) => {
          if (res.type === "success") {
            alert('Otp verified')
            props.setToken(Math.random()) 
            showOtp(false);
            setError('')
          }else{
            setError('something went wrong');
          }
        })
      )
      .catch((err) => setError(err));
  };

  return (
    <>
      {!otpShow ? (
        <section className="login-container">
          <div className="logo-container">
            <h2 className="logo">
              Tic<span>X</span>
            </h2>
          </div>
          <div className="input-container">
            <label>Please enter your phone number</label>
            <input
              type="text"
              value={phoneNo}
              name="phoneNo"
              onChange={(e) => setPhoneNo(e.target.value)}
            />
          </div>
          <button className="get-otp-btn" onClick={() => getOtp()}>
            Get Otp
          </button>
          {error !== '' && <h3>{error}</h3>}
        </section>
      ) : (
        <section className="login-container">
          <div className="logo-container">
            <h2 className="logo">
              Tic<span>X</span>
            </h2>
          </div>
          <div className="input-container">
            <label>Verify Otp</label>
            <input
              type="number"
              value={otp}
              name="otp"
              onChange={(e) => setOtp(e.target.value)}
            />
          </div>
          <button className="get-otp-btn" onClick={() => verifyOtp()}>
            Verify Otp
          </button>
        </section>
      )}
    </>
  );
};
export default Login;
