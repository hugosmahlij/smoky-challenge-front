import React from 'react'
import InputGral from '../components/InputGral';
import ButtonSubmit from '../components/ButtonSubmit';
import { useRef } from 'react'
import axios from 'axios';
import url  from '../url';
import Swal from 'sweetalert2';

export default function SignUp() {

    const form = useRef()
    const name = useRef()
    const lastName = useRef()
    const photo = useRef()
    const age = useRef()
    const email = useRef()
    const password = useRef()

    async function enviarFormulario(event) {
        event.preventDefault()
        let newUser =
        {
            name: name.current.value,
            lastName: lastName.current.value,
            photo: photo.current.value,
            age: age.current.value,
            email: email.current.value,
            password: password.current.value,
        }

        try {
            let response = await axios.post(`${url}auth/sign-up`, newUser)
            console.log(response);
            if (response.data.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'User created!',
                    showConfirmButton: true,
                })
                    .then(make => {
                        if (make.isConfirmed) {
                            form.current.reset();
                        }
                    })
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Registration error',
                    text: response.data.message
                })
            }

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <main>
            <div className="d-flex justify-content-center mt-3">
                <div className="card">
                    <div className="card2">
                        <div className="card3">
                            <h3 className="title text-white mb-4">Sign Up</h3>
                            <form className="d-flex justify-content-center flex-column gap-2">
                                <div className="field">
                                    <img className="input-icon" src="img/name.png" />
                                    <InputGral autocomplete="off" id="logpass" type='text' placeholder='Name' refId={name} className="input-field" />
                                </div>

                                <div className="field">
                                    <img className="input-icon" src="img/name.png" />
                                    <InputGral autocomplete="off" id="logpass" type='text' placeholder='Lastname' refId={lastName} className="input-field" />
                                </div>

                                <div className="field">
                                    <img className="input-icon" src="img/age.png" />
                                    <InputGral autocomplete="off" id="logpass" type='number' placeholder='Age' refId={age} className="input-field" />
                                </div>
                                <div className="field">
                                    <img className="input-icon" src="img/link.png" />
                                    <InputGral autocomplete="off" id="logpass" type='text' placeholder='URL photo' refId={photo} className="input-field" />
                                </div>

                                <div className="field">
                                    <svg className="input-icon" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M207.8 20.73c-93.45 18.32-168.7 93.66-187 187.1c-27.64 140.9 68.65 266.2 199.1 285.1c19.01 2.888 36.17-12.26 36.17-31.49l.0001-.6631c0-15.74-11.44-28.88-26.84-31.24c-84.35-12.98-149.2-86.13-149.2-174.2c0-102.9 88.61-185.5 193.4-175.4c91.54 8.869 158.6 91.25 158.6 183.2l0 16.16c0 22.09-17.94 40.05-40 40.05s-40.01-17.96-40.01-40.05v-120.1c0-8.847-7.161-16.02-16.01-16.02l-31.98 .0036c-7.299 0-13.2 4.992-15.12 11.68c-24.85-12.15-54.24-16.38-86.06-5.106c-38.75 13.73-68.12 48.91-73.72 89.64c-9.483 69.01 43.81 128 110.9 128c26.44 0 50.43-9.544 69.59-24.88c24 31.3 65.23 48.69 109.4 37.49C465.2 369.3 496 324.1 495.1 277.2V256.3C495.1 107.1 361.2-9.332 207.8 20.73zM239.1 304.3c-26.47 0-48-21.56-48-48.05s21.53-48.05 48-48.05s48 21.56 48 48.05S266.5 304.3 239.1 304.3z">
                                        </path>
                                    </svg>
                                    <InputGral type='email' placeholder='Email' refId={email} className="input-field"/>
                                </div>
                                <div className="field">
                                    <svg className="input-icon" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M80 192V144C80 64.47 144.5 0 224 0C303.5 0 368 64.47 368 144V192H384C419.3 192 448 220.7 448 256V448C448 483.3 419.3 512 384 512H64C28.65 512 0 483.3 0 448V256C0 220.7 28.65 192 64 192H80zM144 192H304V144C304 99.82 268.2 64 224 64C179.8 64 144 99.82 144 144V192z">
                                        </path>
                                    </svg>
                                    <InputGral autocomplete="off" id="logpass" type='password' placeholder='Password' refId={password} className="input-field" />
                                </div>
                                <ButtonSubmit type='submit' text='Create' fx={enviarFormulario} />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
