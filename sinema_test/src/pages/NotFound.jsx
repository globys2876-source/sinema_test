import { Link } from 'react-router-dom'
import Button from '../components/Button/Button.jsx'
import StateView from '../components/StateView/StateView.jsx'

export default function NotFound() {
  return (
    <StateView type="error" title="Страница не найдена (404)">
      <Link to="/"><Button variant="primary">На главную</Button></Link>
    </StateView>
  )
}
