import { Layout, Button, Space, Typography } from "antd";
import { SunOutlined } from '@ant-design/icons';

const { Header } = Layout;
const { Text } = Typography;

const DefaultHeader = () => {
    return  ( 
        <Header 
            style={{ 
                backgroundColor: 'transparent', 
                display: 'flex', 
                justifyContent: 'flex-end',
                alignItems: 'center',
                height: '64px',
                padding: '0 24px',
            }}
        >
            <Space size="large">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <SunOutlined style={{ fontSize: '20px', color: '#fff' }} />
                <Text style={{ fontWeight: 'bold', color: '#fff' }}>16 °C</Text>
            </div>
            <Button type="primary" style={{ padding: '18px', borderRadius: '999px' }}>
                <b>Fazer login</b>
            </Button>
            </Space>
        </Header>
    );

}

export default DefaultHeader;
    