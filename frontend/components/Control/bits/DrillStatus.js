import { useAppContext } from '../../../contexts/Context'
import './DrillStatus.css'

const DrillStatus = () => {
    const { appState: { strikeCount } } = useAppContext();

    return (
        <div className="body">
            <div className="drill-status">
                <div className="strikes-title">Strikes</div>
                <div className="strikes">
                    <div className={strikeCount < 1 ? "inactive" : "active"}></div>
                    <div className={strikeCount < 2 ? "inactive" : "active"}></div>
                    <div className={strikeCount < 3 ? "inactive" : "active"}></div>
                </div>
            </div>
        </div>
    );
}

export default DrillStatus
