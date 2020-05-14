import React, { useEffect, useState } from 'react';
import './LogIn.css';
import { useSelector, useDispatch } from 'react-redux';

const CreateRoom = ({ close }) => {

    const [inputCorrect, setInputCorrect] = useState(false);
    const [userInput, setUserInput] = useState("");
    const userInfo = useSelector(state => state.user);
    const dispatch = useDispatch();
    

    const createId = () => {

    }

    const createRoom = ({roomName, gmId}) => {
        console.log({roomName: roomName, gmId: gmId});
    }

    const changeHandler = (e) => {
        setUserInput(e.target.value);
    }

    const clickHandler = () => {
        if (userInput.length > 0) {
            createRoom({roomName: userInput, gmId: userInfo.id});
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
                <div className="sir-login-header">Введите имя комнаты</div>
                <div className="sir-login-input">
                    <input onChange={changeHandler} placeholder="Имя комнаты" value={userInput}></input>
                </div>
                <div onClick={clickHandler} className={inputCorrect ? "sir-login-button correct" : "sir-login-button"}>{inputCorrect ? "Ок" : "Введите имя"}</div>
                <div onClick={close} className="sir-login-button">Отмена</div>
            </div>
        </div>
    );
}

export default CreateRoom;
