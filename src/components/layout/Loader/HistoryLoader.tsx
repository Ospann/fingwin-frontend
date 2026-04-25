import { Skeleton, Row } from 'antd';

export default function HistoryLoader() {
    return (
        <div style={{ padding: '16px', width: '100%' }}>
            <Row justify="space-between" style={{ marginBottom: '16px' }}>
                <Skeleton.Input active style={{ width: 150, height: 20 }} />
                <Skeleton.Input active style={{ width: 200, height: 40 }} />
            </Row>
            <Skeleton active style={{ width: '100%', height: '90vh' }} />
        </div>
    );
}