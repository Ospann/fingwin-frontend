import { Skeleton, Row, Col } from 'antd'
import classes from '../index.module.css'

export default function Loader() {
    return (
        <div className={classes.container}>
            <div className={classes.mainBlock}>
                <Row gutter={16} style={{ marginBottom: 16 }}>
                    <Col>
                        <Skeleton.Input style={{ width: 230, height: 130 }} active />
                    </Col>
                    <Col>
                        <Skeleton.Input style={{ width: 230, height: 130 }} active />
                    </Col>
                    <Col>
                        <Skeleton.Input style={{ width: 230, height: 130 }} active />
                    </Col>
                </Row>
                <Skeleton.Input style={{ width: 730, height: 420, marginBottom: 16 }} active />
            </div>

            <div className={classes.expenseBlock}>
                <Row gutter={16}>
                    <Col>
                        <Skeleton.Input style={{ width: 320, height: 360 }} active />
                    </Col>
                    <Col>
                        <Skeleton.Input style={{ width: 320, height: 360 }} active />
                    </Col>
                </Row>
            </div>
        </div>
    )
}
