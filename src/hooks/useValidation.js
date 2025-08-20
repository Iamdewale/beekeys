import { useState } from "react";

export default function useValidation(rules) {
  const [errors, setErrors] = useState({});

  const validate = (values) => {
    const newErrors = {};
    for (const field in rules) {
      const validators = Array.isArray(rules[field]) ? rules[field] : [rules[field]];
      const value = values[field];
      for (const check of validators) {
        const msg = check(value, values);
        if (msg && !newErrors[field]) {
          newErrors[field] = msg;
        }
      }
    }
    setErrors(newErrors);
    return newErrors;
  };

  return { errors, validate, setErrors };
}
