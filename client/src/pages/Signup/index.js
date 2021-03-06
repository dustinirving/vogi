// Import React
import React from 'react'
// Import Components
import PartnerForm from '../../components/SignUpForms/partnerForm'
import VolunteerForm from '../../components/SignUpForms/volunteerForm'
// Import Components from Antdesign
import { Layout, Card, Row, Col, Divider } from 'antd'
import AltNavbar from '../../components/AltNavbar'
// import Navbar from '../../components/Navbar'
import useWindowSize from '../../utils/useWindowSize'

const { Content } = Layout

function SignUp () {
  // Responsive Styling
  const [width] = useWindowSize()
  const styling = {
    wrapper: {},
    header: {
      border: 'none',
      color: '#353452',
      fontSize: width > 990 ? 22 : 20
    },
    content: {
      paddingTop: width > 767 ? 24 : 20,
      margin: 0,
      minHeight: width > 767 ? '90vh' : '94vh',
      backgroundColor: '#F8F8F8'
    },
    volunteerCard: {
      width: '100%',
      marginLeft: '0rem',
      marginBottom: width > 990 ? '0%' : '5%',
      marginTop: width > 990 ? '20%' : '0%',
      border: '1px #C4C4C4 solid',
      borderRadius: '15px'
    },

    partnerCard: {
      width: '100%',
      marginLeft: '0rem',
      marginBottom: width > 990 ? '0%' : '5%',
      marginTop: width > 990 ? '20%' : '0%',
      border: '1px #C4C4C4 solid',
      borderRadius: '15px'
    }
  }
  return (
    <div style={styling.page}>
      <AltNavbar />
      <Layout>
        <Content style={styling.content}>
          <Row justify='center'>
            <Col xl={10} lg={10} md={18} sm={20} xs={21}>
              <Card
                size={width > 550 ? 'default' : 'small'}
                title='Volunteer Sign Up'
                headStyle={styling.header}
                style={styling.volunteerCard}
              >
                <VolunteerForm />
              </Card>
            </Col>
            <Col className='gutter-row' xl={2} lg={2} md={0} sm={0} xs={0}>
              <Divider
                type='vertical'
                // style={{ borderColor: '#C4C4C4', minHeight: '80vh' }}
                style={{
                  borderColor: '#C4C4C4',
                  minHeight: '50vh',
                  marginTop: '85px'
                }}
              ></Divider>
            </Col>
            <Col xl={10} lg={10} md={18} sm={20} xs={21}>
              <Card
                size={width > 550 ? 'default' : 'small'}
                title='Partner Sign Up'
                headStyle={styling.header}
                style={styling.partnerCard}
              >
                <PartnerForm />
              </Card>
            </Col>
          </Row>
        </Content>
      </Layout>
    </div>
  )
}
// Export The Component
export default SignUp
