import { Layout } from "antd";
import COLORS from "../colors";
import { useTranslation } from "react-i18next";
import { GrGithub, GrLinkedin } from "react-icons/gr";
import styled from "styled-components";
import { useState, useEffect } from "react";

const { Footer } = Layout;

const ProfilesContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 10px;
  gap: 10px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 15px;
  }
`;

const ProfileItem = styled.div`
  display: flex;
  align-items: center;
  
  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const Separator = styled.span`
  margin: 0 15px;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const StyledLink = styled.a`
  color: ${COLORS.gray};
  text-decoration: underline;
  transition: opacity 0.2s;
  
  &:hover {
    opacity: 0.8;
  }
`;

const SocialIcon = styled.a`
  color: ${COLORS.gray};
  margin-left: 5px;
  display: inline-flex;
  align-items: center;
  transition: opacity 0.2s;
  
  &:hover {
    opacity: 0.8;
  }
`;

const UniversityInfo = styled.div`
  text-align: center;
  margin-bottom: 10px;
  padding: 0 10px;
  
  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

const TeacherInfo = styled.div`
  text-align: center;
  
  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

const DefaultFooter = () => {
  const { t } = useTranslation();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Footer
      style={{
        backgroundColor: "#171717",
        color: COLORS.gray,
        textAlign: "center",
        borderTop: "1px solid #3c4043",
        padding: windowWidth <= 480 ? "15px 10px" : "20px",
      }}
    >
      <UniversityInfo>
        {t("bachelors_degree_in_computer_science")} • {t("federal_university_of_alfenas")}
      </UniversityInfo>
      
      <ProfilesContainer>
        <ProfileItem>
          <StyledLink href="https://joaoragazzo.dev/">
            <strong>João Paulo M. Ragazzo</strong>
          </StyledLink>
          <SocialIcon href="https://github.com/joaoragazzo/">
            <GrGithub />
          </SocialIcon>
          <SocialIcon href="https://www.linkedin.com/in/joao-ragazzo/">
            <GrLinkedin />
          </SocialIcon>
        </ProfileItem>
        
        <Separator>/</Separator>
        
        <ProfileItem>
          <StyledLink href="https://www.linkedin.com/in/matheus-santos-445391295/">
            <strong>Matheus Martins dos Santos</strong>
          </StyledLink>
          <SocialIcon href="https://github.com/mmsantos147/">
            <GrGithub />
          </SocialIcon>
          <SocialIcon href="https://www.linkedin.com/in/matheus-santos-445391295/">
            <GrLinkedin />
          </SocialIcon>
        </ProfileItem>
      </ProfilesContainer>
      
      <TeacherInfo>
        {t("teacher_dr")}{" "}
        <StyledLink href="https://www.linkedin.com/in/flaviogonzaga/">
          <strong>Flávio Barbieri Gonzaga</strong>
        </StyledLink>{" "}
        <SocialIcon href="https://www.linkedin.com/in/flaviogonzaga/">
          <GrLinkedin />
        </SocialIcon>
      </TeacherInfo>
    </Footer>
  );
};

export default DefaultFooter;