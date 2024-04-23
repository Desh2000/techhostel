import { Badge, Box, Button, Card, Grid, Stack, Text, Textarea, ThemeIcon, rem, Title, List, ListItem } from '@mantine/core';
import { IconCircleCheck, IconCircleDashed } from '@tabler/icons-react';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { DateInput } from '@mantine/dates';
import '@mantine/dates/styles.css';
import dayjs from 'dayjs';
import LoadingSpinner from '../components/LoadingSpinner';
import { axios_api } from '../axios';

export default function GatePasses() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [passes, setPasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [description, setDescription] = useState('');

  async function handleSubmit() {
    await axios_api.post('/gatepasses/create', {
      data: {
        start_date: startDate,
        end_date: endDate,
        description
      }
    });
    initData()
  }

  async function initData() {
    setLoading(true);
    const resp = await axios_api.get('/gatepasses/user');
    setPasses(resp.data.map((pass) => {
      var color = pass.state === "approved" ? "green" :
        pass.state === "declined" ? "red" :
          pass.state === "pending" ? "gold" : "";
      return {
        ...pass,
        color
      }
    }));
    setLoading(false);
  }

  useEffect(() => {
    initData();
  }, []);

  return (
    <div>
      <Title fz={26} c="#222" fw={500}>Apply for gate passes</Title>
      <div>
        {loading ? <LoadingSpinner /> : null}
        <Grid mt={24}>
          {passes.map((pass) => {
            return (
              <Grid.Col span={3} key={pass._id}>
                <Card withBorder mih={270} p="lg" style={{
                  border: `1px solid ${pass.color}`
                }}>
                  <Badge color={pass.color} size="xs">
                    {pass.state}
                  </Badge>
                  <Text fz={12} mt={12}>
                    {pass.description}
                  </Text>
                  <List
                    spacing="xs"
                    size="sm"
                    center
                    mt={18}
                    icon={
                      <ThemeIcon color="teal" size={18} radius="xl">
                        <IconCircleCheck style={{ width: rem(16), height: rem(16) }} />
                      </ThemeIcon>
                    }
                  >
                    <List.Item fz={12}>From: {(new Date(pass.start_date)).toLocaleDateString()}</List.Item>
                    <List.Item fz={12}>To: {(new Date(pass.end_date)).toLocaleDateString()}</List.Item>
                  </List>
                </Card>
              </Grid.Col>
            )
          })
          }
        </Grid>
      </div>
      <div>
        <Card withBorder w={420} mt={24} p="md">
          <Title fz={18} fw={500}>Apply Form</Title>
          <Box mt={12}>
            <DateInput
              valueFormat="YYYY-MMM-DD"
              minDate={new Date()}
              maxDate={dayjs(new Date()).add(7, 'days').toDate()}
              onChange={(value) => {
                var dt = dayjs(value).format('YYYY-MM-DD')
                setStartDate(dt)
              }}
              mb={12}
              label="Start date"
              placeholder="Start date"
            />
            <DateInput
              valueFormat="YYYY-MMM-DD"
              onChange={(value) => {
                var dt = dayjs(value).format('YYYY-MM-DD')
                setEndDate(dt)
              }}
              minDate={new Date()}
              maxDate={dayjs(startDate).add(7, 'days').toDate()}
              label="End date"
              placeholder="End date"
            />
            <Textarea
              size="md"
              label="Description"
              withAsterisk
              mt={12}
              rows={5}
              onChange={(e) => setDescription(e.currentTarget.value)}
              description="Description"
              placeholder="Description.."
            />
            <Button onClick={handleSubmit} size="sm" color="dark" mt={18}>Apply</Button>
          </Box>
        </Card>
      </div>
    </div>
  )
};
