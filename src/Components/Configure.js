import React, { useEffect, useState } from 'react';
import './LogIn.css';
import { useSelector, useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';
import { setUserName } from '../Actions';

const Configure = ({close}) => {

    const [inputCorrect, setInputCorrect] = useState(false)
    const [userInput, setUserInput] = useState("");
    const [, setCookiesName] = useCookies(["userName"]);
    const userName = useSelector(state => state.user.name);
    const dispatch = useDispatch();

    const changeHandler = (e) => {
        setUserInput(e.target.value);
    }

    const clickHandler = () => {
        if (userInput.length > 0) {
            setCookiesName('userName', userInput, { path: '/' });
            dispatch(setUserName(userInput));
            close();
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
                <div className="sir-login-header">{`Привет, ${userName}!`}</div>
                <div className="sir-login-input">
                    <input onChange={changeHandler} placeholder="Ваше имя" value={userInput}></input>
                </div>
                <div onClick={clickHandler} className={inputCorrect ? "sir-login-button correct" : "sir-login-button"}>{inputCorrect ? "Сменить имя" : "Введите имя"}</div>
                <div onClick={close} className="sir-login-button">Отмена</div>
            </div>
        </div>
    );
}

export default Configure;
