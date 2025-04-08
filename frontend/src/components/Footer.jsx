import { Layout, Typography } from "antd";
import COLORS from "../colors";

const { Footer } = Layout;
const { Text } = Typography;

const DefaultFooter = () => {
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
            <Text style={{ color: COLORS.gray, cursor: 'pointer' }}>Sobre</Text>
            <Text style={{ color: COLORS.gray, cursor: 'pointer' }}>Publicidade</Text>
            <Text style={{ color: COLORS.gray, cursor: 'pointer' }}>Negócios</Text>
            <Text style={{ color: COLORS.gray, cursor: 'pointer' }}>Como funciona a Pesquisa</Text>
            <Text style={{ color: COLORS.gray, cursor: 'pointer' }}>Privacidade</Text>
            <Text style={{ color: COLORS.gray, cursor: 'pointer' }}>Termos</Text>
            <Text style={{ color: COLORS.gray, cursor: 'pointer' }}>Configurações</Text>
            </div>
      </Footer>
    );
}

export default DefaultFooter;