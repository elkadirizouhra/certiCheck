import { useState } from "react";
import { useDispatch } from "react-redux";
import useAxios from "../../hooks/axios";
import { updated } from "../../store/loading/loadingSlice";
import { validateRequired, validateGmail, validatePassword,validateUsername  } from '../../utils/validation';
import endpoints from "../../config/endpoints.json"

export default function useSignUp(handleClose) {
    const { customAxios } = useAxios();
    const dispatch = useDispatch();
    const [errors, setErrors] = useState({}); 
    const [userNature, setUserNature] = useState("");
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        role: "",
        identifierNumber: "",
        password: "",
        confirmPassword:""
    });
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };
    const onChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
        if (errors[name]) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: undefined, 
          }));
        }
    }

    const handleUserNatureChange = (e) => {
        setUserNature(e.target.value);
    };
   
    const validateForm = () => {
        const newErrors = {}; 

        if (!validateRequired(formData.username)) {
            newErrors.username = 'Username is required.';
        }
        if (!validateRequired(formData.email)) {
            newErrors.email = 'Email is required.';
        }
        if (!validateRequired(formData.password)) {
            newErrors.password = 'Password is required.';
        }
        if (!validateRequired(formData.identifierNumber)) {
            newErrors.identifierNumber = 'Identifier number is required.';
        }
        if (formData.username && !validateUsername(formData.username)) {
            newErrors.username = 'Username must be at least 3 characters long and can only contain letters and numbers.';
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword='Les mots de passe doivent correspondre.';
        }
        if (formData.email && !validateGmail(formData.email)) {
            newErrors.email = 'Please enter a valid Gmail address.';
        }

        
        if (formData.password && !validatePassword(formData.password)) {
            newErrors.password = 'Password must be at least 8 characters long and contain an uppercase letter, a lowercase letter, a number, and a special character.';
        }

        setErrors(newErrors); 
        return Object.keys(newErrors).length === 0; 
    };

    const onSignUp = async () => {
        if (!validateForm()) {
            return; 
        }
        try {
            const result = await customAxios({
                method: "POST",
                url: endpoints.register,
                data: formData,
            });
            handleClose();
        } catch (error) {
           
        }
    };

    return {
        userNature,
        handleUserNatureChange,
        onSignUp,
        onChange,
        formData,
        errors,
        togglePasswordVisibility,
        showPassword
    };
}
