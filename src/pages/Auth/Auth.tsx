import { Button, Container, Form, Header, Input } from "semantic-ui-react";
import LogoIcon from "../../assets/logo";
import AppInput from "../../components/Input";
import { useState } from "react";
import useLoginMutation from "../../hooks/api/query/useLogin";
import { showErrorToastMessage } from "../../utils/toast";
import useSignUp from "../../hooks/api/mutation/useSignUp";

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100vh",
    paddingTop: "5%",
    paddingBottom: "2%",
  },
  header: {
    fontSize: 32,
  },
  formContainer: {
    paddingBottom: 120,
  },
  inputsContainer: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    marginTop: 25,
  },
  inputsParent: {
    width: "30vw",
    minWidth: 300,
    maxWidth: 340,
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
  buttonStyle: {
    marginBottom: 20,
  },
};

const Auth = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const { login, loading } = useLoginMutation();
  const { loading: signUpLoading, signUp } = useSignUp();

  const toggleIsLogin = () => {
    setIsLogin((prev) => !prev);
  };

  const handleSubmit = async () => {
    await login(email, password);
  };

  const handleRegisterSubmit = async () => {
    const MIN_PASSWORD_LENGTH = 6;

    if (password.length < MIN_PASSWORD_LENGTH) {
      showErrorToastMessage("Password must at least be 6 characters");
      return;
    }

    if (confirmPassword.trim() != password.trim()) {
      showErrorToastMessage("Passwords doesn't match");
      return;
    }

    await signUp(email, password, name);
  };

  return (
    <Container textAlign="center" fluid>
      {/* @ts-ignore */}
      <div style={styles.container}>
        <LogoIcon width="64" height="64" />
        <div style={styles.formContainer}>
          <Header style={styles.header} size="huge">
            {isLogin ? "Welcome back" : "Create Your Account"}
          </Header>
          <div style={styles.inputsContainer}>
            {/* @ts-ignore */}
            <Form
              onSubmit={isLogin ? handleSubmit : handleRegisterSubmit}
              style={styles.inputsParent}
            >
              <AppInput
                placeholder="Email..."
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {!isLogin ? (
                <AppInput
                  placeholder="Name..."
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              ) : null}
              <AppInput
                placeholder="Password..."
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {!isLogin ? (
                <AppInput
                  placeholder="Confirm Password..."
                  required
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              ) : null}

              <Button
                style={styles.buttonStyle}
                size="big"
                primary
                type="submit"
                loading={loading || signUpLoading}
                disabled={loading || signUpLoading}
              >
                {isLogin ? "Login" : "Register"}
              </Button>
            </Form>
          </div>

          {isLogin ? (
            <p>
              Don't have an account? &nbsp;
              <a onClick={toggleIsLogin}>Sign Up</a>
            </p>
          ) : (
            <p>
              Already have an account? &nbsp;
              <a onClick={toggleIsLogin}>Login</a>
            </p>
          )}
        </div>
        <a>Created by Ahsan Azeem</a>
      </div>
    </Container>
  );
};

export default Auth;
