import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getTokens } from "./api";
import { ACCESS_TOKEN, LAST_FRESH_LOGIN, REFRESH_TOKEN } from "../../constants";
import { useNavigate } from "react-router-dom";
import "./styles/LoginForm.scss";
import { useTranslation } from "react-i18next";
import Button from "../../components/Button";

export default function LoginForm({ path = "/manager" }) {
  const { t } = useTranslation();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const query = useQuery({
    queryKey: ["access"],
    queryFn: () => getTokens({ username, password }),
    enabled: false,
  });

  const navigate = useNavigate();

  const handleLogin = async (e: any) => {
    e.preventDefault();
    const result = await query.refetch();
    if (result.isSuccess) {
      localStorage.setItem(ACCESS_TOKEN, result.data.access);
      localStorage.setItem(REFRESH_TOKEN, result.data.refresh);
      localStorage.setItem(LAST_FRESH_LOGIN, Date.now().toString());
      navigate(path);
    }
  };

  return (
    <div className="login">
      <h1 className="h5">{t("common.welcome")}</h1>
      <form id="login-form">
        <input
          className="input"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        ></input>
        <input
          className="input"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        ></input>
        <Button
          type="submit"
          onClick={(e) => {
            handleLogin(e);
          }}
        >
          {t("auth.login")}
        </Button>
        <div>
          {t("auth.no_account") + " "}
          <a onClick={() => navigate("/register")}>
            {t("auth.register") + " " + t("common.here")}
          </a>
        </div>
      </form>
    </div>
  );
}
