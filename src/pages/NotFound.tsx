import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { MAIN_URL } from '../router'

export default function NotFound() {
  const navigate = useNavigate()
  return (
    <>
      <h1>Page Not Found</h1>
      <Button onClick={() => navigate(MAIN_URL)}>Go to main page</Button>
    </>
  )
}
