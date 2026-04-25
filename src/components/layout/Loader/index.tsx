import { Spin, Flex } from 'antd'

export default function Loader() {
    return (
        <Flex
            vertical
            align="center"
            justify="center"
            style={{ height: '100vh', backgroundColor: 'var(--ant-layout-footer-background)' }}
        >
            <Spin size="large" />
        </Flex>
    )
}
