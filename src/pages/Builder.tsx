import { useNavigate, useParams } from 'react-router-dom'
import Layout from './layout/Layout'
import { MAIN_URL } from '../router'
import MainForm from '../components/builder/MainForm'

export default function Builder() {
  const params = useParams()
  const navigate = useNavigate()

  const onSubmit = () => {
    navigate(MAIN_URL)
  }

  return (
    <Layout>
      <MainForm id={params.id} notifySubmit={onSubmit} />
    </Layout>
  )
}
