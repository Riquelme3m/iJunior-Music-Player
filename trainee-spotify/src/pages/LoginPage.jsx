import React from "react";
import lockIcon from "../assets/lock.svg";
import mailIcon from "../assets/mail.svg";
import { useState } from "react";
import Alert from '@mui/material/Alert';



// function logUser({email,password}){

//     const api = axios.create({
//         baseURL: "http://localhost:3030/api",
//         withCredentials: true,
//     });

// }



function LoginPage() {

    



    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState({ email: "", password: "" });
    const [loading,setLoading] = useState(false);

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function isEmailInDatabase(email) {
        return true;
        //Here I should also check if the e-mail exists in the database
        //Through API Call
    }

    function isPasswordInDatabase(password) {
        //Based on the API response this function will be valid or not
        return true;
    };

    async function handleSubmit(e) {
        e.preventDefault();

        setError({ email: "", password: "" });

        let formErrors = { email: "", password: "" };


        if (!email) {
            formErrors.email = "Campo e-mail é obrigatório";

        } else if (!isValidEmail(email)) {
            formErrors.email = "E-mail em formato inválido!";
        }

        if (!password) {
            formErrors.password = "Campo senha é obrigatório";

        }

        if (formErrors.email || formErrors.password) {
            setError(formErrors);
            return;
        }
        setError(formErrors);


    }

    return (
        <div className="flex flex-col  justify-center items-center w-[100vw] h-[100vh] m-auto bg-black text-white gap-10">
            <div className="flex flex-col gap-5 jus">
                <div className="flex gap-1.5 justify-center">
                    <h1 className="">iSpotify</h1>
                    <i className="fa-regular fa-registered"></i>
                </div>

                <p>Música para todos</p>
            </div>

            <form action="" className=" flex flex-col gap-[2.5rem]" onSubmit={handleSubmit} noValidate>

                <div className="flex relative">
                    <input type="email" name="" id="email" placeholder="Email" className="bg-[#3c3c3c] p-[0.5rem] w-[25rem]" onChange={(e) => {
                        setEmail(e.target.value);
                    }} />
                    <img src={mailIcon} alt="Mail icon" className="absolute right-[10px]" />

                </div>
                {error.email && <Alert variant="outlined" severity="error">{error.email}</Alert>}

                <div className="flex relative">
                    <input type="password" id="password" placeholder="Senha" className="bg-[#3c3c3c] p-[0.5rem] w-[25rem]" onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                    />
                    <img src={lockIcon} alt="Lock icon" className="absolute right-[10px]" />
                </div>
                {error.password && <Alert variant="outlined" severity="error">{error.password}</Alert>}


                <div className="flex justify-center">
                    <button type="submit" className="bg-white text-black w-[240px] h-[45px] rounded-full" >Entrar</button>
                </div>



            </form>
            <div className="">
                <p>NÃO TEM UMA CONTA?<a href="#"> Increva-se</a></p>
            </div>

        </div>


    );
}

export default LoginPage;