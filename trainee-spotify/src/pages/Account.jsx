import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import mailIcon from '../assets/mail.svg'
import userIcon from '../assets/person.svg'
import lockIcon from '../assets/lock.svg'
import Alert from '@mui/material/Alert';
import { getUserInfo, updateUserEmail, updateUserPassword } from '../services/api'


const Account = () => {
    const [email, setEmail] = useState('Carregando...')
    const [name, setName] = useState('Carregando...')
    const [id, setId] = useState('')
    const [isChangingEmail, setIsChangingEmail] = useState(false)
    const [isChangingPassword, setIsChangingPassword] = useState(false)

    // Estados para os formulários
    const [newEmail, setNewEmail] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [errorEmail, setErrorEmail] = useState('');
    const [errorPassword, setErrorPassword] = useState('');
    const [success, setSuccess] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const fetchUserInfo = async () => {
        const info = await getUserInfo();
        if (info.success === false) {
            console.error("Failed to get user info");
            return;
        }

        setEmail(info.email);
        setName(info.name);
        setId(info.id);

        console.log("User Email:", email);
        console.log("User Name:", name);
    };
    useEffect(() => {
        fetchUserInfo();
    }, []);

    async function handleButton(e) {
        e.preventDefault();
        const { id } = e.target;
        if (id === 'email') {
            setIsChangingEmail(true)
        }
        else if (id === 'password') {
            setIsChangingPassword(true)
        }
        else if (id === 'cancelar') {
            setIsChangingEmail(false)
            setIsChangingPassword(false)
            setErrorEmail(null)
            setErrorPassword(null)
        }
    }

    async function handleSubmitEmail(e) {
        e.preventDefault();
        if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail)) {
            console.log('Email valido')
            try {
                setIsLoading(true)
                const response = await updateUserEmail(id, newEmail);
                if (response.success) {
                    setSuccess('Email alterado com sucesso.');
                    fetchUserInfo()
                    setIsChangingEmail(false)
                }

            } catch {
                setErrorEmail(response.error)
                console.log(response.error)

            } finally {
                setIsLoading(false)
                return
            }
        }
        console.log('Email invalido')
        setErrorEmail('E-mail inválido')

    }

    async function handleSubmitPassword(e) {
        e.preventDefault();
        if (!currentPassword || !newPassword) {
            setErrorPassword('Preencha todos os campos de senha.');
            return;
        }
        if (newPassword.length < 6) {
            setErrorPassword('Sua senha deve ter 6 caracteres ou mais.')
            return;
        }
        if (newPassword === currentPassword) {
            setErrorPassword('Sua nova senha é igual à atual.');
            return;
        }
        if (newPassword !== confirmNewPassword) {
            setErrorPassword('As senhas não conferem.');
            return;
        }
        try {
            setIsLoading(true)
            const response = await updateUserPassword(id, email, currentPassword, newPassword)
            if (response.sucess) {
                setSuccess('Senha alterada com sucesso.');
                setIsChangingPassword(false)
            }
        } catch {
            setErrorPassword(response.error)

        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <Sidebar />

            {/* Main content (scrollable) */}
            <main className="bg-[#101010] w-auto flex flex-grow overflow-y-auto h-screen p-0 pt-[4rem]">
                <div className='flex flex-col '>
                    <h1 className='font-semibold text-3xl mb-8 text-white'>Minha Conta</h1>

                    <div className="flex relative bg-[#3c3c3c] justify-between p-3 w-100 mb-4 text-[#CCCCCC]">
                        <p>{name}</p>
                        <img src={userIcon} alt="User icon" />
                    </div>

                    <div className="flex relative bg-[#3c3c3c] justify-between p-3 w-100 mb-8 text-[#CCCCCC]">
                        <p>{email}</p>
                        <img src={mailIcon} alt="Mail icon" />
                    </div>

                    {success && <Alert variant="outlined" severity="success" className='-mt-4 mb-4'>{success}</Alert>}

                    <button id='email' onClick={handleButton} className="bg-[#3FE168] text-white cursor-pointer font-semibold uppercase w-[240px] h-[45px] rounded-full mb-3">
                        Trocar Email
                    </button>
                    <button id='password' onClick={handleButton} className="bg-[#3FE168] text-white cursor-pointer font-semibold uppercase w-[240px] h-[45px] rounded-full">
                        Trocar Senha
                    </button>
                </div>

                {/* Pop up change email */}
                {isChangingEmail &&
                    <div className="absolute">
                        <div className="bg-neutral-800 fixed opacity-50 text-white w-[100vw] h-full top-0 right-0 z-10" id='cancelar' onClick={handleButton}></div>
                        <div className="text-white bg-black z-50 w-110 h-auto place-self-center relative justify-items-center p-4">
                            <h1 className='text-[30px] font-bold mb-4'>Novo E-mail</h1>
                            <form className="flex relative flex-col gap-3" onSubmit={handleSubmitEmail} noValidate>

                                <div className='flex'>
                                    <input
                                        type="email"
                                        name=""
                                        id="email"
                                        placeholder="Email"
                                        className="bg-[#3c3c3c] p-[0.5rem] w-[25rem]"
                                        onChange={(e) => { setNewEmail(e.target.value); }}
                                    />
                                    <img src={mailIcon} alt="Mail icon" className="absolute right-[10px] top-1.5" />
                                </div>

                                {errorEmail && <Alert variant='outlined' severity='error' >{errorEmail}</Alert>}

                                <div className='flex gap-3 place-items-center justify-center mb-3'>
                                    <button id='cancelar' onClick={handleButton} className="bg-red-500 text-white cursor-pointer font-semibold uppercase w-35 h-[45px] rounded-full place-self-center">
                                        Cancelar
                                    </button>

                                    <button id='password' type='submit' className="bg-[#3FE168] text-white cursor-pointer font-semibold uppercase w-35 h-[45px] rounded-full place-self-center">
                                        {isLoading ? 'Carregando...' : 'Confirmar'}
                                    </button>
                                </div>

                            </form>
                        </div>
                    </div>
                }

                {/* Pop up change password */}
                {isChangingPassword &&
                    <div className="absolute">
                        <div className="bg-neutral-800 fixed opacity-50 text-white w-[100vw] h-full top-0 right-0 z-10" id='cancelar' onClick={handleButton}></div>
                        <div className="text-white bg-black z-50 w-110 h-auto place-self-center relative justify-items-center p-4">
                            <h1 className='text-[30px] font-bold mb-4'>Nova senha</h1>
                            <form className="flex relative flex-col gap-10" onSubmit={handleSubmitPassword} noValidate>
                                <div className="relative flex items-center">
                                    <input
                                        type="password"
                                        placeholder="Senha atual"
                                        className="bg-[#3c3c3c] p-[0.5rem] w-[25rem] pr-10"
                                        onChange={(e) => setCurrentPassword(e.target.value)}
                                    />
                                    <img src={lockIcon} alt="Lock icon" className="absolute right-3 flex items-center" />
                                </div>
                                <div className="relative flex items-center">
                                    <input
                                        type="password"
                                        placeholder="Nova senha"
                                        className="bg-[#3c3c3c] p-[0.5rem] w-[25rem] pr-10"
                                        onChange={(e) => setNewPassword(e.target.value)}
                                    />
                                    <img src={lockIcon} alt="Lock icon" className="absolute right-3 flex items-center" />
                                </div>
                                <div className="relative flex items-center">
                                    <input
                                        type="password"
                                        placeholder="Confirme nova senha"
                                        className="bg-[#3c3c3c] p-[0.5rem] w-[25rem] pr-10"
                                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                                    />
                                    <img src={lockIcon} alt="Lock icon" className="absolute right-3 flex items-center" />
                                </div>

                                {errorPassword && <Alert variant='outlined' severity='error' className='-mt-4'>{errorPassword}</Alert>}

                                <div className='flex gap-3 place-items-center justify-center -mt-5 mb-3'>
                                    <button id='cancelar' onClick={handleButton} className="bg-red-500 text-white cursor-pointer font-semibold uppercase w-35 h-[45px] rounded-full place-self-center">
                                        Cancelar
                                    </button>
                                    <button id='password' type='submit' className="bg-[#3FE168] text-white cursor-pointer font-semibold uppercase w-35 h-[45px] rounded-full place-self-center">
                                        {isLoading ? 'Carregando...' : 'Confirmar'}
                                    </button>
                                </div>

                            </form>
                        </div>
                    </div >
                }
            </main >
        </div >
    )
}

export default Account