import { useState } from "react";

interface IInputs {
  target: {
    value: number | boolean | string;
  };
}
export const useForm = <T extends object, V extends object>(
  initState: T,
  validator?: V
) => {
  const [state, setState] = useState<T>(initState);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement> | IInputs,

    key: keyof T
  ): Promise<string> => {
    return new Promise((resolve) => {
      (async () => {
        const { target } = e;

        const { value } = target;
        setState({
          ...state,
          [key]: value,
        });
        return resolve("Cambios guardados con Exito!");
      })();
    });
  };

  const setForm = (form: T): Promise<string> => {
    return new Promise((resolve) => {
      (async () => {
        setState({
          ...form,
        });
        return resolve("Cambios guardados con Exito!");
      })();
    });
  };

  const resetForm = () => {
    setForm(initState);
  };

  const isValidRegExpObject = (obj: V): obj is V & Record<string, RegExp> => {
    if (typeof obj !== "object" || obj === null) return false;

    for (const key in obj) {
      const value = obj[key];
      if (
        value &&
        typeof value === "object" &&
        value.constructor.name === "RegExp"
      ) {
        continue;
      } else {
        return false;
      }
    }

    return true;
  };

  const validateFieldsText = (key: keyof V, value: keyof T) => {
    if (!validator) {
      throw new Error("To use this feature you need the validators.");
    }
    const v = validator[key] as RegExp;
    return !v.test(state[value] as string);
  };

  if (validator && !isValidRegExpObject(validator)) {
    throw new Error("All validator fields must be of RegEx type.");
  }

  return {
    ...state,
    form: state,
    onChange,
    setForm,
    resetForm,
    validateFieldsText,
  };
};
