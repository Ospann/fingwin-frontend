import { Typography } from 'antd'
import { Link } from 'react-router-dom'
import { MAIN_ROUTE } from '@/utils/routes/routes.consts'

const { Title } = Typography

/**
 * Simply Plug page if route doesnt exist
 */
export default function NotFound() {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                gap: 16,
            }}
        >
            <img
                src="https://static.tildacdn.com/tild3863-3337-4635-b366-333961366534/logo.svg"
                alt="Logo"
                style={{ height: '30vh', width: '30vh', marginBottom: 16 }}
            />
            <Title level={2}>Страница не найдена</Title>
            <Link to={MAIN_ROUTE} style={{ fontSize: 22, color: '#1890ff' }}>
                Вернитесь на главную страницу
            </Link>
        </div>
    )
}