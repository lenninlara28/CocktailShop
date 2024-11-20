import { useForm } from "@hooks";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import dataDummy from "../../../utils/users.json";
import { useUserStore } from "@stores";

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

  const onSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const db_dummy = dataDummy;

      if (db_dummy.users.find((user) => user.email === form.email)) {
        enqueueSnackbar("Este usuario ya se encuentra registrado", {
          variant: "warning",
        });
        return;
      }

      db_dummy.users.push({
        id: db_dummy.users.length + 1,
        nombres: form.nombres,
        apellidos: form.apellidos,
        email: form.email,
        password: form.password,
        dummyAuthEmail: "emilys",
        dummyAuthPassword: "emilyspass",
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
  };
};
