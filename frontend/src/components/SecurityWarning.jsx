import { Alert } from "antd";
import styled from "styled-components";

const FixedAlertWrapper = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
`;

const StyledAlert = styled(Alert)`
  display: flex;
  align-items: center;

  .ant-alert-icon {
    align-self: center;
  }

  .ant-alert-close-icon {
    align-self: center;
    margin-top: 0 !important;
  }
`;

export const SecurityWarning = () => {
  return (
    <FixedAlertWrapper>
      <StyledAlert
        message={<b>Atenção: Esse site é puramente para fins de estudos</b>}
        description={
          <>
            Este site é apenas para fins de demonstração.{' '}
            <strong>Jamais</strong> insira <strong>credenciais reais</strong> neste sistema.
          </>
        }
        type="warning"
        showIcon
        banner
        closable
      />
    </FixedAlertWrapper>
  );
};
