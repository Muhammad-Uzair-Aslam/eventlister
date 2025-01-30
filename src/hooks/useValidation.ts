import { useState,useEffect } from "react";
const useValidation = (newPassword: string, confirmPassword: string) => {
    const [isValid, setIsValid] = useState(true);
  
    useEffect(() => {
      if (newPassword !== confirmPassword) {
        setIsValid(false);
      } else {
        setIsValid(true);
      }
    }, [newPassword, confirmPassword]);
  
    return { isValid };
  };
  
  export default useValidation;
  