import styled from "styled-components";
import { LoggedMenuContent } from "../LoggedMenuContent";
import { useAuthData } from "../../../context/AuthContext";
import { GenericLoginButton } from "../GenericLoginButton";
import WeatherReport from "../WeatherReport";
import LanguageSelector from "../LanguageSelector";

const MenuWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px
`;

export const MobileMenuContent = () => {
  const { isLogged } = useAuthData();

    return (
      <>
        <MenuWrapper>
          <WeatherReport />
          <LanguageSelector />
        </MenuWrapper>

        {isLogged ? 
          <LoggedMenuContent />
         : 
          <GenericLoginButton />
        }
      </>
    )
};
