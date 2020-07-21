import React, { useState, useEffect } from 'react'
import {
  Layout,
  Card,
  Row,
  Col,
  Form as AntForm,
  Input,
  Button,
  Steps,
  List,
  notification,
  Progress
} from 'antd'
import { CarryOutOutlined } from '@ant-design/icons'
import API from '../../../utils/API'

const { Content } = Layout
const { TextArea } = Input
const { Step } = Steps

const styling = {
  wrapper: {},
  header: {
    border: 'none',
    color: '#1890ff',
    fontSize: '22px',
    marginBottom: 0
  },
  content: {
    padding: 0,
    margin: 0,
    minHeight: '100vh'
  },
  card: {
    width: '100%',
    marginTop: '3%'
  },
  cardBody: {
    paddingTop: 0
  }
}

function CurrentProject ({ currentProject }) {
  const [form] = AntForm.useForm()

  const [issuesData, setIssuesData] = useState([])
  const [percent, setPercent] = useState(0)

  useEffect(() => {
    const repoName = currentProject.name.trim()
    API.getAllIssues(repoName).then(res => {
      const issues = res.data[0]
      const progress = res.data[1]
      setIssuesData(issues)
      console.log(progress)
      const value = Math.round(
        (progress.closedIssues / progress.totalIssues) * 100
      )
      value === NaN ? setPercent(0) : setPercent(value)
    })
  }, [currentProject])

  const openNotification = type => {
    notification[type]({
      message: 'Issue Created',
      description: 'You have successfully created a new project issue.'
    })
  }

  const onFinish = values => {
    const { title, body } = values
    API.addIssue({ repoName: currentProject.name, title, body }).then(res => {
      openNotification('success')
      setIssuesData([
        { title: title, body: body, state: 'open' },
        ...issuesData
      ])
    })
  }

  const onDelete = () => {
    API.deleteProject({
      repo: currentProject.name,
      _id: currentProject._id
    }).then(() => window.location.reload())
  }

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo)
  }

  return (
    <>
      <Content style={styling.content}>
        <Row justify='center'>
          <Col xl={10} lg={10} md={20} sm={20} xs={20}>
            <Card
              title='Project Actions'
              headStyle={styling.header}
              style={styling.card}
              bodyStyle={styling.cardBody}
            >
              <div>
                <h3>Create Project Issues</h3>
                <AntForm
                  form={form}
                  name='issue form'
                  initialValues={{ title: '', body: '' }}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                >
                  <AntForm.Item
                    // {...styling.formLayout}
                    label='Title'
                    rules={[
                      {
                        required: true,
                        message: 'Please input the issue title!'
                      }
                    ]}
                    colon={false}
                    name='title'
                  >
                    <Input />
                  </AntForm.Item>
                  <AntForm.Item
                    // {...styling.formLayout}
                    label='Description'
                    rules={[
                      {
                        required: true,
                        message: 'Please enter the issue description!'
                      }
                    ]}
                    colon={false}
                    name='body'
                  >
                    <TextArea rows={4} />
                  </AntForm.Item>
                  <AntForm.Item>
                    <Button type='primary' shape='round' htmlType='submit'>
                      Add Project Issue
                    </Button>
                  </AntForm.Item>
                </AntForm>
              </div>
              <div>
                <p style={{ color: 'red', paddingTop: '2rem' }}>
                  Warning: Deleting the project erases your project from the
                  database as well as the files on GitHub.
                </p>
                <Button type='primary' shape='round' danger onClick={onDelete}>
                  Delete Project
                </Button>
              </div>
            </Card>
          </Col>

          <Col className='gutter-row' xl={1} lg={1} md={0} sm={0} xs={0}></Col>
          <Col xl={10} lg={10} md={20} sm={20} xs={20}>
            <Card
              title='Project Status'
              headStyle={styling.header}
              style={styling.card}
              bodyStyle={styling.cardBody}
            >
              <div
                style={{
                  wordWrap: 'break-word',
                  marginTop: '1rem',
                  backgroundColor: '#F8F8F8',
                  width: '100%',
                  minHeight: 220
                }}
              >
                {/* <Timeline>
                  {issuesData.map(item => <Timeline.Item>{item.title}</Timeline.Item>)}
                </Timeline> */}
                <h3 style={{ paddingTop: '0rem' }}>Issues</h3>
                <List
                  itemLayout='horizontal'
                  split={false}
                  dataSource={issuesData}
                  renderItem={item => {
                    const iconColor =
                      item.state === 'open' ? '#87d068' : '#c4c4c4'
                    return (
                      <List.Item
                        style={{
                          textAlign: 'left',
                          marginLeft: '2rem'
                        }}
                      >
                        <CarryOutOutlined
                          style={{ color: iconColor, fontSize: '2.5vh' }}
                        />
                        {item.title}
                      </List.Item>
                    )
                  }}
                />
              </div>
              <br />
              <Button type='primary' shape='round'>
                View Repository
              </Button>
              <br />
              <br />
              <Progress width={80} type='circle' percent={percent} />
            </Card>
          </Col>
        </Row>
      </Content>
    </>
  )
}

export default CurrentProject
