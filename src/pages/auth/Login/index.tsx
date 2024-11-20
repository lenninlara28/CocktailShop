import { Backdrop } from "@components";
import BackgroundImg from "../../../assets/background-img.png";
import useLogin from "./useLogin";

export const Login = () => {
  const { email, password, loading, onChange, onLogin } = useLogin();
  return (
    <>
      <Backdrop isLoading={loading} />
      <div
        className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 w-screen h-screen bg-no-repeat bg-cover items-center "
        style={{
          backgroundImage: `url(${BackgroundImg})`,
        }}
      >
        <div className="flex flex-col justify-center items-center bg-white w-screen rounded-3xl lg:w-2/5 md:w-1/2 ">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight">
              Inicia sesión
            </h2>
          </div>

          <div className="mt-10 mb-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={(e) => onLogin(e)} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm/6 font-medium">
                  Email
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => onChange(e, "email")}
                    className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm/6 font-medium"
                  >
                    Password
                  </label>
                  <div className="text-sm">
                    <a
                      href="#"
                      className="font-semibold text-indigo-600 hover:text-indigo-500"
                    >
                      Cambiar contraseña?
                    </a>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => onChange(e, "password")}
                    className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-black-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-white hover:text-black hover:border-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black-600"
                >
                  Iniciar sesión
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm/6">
              <a
                href="/auth/sign-up"
                className="font-semibold text-indigo-600 hover:text-indigo-500"
              >
                Registrarse
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
