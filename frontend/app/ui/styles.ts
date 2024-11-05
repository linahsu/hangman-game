import styled from 'styled-components';

export const HeaderContainer = styled.header`
    width: 70%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    color: #ffa7da;
    font-size: 23px;
`;

export const NewWordButton = styled.button`
    padding: 13px;
    border: none;
    border-radius: 10px;
    font-size: 20px;
    background-color: #b42277;
    color: white;
    cursor: pointer;

    &:hover {
        background-color: #862e62;
        scale: 1.1;
    }
`;

export const Word = styled.p`
    margin-top: 40px;
    font-size: 90px;
`;

export const HangmanImageContainer = styled.div`
    width: 20%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
`;

export const Errors = styled.p`
    font-size: 25px;
`;

export const AlphabetBoard = styled.div`
    width: 60%;
    margin-top: 20px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
`;