import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // ✅ We need this to navigate
import { userLogin } from "../../services/Auth";
import useStore from "../../services/useAppStore";
import registerUser from "../../services/register/register";
import { OtpGlobalState, OtpResponse } from "../../types/types";
import RegisterOTP from "../Auth/RegisterOTP"; // ✅ Make sure this path is correct
import { useTranslation } from "react-i18next";
import "./LoginForm.css";

interface LoginFormProps {
  defaultTab?: "login" | "signup";
  onSelectTab?: (tabName: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
  defaultTab = "login",
  onSelectTab,
}) => {
  const navigate = useNavigate(); // ✅ Navigation hook to redirect after login
  const [fullName, setFullName] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [agreeToTerms, setAgreeToTerms] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<
    "login" | "signup" | "registerotp"
  >(defaultTab);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const { setOtpState } = useStore();

  useEffect(() => {
    setErrorMessage(null);
    setSuccessMessage(null);
  }, [activeTab]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const result = await userLogin(event, email, password);
    setLoading(false);
    if (result.success) {
      setActiveTab("registerotp"); // ✅ Show OTP inside LoginForm
      navigate("/dashboard"); // ✅ Navigate to dashboard after login
    } else {
      setErrorMessage("Invalid login credentials.");
    }
  };

  const determineUserType = (input: string): string => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;
    if (emailRegex.test(input)) return "EMAIL";
    if (phoneRegex.test(input)) return "MOBILE";
    return "UNKNOWN";
  };

  const handleSignupSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match!");
      setLoading(false);
      return;
    }

    const userType = determineUserType(email);
    if (userType === "UNKNOWN") {
      setErrorMessage("Please enter a valid email or 10-digit mobile number.");
      setLoading(false);
      return;
    }

    try {
      const response: OtpResponse = await registerUser(
        email,
        password,
        confirmPassword,
        fullName,
        userType
      );

      if (response.isSuccess) {
        const data: OtpGlobalState = {
          userName: email,
          userType: userType,
          dataBundle: response.dataBundle,
        };
        setOtpState(data);

        setSuccessMessage("Account successfully created! Redirecting...");
        setTimeout(() => {
          if (onSelectTab) {
            onSelectTab("registerotp");
          } else {
            setActiveTab("registerotp"); // ✅ Show OTP component
          }
          setFullName("");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
          setAgreeToTerms(false);
        }, 2000);
      } else {
        setErrorMessage(response.errorMessage || "Registration failed");
      }
    } catch (error) {
      setErrorMessage("An error occurred while registering");
    }

    setLoading(false);
  };

  const handleForgotPassword = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    navigate("/forgotpassword");
  };

  const changeTab = (tab: "login" | "signup") => {
    setActiveTab(tab);
    navigate(`/${tab}`);
  };

  const handleOtpSelectTab = (tabName: string) => {
    if (
      tabName === "login" ||
      tabName === "signup" ||
      tabName === "registerotp"
    ) {
      setActiveTab(tabName as "login" | "signup" | "registerotp");
    }
    if (onSelectTab) {
      onSelectTab(tabName);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form-wrapper">
        {activeTab !== "registerotp" ? (
          <>
            <div className="login-tabs">
              <button
                className={`tab ${activeTab === "login" ? "active" : ""}`}
                onClick={() => changeTab("login")}
              >
                {t("homepage.login")}
              </button>
              <button
                className={`tab ${activeTab === "signup" ? "active" : ""}`}
                onClick={() => changeTab("signup")}
              >
                {t("homepage.signup")}
              </button>
            </div>

            {activeTab === "login" ? (
              <>
                <h1 className="login-title">
                  {t("auth.login.login_to")}{" "}
                  <span className="highlight">{t("auth.login.myslt")}</span>
                </h1>
                <p className="login-subtitle">
                  {t("auth.login.mysltWelcomeMsg")}
                </p>

                <form onSubmit={handleSubmit} className="login-form">
                  {successMessage && (
                    <div className="success-message">{successMessage}</div>
                  )}
                  {errorMessage && (
                    <div className="error-message">{errorMessage}</div>
                  )}

                  <div className="form-group">
                    <label htmlFor="login-email">
                      {t("auth.signup.email_or_phone_short")}
                    </label>
                    <input
                      type="text"
                      id="login-email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t("auth.login.loginPlaceholderEmail")}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="login-password">
                      {t("auth.signup.password")}
                    </label>
                    <div className="password-input">
                      <input
                        type={showPassword ? "text" : "password"}
                        id="login-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder={t("auth.login.loginPlaceholderPassword")}
                        required
                      />
                      <button
                        type="button"
                        className="toggle-password"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <i className="fas fa-eye-slash"></i>
                        ) : (
                          <i className="fas fa-eye"></i>
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="forgot-password">
                    <a href="#" onClick={handleForgotPassword}>
                      {t("auth.login.forgot_password")}?
                    </a>
                  </div>

                  <button
                    type="submit"
                    className="login-button active"
                    disabled={loading}
                  >
                    {loading ? (
                      <i className="fas fa-spinner fa-spin"></i>
                    ) : (
                      t("auth.signup.login")
                    )}
                  </button>

                  <div className="divider">
                    <span>{t("auth.login.or")}</span>
                  </div>

                  <div className="social-login">
                    <button type="button" className="social-button google">
                      <img src="/google.png" alt="Google" />
                    </button>
                    <button type="button" className="social-button facebook">
                      <img src="/facebook.png" alt="Facebook" />
                    </button>
                    <button type="button" className="social-button apple">
                      <img src="/apple.png" alt="Apple" />
                    </button>
                  </div>

                  <div className="no-account">
                    {t("auth.login.no_account")}?{" "}
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        changeTab("signup");
                      }}
                    >
                      {t("auth.login.signups")}
                    </a>
                  </div>

                  <div className="terms-links">
                    <a href="#">{t("auth.t&c")}</a>
                    <a href="#">{t("auth.support2")}</a>
                    <a href="#">{t("auth.customer_care")}</a>
                  </div>
                </form>
              </>
            ) : (
              <>
                <h1 className="login-title">
                  {t("auth.signup.create_an")}{" "}
                  <span className="highlight">{t("auth.signup.account")}</span>
                </h1>
                {errorMessage && (
                  <div className="error-message">{errorMessage}</div>
                )}
                {successMessage && (
                  <div className="success-message">{successMessage}</div>
                )}

                <form onSubmit={handleSignupSubmit} className="login-form">
                  <div className="form-group">
                    <label htmlFor="fullName">
                      {t("auth.signup.full_name")}
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder={t("auth.signup.placeholderFull_name")}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="signup-email">
                      {t("auth.signup.email_or_phone_short")}
                    </label>
                    <input
                      type="text"
                      id="signup-email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value.trim())}
                      placeholder={t("auth.login.loginPlaceholderEmail")}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="signup-password">
                      {t("auth.signup.password")}
                    </label>
                    <div className="password-input">
                      <input
                        type={showPassword ? "text" : "password"}
                        id="signup-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder={t("auth.signup.placeholderPassword")}
                        required
                      />
                      <button
                        type="button"
                        className="toggle-password"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <i className="fas fa-eye-slash"></i>
                        ) : (
                          <i className="fas fa-eye"></i>
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="confirm-password">
                      {t("auth.signup.confirm_password")}
                    </label>
                    <div className="password-input">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        id="confirm-password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder={t(
                          "auth.signup.placeholderConfirm_password"
                        )}
                        required
                      />
                      <button
                        type="button"
                        className="toggle-password"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      >
                        {showConfirmPassword ? (
                          <i className="fas fa-eye-slash"></i>
                        ) : (
                          <i className="fas fa-eye"></i>
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="form-group terms-checkbox">
                    <label className="checkbox-container">
                      <input
                        type="checkbox"
                        checked={agreeToTerms}
                        onChange={(e) => setAgreeToTerms(e.target.checked)}
                        required
                      />
                      <span className="checkmark"></span>
                      <span className="terms-text">
                        {t("auth.signup.agree")}{" "}
                        <a href="#">{t("auth.signup.terms")}</a>{" "}
                        {t("common.and")}{" "}
                        <a href="#">{t("auth.signup.privacy")}</a>
                      </span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    className={`login-button ${agreeToTerms ? "active" : ""}`}
                    disabled={!agreeToTerms || loading}
                  >
                    {loading ? (
                      <i className="fas fa-spinner fa-spin"></i>
                    ) : (
                      t("auth.login.signups")
                    )}
                  </button>

                  <div className="already-account">
                    {t("auth.signup.already_account")}{" "}
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        changeTab("login");
                      }}
                    >
                      {t("auth.signup.login")}
                    </a>
                  </div>

                  <div className="divider">
                    <span>{t("auth.signup.or_signin_with")}</span>
                  </div>

                  <div className="social-login">
                    <button type="button" className="social-button google">
                      <img src="/google.png" alt="Google" />
                    </button>
                    <button type="button" className="social-button facebook">
                      <img src="/facebook.png" alt="Facebook" />
                    </button>
                    <button type="button" className="social-button apple">
                      <img src="/apple.png" alt="Apple" />
                    </button>
                  </div>
                </form>
              </>
            )}
          </>
        ) : (
          <RegisterOTP onSelectTab={handleOtpSelectTab} /> // ✅ OTP screen
        )}
      </div>
    </div>
  );
};

export default LoginForm;
