import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Table from 'react-bootstrap/esm/Table'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  PlayCircleOutlined,
  StopOutlined,
  DatabaseOutlined,
} from '@ant-design/icons'
import { Button } from 'react-bootstrap'
import Layout from './layout/Layout'
import { RootState } from '../store/types'
import { Onboarding, OnboardingStatus } from '../types'
import {
  removeOnboarding,
  selectAll,
  updateOnboarding,
} from '../features/onboarding/onboardingsSlice'
import { BUILDER_URL, DATA_URL, ONBOARDING_URL } from '../router'

interface RowProps {
  onboarding: Onboarding
  actions: {
    handleEditClick: (id: string) => void
    handleChangeStatusClick: (onboarding: Onboarding) => void
    handleDeleteClick: (id: string) => void
    handlePreviewClick: (name: string) => void
    handleDataClick: (id: string) => void
  }
}

const renderRow = ({ onboarding, actions }: RowProps) => {
  return (
    <tr key={onboarding.id}>
      <td>{onboarding.configuration.name}</td>
      <td>{onboarding.dynamicSteps.length}</td>
      <td>{onboarding.status}</td>
      <td>
        <Button
          variant="outline-secondary"
          onClick={() => actions.handleEditClick(onboarding.id as string)}
          title="Edit"
        >
          <EditOutlined />
        </Button>
        <Button
          variant="outline-secondary"
          onClick={() => actions.handleChangeStatusClick(onboarding)}
          title={onboarding.status === OnboardingStatus.active ? 'Disable' : 'Enable'}
        >
          {onboarding.status === OnboardingStatus.active ? (
            <StopOutlined />
          ) : (
            <PlayCircleOutlined />
          )}
        </Button>
        <Button
          variant="outline-danger"
          onClick={() => actions.handleDeleteClick(onboarding.id as string)}
          title="Delete"
        >
          <DeleteOutlined />
        </Button>
        <Button
          variant="outline-secondary"
          onClick={() => actions.handlePreviewClick(onboarding.encodedName as string)}
          title="Preview"
        >
          <EyeOutlined />
        </Button>
        <Button
          variant="outline-secondary"
          onClick={() => actions.handleDataClick(onboarding.id as string)}
          title="View Collected Data"
        >
          <DatabaseOutlined />
        </Button>
      </td>
    </tr>
  )
}

export default function OnboardingsGrid() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const onboardings = useSelector((state: RootState) => selectAll(state.onboardings))
  const handleChangeStatusClick = (onboarding: Onboarding) => {
    const changedStatus = {
      ...onboarding,
      status:
        onboarding.status === OnboardingStatus.active
          ? OnboardingStatus.disabled
          : OnboardingStatus.active,
    }
    dispatch(updateOnboarding(changedStatus))
  }
  const handleEditClick = (id: string) => navigate(`${BUILDER_URL}/${id}`)
  const handleDeleteClick = (id: string) => {
    if (window.confirm('Are you sure you want to remove this item?')) dispatch(removeOnboarding(id))
  }
  const handlePreviewClick = (name: string) => navigate(`${ONBOARDING_URL}/${name}`)
  const handleDataClick = (id: string) => navigate(`${DATA_URL}/${id}`)

  return (
    <Layout>
      <>
        <Row>
          <Col>
            <h2>Onboardings</h2>
          </Col>
          <Col>
            <Link to={BUILDER_URL} className="float-end btn btn-primary">
              Create
            </Link>
          </Col>
        </Row>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Steps count</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {onboardings.map((value) =>
              renderRow({
                onboarding: value,
                actions: {
                  handleEditClick,
                  handleChangeStatusClick,
                  handleDeleteClick,
                  handlePreviewClick,
                  handleDataClick,
                },
              }),
            )}
          </tbody>
        </Table>
      </>
    </Layout>
  )
}
