import { useState } from "react";

const useFormFields = (initState) => {
  const [input, setInput] = useState(initState);
  const handleInputChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const resetForm = () => {
    setInput(initState);
  };
  return { input, handleInputChange, resetForm };
};

export default useFormFields;
