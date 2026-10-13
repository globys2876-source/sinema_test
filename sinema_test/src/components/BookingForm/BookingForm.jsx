import { useState, useMemo } from 'react'
import Button from '../Button/Button.jsx'
import SeatPicker from '../SeatPicker/SeatPicker.jsx'
import styles from './BookingForm.module.css'

const TIMES = ['10:00', '13:30', '16:00', '19:15', '22:00']

function nextDates(count = 5) {
  const list = []
  const today = new Date()
  for (let i = 0; i < count; i++) {
    const d = new Date(today)
    d.setDate(today.getDate() + i)
    list.push(d.toISOString().slice(0, 10))
  }
  return list
}

function occupiedFor(seed) {
  const rows = ['A', 'B', 'C', 'D', 'E']
  const res = []
  let x = 0
  for (const ch of seed) x += ch.charCodeAt(0)
  for (let i = 0; i < 6; i++) {
    x = (x * 9301 + 49297) % 233280
    const r = rows[x % rows.length]
    const c = (x % 8) + 1
    res.push(`${r}${c}`)
  }
  return Array.from(new Set(res))
}

export default function BookingForm({ movie, onConfirm }) {
  const dates = useMemo(() => nextDates(5), [])
  const [date, setDate] = useState(dates[0])
  const [time, setTime] = useState(TIMES[0])
  const [qty, setQty] = useState(1)
  const [seats, setSeats] = useState([])

  const occupied = useMemo(() => occupiedFor(`${date}${time}`), [date, time])

  const toggleSeat = (seat) => {
    setSeats((prev) =>
      prev.includes(seat) ? prev.filter((s) => s !== seat) : [...prev, seat]
    )
  }

  const finalQty = seats.length > 0 ? seats.length : qty
  const total = finalQty * movie.price

  const submit = () => {
    onConfirm({
      movieId: movie.id,
      title: movie.title,
      poster: movie.poster,
      price: movie.price,
      date,
      time,
      qty: finalQty,
      seats,
    })
  }

  return (
    <div className={styles.form}>
      <div className={styles.block}>
        <label>Дата</label>
        <div className={styles.chips}>
          {dates.map((d) => (
            <button
              key={d}
              className={`${styles.chip} ${date === d ? styles.chipActive : ''}`}
              onClick={() => setDate(d)}
            >
              {d.slice(8, 10)}.{d.slice(5, 7)}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.block}>
        <label>Время сеанса</label>
        <div className={styles.chips}>
          {TIMES.map((t) => (
            <button
              key={t}
              className={`${styles.chip} ${time === t ? styles.chipActive : ''}`}
              onClick={() => { setTime(t); setSeats([]) }}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.block}>
        <label>Количество билетов</label>
        <div className={styles.counter}>
          <button onClick={() => setQty((q) => Math.max(1, q - 1))} disabled={seats.length > 0}>−</button>
          <span>{finalQty}</span>
          <button onClick={() => setQty((q) => q + 1)} disabled={seats.length > 0}>+</button>
          {seats.length > 0 && <small className={styles.hint}>по выбранным местам</small>}
        </div>
      </div>

      <div className={styles.block}>
        <label>Выбор мест (необязательно)</label>
        <SeatPicker occupied={occupied} selected={seats} onToggle={toggleSeat} />
        {seats.length > 0 && (
          <p className={styles.seatList}>Выбраны: {seats.join(', ')}</p>
        )}
      </div>

      <div className={styles.summary}>
        <span>Итого:</span>
        <strong>{total} ₽</strong>
      </div>

      <Button variant="primary" size="lg" full onClick={submit}>
        Добавить в корзину
      </Button>
    </div>
  )
}
