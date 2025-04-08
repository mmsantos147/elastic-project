import { Layout, Typography } from "antd";

const { Footer } = Layout;
const { Text } = Typography;

const DefaultFooter = () => {
    return (
        <Footer
            style={{
            backgroundColor: '#171717',
            color: '#9aa0a6',
            textAlign: 'center',
            borderTop: '1px solid #3c4043',
            padding: '20px',
            }}
        >
            <div style={{ marginBottom: '10px' }}>Brasil</div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
            <Text style={{ color: '#9aa0a6', cursor: 'pointer' }}>Sobre</Text>
            <Text style={{ color: '#9aa0a6', cursor: 'pointer' }}>Publicidade</Text>
            <Text style={{ color: '#9aa0a6', cursor: 'pointer' }}>Negócios</Text>
            <Text style={{ color: '#9aa0a6', cursor: 'pointer' }}>Como funciona a Pesquisa</Text>
            <Text style={{ color: '#9aa0a6', cursor: 'pointer' }}>Privacidade</Text>
            <Text style={{ color: '#9aa0a6', cursor: 'pointer' }}>Termos</Text>
            <Text style={{ color: '#9aa0a6', cursor: 'pointer' }}>Configurações</Text>
            </div>
      </Footer>
    );
}

export default DefaultFooter;