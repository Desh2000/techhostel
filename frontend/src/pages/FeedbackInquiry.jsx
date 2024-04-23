import React, { useEffect, useState } from 'react';
import { Alert, Button, Card, Grid, Group, Notification, Tabs, Text, TextInput, Textarea, Title, rem } from '@mantine/core';
import { IconMessage, IconFileAlert, IconBubbleText, IconExclamationCircle } from '@tabler/icons-react';
import { axios_api } from '../axios';

export default function FeedbackInquiry() {
  const [complains, setComplains] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [complain, setComplain] = useState({
    subject: '',
    description: ''
  });
  const [feedback, setFeedback] = useState('');
  const [feedbackTitle, setFeedbackTitle] = useState('');
  const [inquiry, setInquiry] = useState('');

  const iconStyle = { width: rem(16), height: rem(16) };

  async function handleSubmitComplain() {
    await axios_api.post('/complains/create', {
      data: {
        ...complain
      }
    });
    initData();
  }
  async function handleSubmitFeedback() {
    await axios_api.post('/feedbacks/create', {
      data: {
        description: feedback,
        subject: feedbackTitle
      }
    });
    initData();
  }
  async function handleSubmitInquiry() {
    await axios_api.post('/inquiries/submit', {
      data: {
        description: inquiry
      }
    });
    initData();
  }
  async function initData() {
    const requests = [
      axios_api.get('/complains/user'),
      axios_api.get('/inquiries'),
      axios_api.get('/feedbacks/user'),
    ];
    const [respComplains, respInqs, respFeedbacks] = await Promise.all(requests);
    setComplains(respComplains.data);
    setFeedbacks(respFeedbacks.data);
    setInquiries(respInqs.data);
  }

  useEffect(() => {
    initData()
  }, []);

  return (
    <>
      <Title fz={26} c="#222" fw={500}>Submit your Inquiry, Complain or Feedback</Title>
      <Tabs mt={32} defaultValue="inquiry" variant='outline'>
        <Tabs.List>
          <Tabs.Tab value="inquiry" leftSection={<IconMessage style={iconStyle} />}>
            Inquiry
          </Tabs.Tab>
          <Tabs.Tab value="complain" leftSection={<IconFileAlert style={iconStyle} />}>
            Complain
          </Tabs.Tab>
          <Tabs.Tab value="feedback" leftSection={<IconBubbleText style={iconStyle} />}>
            Feedback
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="inquiry">
          <div style={{
            padding: "15px"
          }}>
            <div>
              <Title fz={20} fw={500} my={16}>Your Inquiries</Title>
              <Grid mb={20}>
                {inquiries.map((inq) => {
                  return (
                    <Grid.Col span={3}>
                      <Card withBorder c="blue">
                        {inq.description}
                      </Card>
                    </Grid.Col>
                  )
                })}
              </Grid>
            </div>
            <Textarea
              size="md"
              label="Inquiry"
              withAsterisk
              rows={12}
              onChange={(e) => setInquiry(e.currentTarget.value)}
              description="Inquiry description"
              placeholder="Inquiry.."
            />
            <Button onClick={handleSubmitInquiry} mt={12}>Submit</Button>
          </div>
        </Tabs.Panel>

        <Tabs.Panel value="complain">
          <div style={{
            padding: "15px"
          }}>
            <div>
              <Title fz={20} fw={500} my={16}>Your Complains</Title>
              <Grid mb={20}>
                {complains.map((item) => {
                  return (
                    <Grid.Col span={3}>
                      <Alert variant="light" color="red" title={item.subject} icon={<IconExclamationCircle />}>
                        {item.description}
                      </Alert>
                    </Grid.Col>
                  )
                })}
              </Grid>
            </div>
            <TextInput
              label="Subject"
              onChange={(e) => {
                let data = { ...complain, subject: e.currentTarget.value };
                setComplain(data);
              }}
              placeholder='Subject'
              value={complain.subject} />
            <Textarea
              size="md"
              label="Complain"
              withAsterisk
              rows={12}
              mt={18}
              onChange={(e) => {
                let data = { ...complain, description: e.currentTarget.value };
                setComplain(data);
              }}
              value={complain.description}
              description="Complain description"
              placeholder="Complain.."
            />
            <Button onClick={handleSubmitComplain} color="red" mt={12}>Make Complain</Button>
          </div>
        </Tabs.Panel>

        <Tabs.Panel value="feedback">
          <div style={{
            padding: "15px"
          }}>
            <div>
              <Title fz={20} fw={500} my={16}>Your Feedbacks</Title>
              <Grid my={20} gutter={12}>
                {feedbacks.map((fd) => {
                  return (
                    <Grid.Col>
                      <Notification
                        withCloseButton={false}
                        color="cyan"
                        title={<Title fz={18}>{fd.subject}</Title>}>
                        <Title fz={16} mt={16}>{fd.description}</Title>
                        <Group justify='end'>
                          <Text>{fd.user_email}</Text>
                        </Group>
                      </Notification>
                    </Grid.Col>
                  )
                })}
              </Grid>
            </div>
            <Text my={12}>Submit your feedback</Text>
            <TextInput
              mb={16}
              label="Subject"
              onChange={(e) => setFeedbackTitle(e.currentTarget.value)}
              placeholder='Subject'
              value={feedbackTitle} />
            <Textarea
              size="md"
              label="Feedback"
              withAsterisk
              onChange={(e) => setFeedback(e.currentTarget.value)}
              rows={12}
              description="Feedback description"
              placeholder="Feedback.."
            />
            <Button color="green" onClick={handleSubmitFeedback} mt={12}>Submit</Button>
          </div>
        </Tabs.Panel>
      </Tabs>
    </>

  )
}
