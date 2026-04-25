import { Skeleton } from 'antd'
import classes from '../index.module.css'

export default function Loader() {
    return (
        <div className={classes.container}>
            <div className={classes.mainBlock} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ width: '730px', display: 'flex', justifyContent: 'space-between' }}>
                    <Skeleton.Button active style={{ height: '130px', width: '230px' }} />
                    <Skeleton.Button active style={{ height: '130px', width: '230px' }} />
                    <Skeleton.Button active style={{ height: '130px', width: '230px' }} />
                </div>
                <Skeleton.Button active style={{ height: '420px', width: '730px' }} />
            </div>
            <div className={classes.expenseBlock} style={{ display: 'flex', gap: '20px' }}>
                <Skeleton.Button active style={{ height: '360px', width: '320px' }} />
                <Skeleton.Button active style={{ height: '360px', width: '320px' }} />
            </div>
        </div>
    )
}