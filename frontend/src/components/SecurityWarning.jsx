import { Alert } from "antd";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();

  return (
    <FixedAlertWrapper>
      <StyledAlert
        message={<b>{t("warning_part_1")}</b>}
        description={
          <>
            {t("warning_part_2")}.{' '}
            <strong>{t("warning_part_3")}</strong>{' '}{t("warning_part_5")}{' '}<strong>{t("warning_part_4")}</strong>{' '}{t("warning_part_5")}.
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
