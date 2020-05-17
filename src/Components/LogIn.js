import React, { useEffect, useState } from 'react';
import './LogIn.css';
import { useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';
import { setUserName } from '../Actions';

const LogIn = () => {

    const [inputCorrect, setInputCorrect] = useState(false)
    const [userInput, setUserInput] = useState("");
    const [, setCookiesName] = useCookies(["userName", "userId"]);
    const dispatch = useDispatch();

    const changeHandler = (e) => {
        setUserInput(e.target.value);
    }

    const createId = () => {
        const prefix = (new Date().getTime() % Math.floor(Math.random() * Math.floor(512))).toString(16);
        const id = prefix + Math.floor(new Date().getTime() / Math.floor(Math.random() * Math.floor(512)));
        return id;
    }

    const clickHandler = () => {
        if (userInput.length > 0) {
            setCookiesName('userName', userInput, { path: '/' });
            setCookiesName('userId', createId(), { path: '/' });
            dispatch(setUserName(userInput));
        }
    }

    useEffect(() => {
        if (userInput.length > 0) {
            setInputCorrect(true);
        }
        else {
            setInputCorrect(false);
        }
    }, [userInput])

    return (
        <div className="sir-login-bg">
            <div className="sir-login-window">
                <div className="sir-login-header">Привет, мы тебя не узнали!</div>
                <div className="sir-login-input">
                    <input onChange={changeHandler} placeholder="Ваше имя" value={userInput}></input>
                </div>
                <div onClick={clickHandler} className={inputCorrect ? "sir-login-button correct" : "sir-login-button"}>{inputCorrect ? "Ок" : "Введите имя"}</div>
            </div>
        </div>
    );
}

export default LogIn;
