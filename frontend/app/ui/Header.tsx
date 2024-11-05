import { HeaderContainer, NewWordButton } from "./styles";

interface HeaderProps {
    newWord: () => Promise<void>;
};

export default function Header({newWord}: HeaderProps) {
    return (
        <HeaderContainer>
            <h1>Jogo da Forca</h1>
            <NewWordButton onClick={newWord}>Nova Palavra</NewWordButton>
        </HeaderContainer>
    );
}