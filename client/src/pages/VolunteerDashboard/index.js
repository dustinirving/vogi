import React, { useState, useEffect, useContext } from 'react'
import Navbar from '../../components/Navbar'
import { Layout, Card } from 'antd'
import VolunteerSidebar from '../../components/VolunteerSidebar'
import Profile from '../../dashboard-content/volunteer/Profile'
import NewProject from '../../dashboard-content/volunteer/NewProject'
import API from '../../utils/API'
import CurrentProject from '../../dashboard-content/volunteer/ActiveProjects'
import UserContext from '../../utils/UserContext'
// Import React Context API
import AvailableProjectContext from '../../utils/AvailableProjectContext'
import JoinedProjectContext from '../../utils/JoinedProjectContext'
import useWindowSize from '../../utils/useWindowSize'

const { Content, Footer } = Layout

function VolunteerDashboard () {
  const [width, height] = useWindowSize()
  const styling = {
    layout: {
      minHeight: '100vh'
    },
    header: {
      backgroundColor: '#E6F7FF'
    },
    content: {
      margin: width > 767 ? '10px' : '5px'
    },
    contentDiv: {
      padding: 24,
      minHeight: 360,
      backgroundColor: 'white'
    },
    footer: {
      textAlign: 'center'
    },
    cardSize: width > 767 ? 'default' : 'small'
  }
  const [title, setTitle] = useState('Profile')
  const [availableProjects, setAvailableProjects] = useState([])
  const [currentProjects, setCurrentProjects] = useState([])
  const [currentProject, setCurrentProject] = useState('')
  const user = useContext(UserContext)

  // Get Available Projects to Join
  useEffect(() => {
    API.getAvailableProjects().then(res => {
      const fetchedProjects = res.data.map(
        ({ _id, name, description, skills }) => {
          return {
            _id,
            name,
            description,
            skills
          }
        }
      )
      setAvailableProjects(fetchedProjects)
      return res.data
    })
  }, [currentProjects])

  useEffect(() => {
    // Get Current Projects
    API.getUser().then(res => {
      const joinedProjects = res.data.projects.map(
        ({ _id, name, description, skills }) => {
          return {
            _id,
            name,
            description,
            skills
          }
        }
      )
      setCurrentProjects(joinedProjects)
    })
  }, [])

  const contentHandler = title => {
    setTitle(title)
  }

  const currentProjectHandler = id => {
    console.log(id)
    currentProjects.forEach(project => {
      if (project._id === id) {
        setCurrentProject(project)
        setTitle(project.name)
      }
    })
  }

  const joinProjectHandler = id => {
    API.joinProject({ userID: user._id, projectID: id })
      .then(res => {
        setCurrentProjects([...currentProjects, res.data])
      })
      .catch(err => {
        console.log(err)
      })
  }

  const renderContent = () => {
    switch (title) {
      case 'Profile':
        return <Profile />
      case 'Join a New Project':
        return <NewProject joinProjectHandler={joinProjectHandler} />
      default:
        return <CurrentProject currentProject={currentProject} />
    }
  }
  return (
    <>
      <AvailableProjectContext.Provider value={availableProjects}>
        <JoinedProjectContext.Provider value={currentProjects}>
          <Navbar authenticated='true' />
          <Layout style={styling.layout}>
            <VolunteerSidebar
              contentHandler={contentHandler}
              currentProjectHandler={currentProjectHandler}
            />
            <Layout>
              <Content style={styling.content}>
                <Card
                  title={title}
                  headStyle={styling.header}
                  size={styling.cardSize}
                >
                  {renderContent()}
                </Card>
              </Content>
              <Footer style={styling.footer}>
                Ant Design ©2018 Created by Ant UED
              </Footer>
            </Layout>
          </Layout>
        </JoinedProjectContext.Provider>
      </AvailableProjectContext.Provider>
    </>
  )
}

export default VolunteerDashboard
