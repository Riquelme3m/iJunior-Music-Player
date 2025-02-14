import React, { useState } from 'react'
import personIcon from "../assets/person.svg"
import lockIcon from "../assets/lock.svg";
import mailIcon from "../assets/mail.svg";
import { Link } from "react-router-dom";
import Alert from '@mui/material/Alert';
import { getAllUsers, createUser } from "../services/api";

const SignupPage = () => {
    const [wasUserCreated, setWasUserCreated] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [error, setError] = useState({ email: "", password: "", username: "" });
    const [isLoading, setIsLoading] = useState(false);
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
    function isValidPassword(password) {
        return (password.length >= 6);
    }
    function isValidUsername(username) {
        return (username.length >= 4);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true);
        setError({ email: "", password: "", username: "" });

        let formErrors = { email: "", password: "", username: "" };
        if (!email) {
            formErrors.email = "Campo e-mail é obrigatório";

        } else if (!isValidEmail(email)) {
            formErrors.email = "E-mail em formato inválido!"
        }
        if (!password) {
            formErrors.password = "Campo senha é obrigatório"
        } else if (!isValidPassword(password)) {
            formErrors.password = "Senha deve ter no mínimo 6 caracteres"
        }
        if (!username) {
            formErrors.username = "Campo nome de usuário é obrigatório"
        } else if (!isValidUsername(username)) {
            formErrors.username = "Nome de usuário deve ter no mínimo 4 caracteres"
        }

        if (formErrors.email || formErrors.password || formErrors.username) {
            setIsLoading(false);
            setError(formErrors);
            return;
        }

        try {
            const response = await createUser(username, email, password, "user");

            if (response.success) {
                console.log(response.data);
                setWasUserCreated(true);
            } else {

                formErrors.username = response.error.response?.data;
                setError(formErrors);

            }
        } catch (err) {
            console.log(err.data);
            formErrors.username = "Não foi possível efetuar seu cadastro."
            setError(formErrors);

        } finally {
            setIsLoading(false);
        }


        //get all the users of the database here

        //check if email is equal to some of the emails already used,
        //if yes set error to email  = "email ja cadastrado"

        //if email is not equal to any 

        //createUser

        //redirect to login page
    }

    if (wasUserCreated) {
        return (
            <div className="flex flex-col justify-center items-center w-[100vw] h-[100vh] m-auto bg-black text-white gap-6">
                <div className="bg-[#3c3c3c] p-8 rounded-lg text-center">
                    <i className="fa-solid fa-circle-check text-green-500 text-5xl mb-4"></i>
                    <h2 className="text-2xl font-bold mb-4">Conta criada com sucesso!</h2>
                    <p className="mb-6">Seja bem-vindo(a) ao iSpotify!</p>
                    <Link to="/login" className="bg-white text-black px-8 py-3 rounded-full hover:bg-gray-200 transition-colors">
                        Fazer Login
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col  justify-center items-center w-[100vw] h-[100vh] m-auto bg-black text-white gap-10">
            <div className="flex flex-col gap-5 jus">
                <div className="flex gap-1.5 justify-center">
                    <h1 className="">Inscrever-se em uma conta grátis do iSpotify</h1>
                    <i className="fa-regular fa-registered"></i>
                </div>

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
                    <input type="password" id="password" placeholder="Criar uma senha" className="bg-[#3c3c3c] p-[0.5rem] w-[25rem]" onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                    />
                    <img src={lockIcon} alt="Lock icon" className="absolute right-[10px]" />
                </div>

                {error.password && <Alert variant="outlined" severity="error">{error.password}</Alert>}

                <div className="flex relative">
                    <input type="text" id="username" placeholder="Como devemos chamar você?" className="bg-[#3c3c3c] p-[0.5rem] w-[25rem]" onChange={(e) => {
                        setUsername(e.target.value);
                    }}
                    />
                    <img src={personIcon} alt="Person icon" className="absolute right-[10px]" />
                </div>
                {error.username && <Alert variant="outlined" severity="error">{error.username}</Alert>}

                <button type="submit" disabled={isLoading} className="bg-white text-black w-[240px] h-[45px] rounded-full place-self-center">
                {isLoading ? "Carregando..." : "Cadastrar"}
                </button>
            </form>

            <div className="">
                <p>Já é um usuário do iSpotify?<Link to="/login"> Faça login</Link></p>
            </div>

        </div>
    )
}

export default SignupPage