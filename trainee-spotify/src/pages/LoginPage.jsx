import React from "react";
import lockIcon from "../assets/lock.svg";
import mailIcon from "../assets/mail.svg";
import { useState } from "react";
import Alert from '@mui/material/Alert';
import { Link } from "react-router-dom";
import { loginUser } from "../services/api";

function LoginPage() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState({ email: "", password: "" });
    const [loading,setLoading] = useState(false);

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);

        setError({ email: "", password: "" })

        let formErrors = { email: "", password: "" }


        if (!email) {
            formErrors.email = "Campo e-mail é obrigatório"

        } else if (!isValidEmail(email)) {
            formErrors.email = "E-mail em formato inválido!"
        }

        if (!password) {
            formErrors.password = "Campo senha é obrigatório"
        }

        if (formErrors.email || formErrors.password) {
            setError(formErrors);
            setLoading(false);
            return;
        }

        try {
            const response = await loginUser(email, password);
            if (response.success) {
                window.location.href = "/"
            } else {
                formErrors.password = response.error.response?.data;
                setError(formErrors);
            }
        } catch (err) {
            formErrors.password = "Erro ao fazer login. Tente novamente."
        setError(formErrors);
        } finally {
            setLoading(false);
        }
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

                <button type="submit" disabled={loading} className="bg-white text-black w-[240px] h-[45px] rounded-full place-self-center">
                    {loading ? "Carregando..." : "Entrar"}
                </button>
            </form>
            <div className="">
                <p>NÃO TEM UMA CONTA?</p><Link to="/signup">Inscreva-se</Link>
            </div>

        </div>


    );
}

export default LoginPage;