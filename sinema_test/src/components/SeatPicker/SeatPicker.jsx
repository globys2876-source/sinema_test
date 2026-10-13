import styles from './SeatPicker.module.css'

const ROWS = ['A', 'B', 'C', 'D', 'E']
const COLS = 8

export default function SeatPicker({ occupied = [], selected = [], onToggle }) {
  return (
    <div className={styles.wrap}>
      <div className={styles.screen}>ЭКРАН</div>
      <div className={styles.hall}>
        {ROWS.map((row) => (
          <div key={row} className={styles.row}>
            <span className={styles.rowLabel}>{row}</span>
            {Array.from({ length: COLS }).map((_, i) => {
              const seat = `${row}${i + 1}`
              const isOccupied = occupied.includes(seat)
              const isSelected = selected.includes(seat)
              const cls = [
                styles.seat,
                isOccupied ? styles.occupied : '',
                isSelected ? styles.selected : '',
              ].join(' ')
              return (
                <button
                  key={seat}
                  className={cls}
                  disabled={isOccupied}
                  onClick={() => onToggle(seat)}
                  aria-label={`Место ${seat}`}
                  title={seat}
                >
                  {i + 1}
                </button>
              )
            })}
          </div>
        ))}
      </div>
      <div className={styles.legend}>
        <span><i className={styles.free} /> Свободно</span>
        <span><i className={styles.sel} /> Выбрано</span>
        <span><i className={styles.occ} /> Занято</span>
      </div>
    </div>
  )
}
