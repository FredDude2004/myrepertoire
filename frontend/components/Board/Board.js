import './Board.css'
import { useAppContext } from '../../contexts/Context'

import Ranks from './bits/Ranks'
import Files from './bits/Files'
import Pieces from '../Pieces/Pieces'
import PromotionBox from '../Popup/PromotionBox/PromotionBox'
import Popup from '../Popup/Popup'
import GameEnds from '../Popup/GameEnds/GameEnds'
import VariationEnds from '../Popup/VariationEnds/VariationEnds'
import LineEnds from '../Popup/LineEnds/LineEnds'
import DrillEnds from '../Popup/DrillEnds/DrillEnds'

import arbiter from '../../arbiter/arbiter'
import { getKingPosition } from '../../arbiter/getMoves'

const Board = () => {
    const { appState } = useAppContext();

    let ranks = Array(8).fill().map((_, i) => 8 - i) // [8,7,6,5,4,3,2,1]
    let files = Array(8).fill().map((_, i) => i + 1) // [1,2,3,4,5,6,7,8]

    if (appState.isFlipped) {
        ranks = [...ranks].reverse() // [1,2,3,4,5,6,7,8]
        files = [...files].reverse() // [8,7,6,5,4,3,2,1]
    }

    const position = appState.position[appState.currentPositionIndex]

    const checkTile = (() => {
        const isInCheck = (arbiter.isPlayerInCheck({
            positionAfterMove: position,
            player: appState.turn
        }))

        if (isInCheck)
            return getKingPosition(position, appState.turn)

        return null
    })()

    const getClassName = (i, j) => {
        let c = 'tile'
        c += (i + j) % 2 === 0 ? ' tile--dark ' : ' tile--light '
        if (appState.candidateMoves?.find(m => m[0] === i && m[1] === j)) {
            if (position[i][j])
                c += ' attacking'
            else
                c += ' highlight'
        }

        if (checkTile && checkTile[0] === i && checkTile[1] === j) {
            c += ' checked'
        }

        return c
    }

    const getPositionCoords = (i, j) => {
        if (appState.isFlipped) {
            return [i, 7 - j] // flip horizontally AND vertically
        }
        return [7 - i, j]
    }

    return <div className='board'>

        <Ranks ranks={ranks} />

        <div className='tiles'>
            {ranks.map((rank, i) =>
                files.map((file, j) =>
                    <div
                        key={file + '' + rank}
                        className={`${getClassName(...getPositionCoords(i, j))}`}>
                    </div>
                ))}
        </div>

        <Pieces />

        <Popup>
            <PromotionBox />
            <GameEnds />
            <VariationEnds />
            <DrillEnds />
            <LineEnds />
        </Popup>

        <Files files={files} />

    </div>

}

export default Board
