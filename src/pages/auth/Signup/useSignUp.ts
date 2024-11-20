import { useApi, useForm } from "@hooks";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import dataDummy from "../../../utils/users.json";
import { useUserStore } from "@stores";
import bcrypt from "bcryptjs";
import { IUserDummy } from "interfaces/general";

interface IFormLogin {
  nombres: string;
  apellidos: string;
  email: string;
  password: string;
}

const inicialState: IFormLogin = {
  nombres: "",
  apellidos: "",
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

export default () => {
  const {
    nombres,
    apellidos,
    email,
    password,
    form,
    setForm,
    onChange,
    validateFieldsText,
  } = useForm<IFormLogin, IFormLoginValidator>(inicialState, validators);

  const signUp = useUserStore(({ signUp }) => signUp);

  const navigate = useNavigate();

  const { loadApi, loadingApi } = useApi();

  console.log(loadingApi);

  const onSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      /* Get gata dummy */
      const db_dummy = dataDummy;

      /* Validate user existence */
      if (db_dummy.users.find((user) => user.email === form.email)) {
        enqueueSnackbar("Este usuario ya se encuentra registrado", {
          variant: "warning",
        });
        return;
      }

      /* Encrypt password */
      const bcryptPassword = await bcrypt.hash(form.password, 10);

      /* get api_dummyAuth_new_User */
      const data = await loadApi<{ users: IUserDummy[] }>({
        type: "GET",
        headers: {
          "access-token": undefined,
          "Content-Type": "application/json",
        },
        endpoint: "https://dummyjson.com/users",
      });

      /* Create new User temp */
      const id_new_user = db_dummy.users.length + 1;
      db_dummy.users.push({
        id: id_new_user,
        nombres: form.nombres,
        apellidos: form.apellidos,
        email: form.email,
        password: bcryptPassword,
        dummyAuthEmail: data.users[id_new_user].username || "",
        dummyAuthPassword: data.users[id_new_user].password,
      });
      signUp(db_dummy);

      enqueueSnackbar(
        `Usuario registrado exitosamente. 
        Este usuario ha sido registrado de forma temporal si actualiza la página o cierra la pestaña tendrá que volver a registrarse`,
        {
          variant: "success",
          autoHideDuration: 5000,
        }
      );
      navigate("/auth/login");
    } catch {
      enqueueSnackbar("Ha ocurrido un error", {
        variant: "error",
      });
    }
  };

  const goSignIn = () => {
    navigate("/auth/login");
  };

  return {
    nombres,
    apellidos,
    email,
    password,
    form,
    setForm,
    onChange,
    validateFieldsText,
    onSignUp,
    goSignIn,
    loading: loadingApi.includes("GET__https://dummyjson.com/users"),
  };
};
