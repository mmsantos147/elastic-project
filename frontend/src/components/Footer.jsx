import { Layout } from "antd";
import COLORS from "../colors";
import { useTranslation } from "react-i18next";
import { GrGithub, GrLinkedin } from "react-icons/gr";

const { Footer } = Layout;

const DefaultFooter = () => {
  const { t } = useTranslation();
  return (
    <Footer
      style={{
        backgroundColor: "#171717",
        color: COLORS.gray,
        textAlign: "center",
        borderTop: "1px solid #3c4043",
        padding: "20px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "10px",
        }}
      >
        <div>
            {t("bachelors_degree_in_computer_science")} • {t("federal_university_of_alfenas")}
        </div>
      </div>
      <div style={{ marginBottom: "10px" }}>
        <strong>
          <a
            style={{ color: COLORS.gray, textDecoration: "underline" }}
            href="http://0x6a70.com/"
          >
            João Paulo M. Ragazzo
          </a>
        </strong>
        <a href="https://github.com/joaoragazzo/">
          <GrGithub style={{ color: COLORS.gray, marginLeft: "5px" }} />
        </a>
        <a href="https://www.linkedin.com/in/joao-ragazzo/">
          <GrLinkedin style={{ color: COLORS.gray, marginLeft: "5px" }} />
        </a>
        <span style={{ marginLeft: "15px" }}>/</span>
        <strong style={{ marginLeft: "10px" }}>
          <a
            style={{ color: COLORS.gray, textDecoration: "underline" }}
            href="https://www.linkedin.com/in/matheus-santos-445391295/"
          >
            Matheus Martins dos Santos
          </a>
        </strong>
        <a href="https://github.com/mmsantos147/">
          <GrGithub style={{ color: COLORS.gray, marginLeft: "5px" }} />
        </a>
        <a href="https://www.linkedin.com/in/matheus-santos-445391295/">
          <GrLinkedin style={{ color: COLORS.gray, marginLeft: "5px" }} />
        </a>
      </div>

      <div>
        {t("teacher_dr")}{" "}
        <a
          href="https://www.linkedin.com/in/flaviogonzaga/"
          style={{ color: COLORS.gray, textDecoration: "underline" }}
        >
          <strong>Flávio Barbieri Gonzaga</strong>
        </a>{" "}
        <a href="https://www.linkedin.com/in/flaviogonzaga/">
          <GrLinkedin style={{ color: COLORS.gray, marginLeft: "5px" }} />
        </a>
      </div>
    </Footer>
  );
};

export default DefaultFooter;
