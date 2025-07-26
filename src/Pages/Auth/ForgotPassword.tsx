import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ForgotPassword.css';

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [isOtpSent, setIsOtpSent] = useState<boolean>(false);
  const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  // Handle initial email submission
  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Password reset requested for:', email);
    // Here call an API to send OTP
    setIsOtpSent(true);
  };
  
  // Handle OTP input change
  const handleOtpChange = (index: number, value: string) => {
    if (isNaN(Number(value))) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`) as HTMLInputElement;
      if (nextInput) nextInput.focus();
    }
  };

  // Handle OTP keydown for backspace
  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-input-${index - 1}`) as HTMLInputElement;
      if (prevInput) prevInput.focus();
    }
  };

  // Handle password reset submission
  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    
    console.log('Reset password with OTP:', otp.join(''), 'New password:', newPassword);
    // Here call an API to verify OTP and reset password
    
    // Redirect to login page upon success
    navigate('/login');
  };

  return (
    <div className="login-container">
      <div className="login-form-wrapper">
        <h1 className="login-title">
          Forget <span className="highlight">Password</span>?
        </h1>
        
        {!isOtpSent ? (
          // Email form
          <>
            <p className="login-subtitle">Enter your email to reset your password</p>
            
            <form onSubmit={handleSendOtp} className="login-form">
              <div className="form-group">
                <label htmlFor="reset-email">Email Address</label>
                <input
                  type="email"
                  id="reset-email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                />
              </div>
              
              <button type="submit" className="login-button active">
                Submit
              </button>
              
              <div className="back-to-login">
                <a href="#" onClick={(e) => {e.preventDefault(); navigate('/login')}}>
                  Back to Login
                </a>
              </div>
            </form>
          </>
        ) : (
          // OTP and new password form
          <>
            <p className="login-subtitle">Enter 6 digits OTP code reset your profile password.</p>
            
            <form onSubmit={handleResetPassword} className="login-form">
              <div className="form-group">
                <label htmlFor="otp-input-0">
                  Enter OTP code<span className="required">*</span>
                </label>
                <div className="otp-container">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      id={`otp-input-${index}`}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(index, e)}
                      className="otp-input"
                      required
                    />
                  ))}
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="new-password">
                  New Password<span className="required">*</span>
                </label>
                <div className="password-input">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    id="new-password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Create a new password"
                    required
                  />
                  <button 
                    type="button" 
                    className="toggle-password"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? 
                      <i className="fas fa-eye-slash"></i> : 
                      <i className="fas fa-eye"></i>}
                  </button>
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="confirm-password">
                  Confirm Password<span className="required">*</span>
                </label>
                <div className="password-input">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirm-password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your password"
                    required
                  />
                  <button 
                    type="button" 
                    className="toggle-password"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? 
                      <i className="fas fa-eye-slash"></i> : 
                      <i className="fas fa-eye"></i>}
                  </button>
                </div>
              </div>
              
              <div className="password-requirements">
                <p><span className="required">*</span> Must include at least one uppercase letter, lowercase letter & number</p>
                <p><span className="required">*</span> Minimum 6 characters</p>
              </div>
              
              <button type="submit" className="login-button active">
                Submit
              </button>
              
              <div className="back-to-login">
                <a href="#" onClick={(e) => {e.preventDefault(); navigate('/login')}}>
                  Back to Login
                </a>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;