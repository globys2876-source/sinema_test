import Button from '../Button/Button.jsx'
import styles from './Filters.module.css'

export default function Filters({
  genres,
  years,
  genre, year, sort,
  onGenre, onYear, onSort, onReset,
}) {
  return (
    <div className={styles.filters}>
      <label className={styles.field}>
        <span>Жанр</span>
        <select value={genre} onChange={(e) => onGenre(e.target.value)}>
          <option value="">Все жанры</option>
          {genres.map((g) => <option key={g} value={g}>{g}</option>)}
        </select>
      </label>

      <label className={styles.field}>
        <span>Год</span>
        <select value={year} onChange={(e) => onYear(e.target.value)}>
          <option value="">Все годы</option>
          {years.map((y) => <option key={y} value={y}>{y}</option>)}
        </select>
      </label>

      <label className={styles.field}>
        <span>Сортировка</span>
        <select value={sort} onChange={(e) => onSort(e.target.value)}>
          <option value="">Без сортировки</option>
          <option value="rating-desc">Рейтинг: по убыванию</option>
          <option value="rating-asc">Рейтинг: по возрастанию</option>
          <option value="title-asc">Название: А → Я</option>
          <option value="title-desc">Название: Я → А</option>
        </select>
      </label>

      <div className={styles.reset}>
        <Button variant="ghost" onClick={onReset}>Сбросить фильтры</Button>
      </div>
    </div>
  )
}
