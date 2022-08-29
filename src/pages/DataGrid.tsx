import { Fragment, SyntheticEvent } from 'react'
import { Row, Col, Table } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { selectAll } from '../features/data/dataSlice'
import { RootState } from '../store/types'
import { Data } from '../types'
import Layout from './layout/Layout'

const renderRow = ({ id, onboardingId, data }: Data) => {
  const onRowClick = (e: SyntheticEvent<HTMLTableRowElement>) => {
    const collapsibleElement = e.currentTarget.nextSibling as HTMLTableRowElement

    const showClassPresent = collapsibleElement.className.indexOf('collapse show') > -1
    if (showClassPresent) collapsibleElement.classList.remove('show')
    else collapsibleElement.classList.add('show')
  }

  return (
    <Fragment key={id}>
      <tr onClick={onRowClick} style={{ cursor: 'pointer' }}>
        <td>{id}</td>
        <td>{onboardingId}</td>
      </tr>
      <tr className="collapse">
        <td colSpan={3}>
          <table>
            <thead>
              <tr>
                <th>Key</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {data.map((element, index) => (
                <tr key={index}>
                  <td>{element.key}</td>
                  <td>{element.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </td>
      </tr>
    </Fragment>
  )
}

export default function DataGrid() {
  const data = useSelector((state: RootState) => selectAll(state.data))

  return (
    <Layout>
      <>
        <Row>
          <Col>
            <h2>Data Collected</h2>
          </Col>
        </Row>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Onboarding</th>
            </tr>
          </thead>
          <tbody>{data.map((value) => renderRow(value))}</tbody>
        </Table>
      </>
    </Layout>
  )
}
