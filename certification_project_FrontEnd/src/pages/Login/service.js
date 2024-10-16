import React, { useState } from 'react';
import endpoints from "../../config/endpoints.json"
import useAxios from "../../hooks/axios";
import { useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";
export default function useSignIn() {
    const navigate = useNavigate();
  const { customAxios } = useAxios();
  const dispatch = useDispatch();
  const [isSignUpOpen ,setIsSignUpOpen]=useState(false);
  const [errors, setErrors] = useState({}); 
  const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };
  const [formData, setFormData] = useState({
      username: "",
      password: "",
  });
  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }
  const handleSignUpOpen=()=>{
    setIsSignUpOpen(true);
  }
  const handleClose=()=>{
    setIsSignUpOpen(false);
  }
  const onSignIn = async () => {
   
    try {
        const result = await customAxios({
            method: "POST",
            url: endpoints.login,
            data: formData,
        });
        if (result.status === 200) {
            navigate('/dashboard');
           console.log(result.status) 
        }
    } catch (error) {
        console.error('Login error:', error); 
       
    }
    handleClose();
    
};
return {onChange,onSignIn,formData,handleSignUpOpen,isSignUpOpen,handleClose,showPassword,togglePasswordVisibility}
}