import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { createUser, getTokens } from "./api";
import { ACCESS_TOKEN, LAST_FRESH_LOGIN, REFRESH_TOKEN } from "../../constants";
import { useNavigate } from "react-router-dom";
import "./styles/LoginForm.scss";
import { useTranslation } from "react-i18next";
import Button from "../../components/Button";

export default function RegistrationForm() {
  const { t } = useTranslation();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const registerQuery = useQuery({
    queryKey: ["register"],
    queryFn: () => createUser({ username, password }),
    enabled: false,
  });

  const fetchTokensQuery = useQuery({
    queryKey: ["access"],
    queryFn: () => getTokens({ username, password }),
    enabled: false,
  });

  const handleRegistration = async (e: any) => {
    e.preventDefault();
    const result = await registerQuery.refetch();
    if (result.isSuccess) {
      const tokensResult = await fetchTokensQuery.refetch();
      if (tokensResult.isSuccess) {
        console.log("here");
        localStorage.setItem(ACCESS_TOKEN, tokensResult.data.access);
        localStorage.setItem(REFRESH_TOKEN, tokensResult.data.refresh);
        localStorage.setItem(LAST_FRESH_LOGIN, Date.now().toString());
        navigate("/");
        return;
      }
    }
    console.log(result.error);
  };

  useEffect(() => {
    localStorage.clear();
  }, []);

  return (
    <div className="login">
      <h1 className="h5">{t("common.welcome")}</h1>
      <form id="registration-form">
        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        ></input>
        <input
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
            handleRegistration(e);
          }}
        >
          {t("auth.register")}
        </Button>
        <div>
          {t("auth.have_account") + " "}
          <a onClick={() => navigate("/login")}>
            {t("auth.login") + " " + t("common.here")}
          </a>
        </div>
      </form>
    </div>
  );
}
