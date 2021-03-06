// Import React dependencies
import React, { useEffect } from 'react'
// Import components from antdesign
import { Form, Input, Button, notification } from 'antd'
// Import the API methods
import API from '../../../utils/API'
// Use WindowSize for responsiveness
import useWindowSize from '../../../utils/useWindowSize'

function Profile () {
  // Responsive styling
  const [width] = useWindowSize()
  const styling = {
    formLayout: {
      labelCol: {
        span: 5
      },
      wrapperCol: {
        span: 16
      }
    },
    leftAlign: {
      textAlign: 'left'
    },
    button: {
      span: 24,
      align: 'center',
      backgroundColor: '#FD4F64',
      border: 'none'
    },
    content: {
      minHeight: width > 767 ? '70vh' : '80vh'
    }
  }
  // Use antdesign form methods
  const [form] = Form.useForm()
  // Notification method that the user has updated their profile
  const openNotificationWithIcon = type => {
    notification[type]({
      message: 'Profile Updated',
      description: 'You have successfully updated your profile.'
    })
  }
  // Update the user info for a volunteer
  const onFinish = values => {
    API.updateVolunteer(values)
      .then(res => {
        openNotificationWithIcon('success')
        return res.data
      })
      .catch(err => {
        console.log(err)
      })
  }
  // when the component mounts conditionally put in user info into the inputs if the user has added the info already
  useEffect(() => {
    API.getUser().then(res => {
      if (res.data.volunteerFirstName)
        form.setFieldsValue({ first: res.data.volunteerFirstName })
      if (res.data.volunteerLastName)
        form.setFieldsValue({ last: res.data.volunteerLastName })
      if (res.data.volunteerAbout)
        form.setFieldsValue({ about: res.data.volunteerAbout })
      if (res.data.volunteerSkills)
        form.setFieldsValue({ skills: res.data.volunteerSkills })
    })
  }, [])

  return (
    <div style={styling.content}>
      <Form onFinish={onFinish} form={form}>
        <Form.Item
          {...styling.formLayout}
          name='first'
          colon={false}
          label='First Name'
        >
          <Input placeholder='Enter your first name...' />
        </Form.Item>
        <Form.Item
          {...styling.formLayout}
          name='last'
          colon={false}
          label='Last Name'
        >
          <Input placeholder='Enter your last name...' />
        </Form.Item>
        <Form.Item
          {...styling.formLayout}
          name='skills'
          colon={false}
          label='Skills'
        >
          <Input placeholder='Your list of skills...' />
        </Form.Item>
        <Form.Item
          {...styling.formLayout}
          name='about'
          colon={false}
          label='About'
        >
          <Input.TextArea placeholder='About you section...' />
        </Form.Item>
        <Form.Item>
          <Button
            type='primary'
            htmlType='submit'
            shape='round'
            style={styling.button}
          >
            Save
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
// Export the Component
export default Profile
