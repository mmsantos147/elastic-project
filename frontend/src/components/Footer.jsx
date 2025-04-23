import { Layout, Typography } from "antd";
import COLORS from "../colors";
import { useTranslation } from "react-i18next";

const { Footer } = Layout;
const { Text } = Typography;

const DefaultFooter = () => {
    const { t } = useTranslation();
    return (

        <Footer
            style={{
            backgroundColor: '#171717',
            color: COLORS.gray,
            textAlign: 'center',
            borderTop: '1px solid #3c4043',
            padding: '20px',
            }}
        >
            <div style={{ marginBottom: '10px' }}>Brasil</div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
            <Text style={{ color: COLORS.gray, cursor: 'pointer' }}>{t("about")}</Text>
            <Text style={{ color: COLORS.gray, cursor: 'pointer' }}>{t("advertisement")}</Text>
            <Text style={{ color: COLORS.gray, cursor: 'pointer' }}>{t("business")}</Text>
            <Text style={{ color: COLORS.gray, cursor: 'pointer' }}>{t("how_search_works")}</Text>
            <Text style={{ color: COLORS.gray, cursor: 'pointer' }}>{t("privacy")}</Text>
            <Text style={{ color: COLORS.gray, cursor: 'pointer' }}>{t("terms")}</Text>
            <Text style={{ color: COLORS.gray, cursor: 'pointer' }}>{t("settings")}</Text>
            </div>
      </Footer>
    );
}

export default DefaultFooter;