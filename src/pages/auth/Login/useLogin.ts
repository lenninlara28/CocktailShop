import { useForm, useApi } from "@hooks";
import { useUserStore } from "@stores";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { IUserDummy } from "../../../interfaces/general";
import bycrypt from "bcryptjs";

interface IFormLogin {
  email: string;
  password: string;
}

const inicialState: IFormLogin = {
  email: "",
  password: "",
};

interface IFormLoginValidator {
  emailReg: RegExp;
  passwordReg?: RegExp;
}

const validators = {
  emailReg: /^(?:^$|\s*$|^\S+@\S+\.\S+)$/,
};

interface IRespondeSignIn {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  accessToken: string;
  refreshToken: string;
}

export default () => {
  const { email, password, form, setForm, onChange, validateFieldsText } =
    useForm<IFormLogin, IFormLoginValidator>(inicialState, validators);

  const signIn = useUserStore(({ signIn }) => signIn);
  const dataDummy = useUserStore((state) => state.dummyUsers);

  const { loadApi, loadingApi } = useApi();
  const navigate = useNavigate();

  const onLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const db_dummy: IUserDummy | undefined = dataDummy.users.find(
        (item) => item.email === form.email
      );

      if (!db_dummy) {
        enqueueSnackbar("Usuario o contraseña incorrecta", {
          variant: "error",
        });
        return;
      }

      if (!(await bycrypt.compare(form.password, db_dummy.password))) {
        return enqueueSnackbar("Contraseña incorrecta", {
          variant: "error",
        });
      }

      const data = await loadApi<IRespondeSignIn>({
        type: "POST",
        headers: {
          "access-token": undefined,
          "Content-Type": "application/json",
        },
        instance: "api_auth",
        endpoint: "login",
        body: JSON.stringify({
          username: db_dummy.dummyAuthEmail,
          password: db_dummy.dummyAuthPassword,
          expiresInMins: 120,
        }),
      });

      signIn({
        token: data.accessToken,
        user: {
          id: db_dummy.id,
          nombres: db_dummy.nombres,
          apellidos: db_dummy.apellidos,
          email: db_dummy.email,
        },
      });
      navigate("/home");
    } catch {
      enqueueSnackbar("Usuario o contraseña incorrecta", {
        variant: "error",
      });
    }
  };

  const navigation = (rute: string) => {
    navigate(rute);
  };

  return {
    email,
    password,
    form,
    setForm,
    onChange,
    validateFieldsText,
    onLogin,
    navigation,
    loading: loadingApi.includes("POST__login"),
  };
};
