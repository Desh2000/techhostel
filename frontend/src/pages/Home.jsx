import React, { useEffect, useState } from 'react';
import { axios_api } from '../axios';
import { Card, Grid, Group, Notification, Text, Title, TextInput } from '@mantine/core';
import LoadingSpinner from '../components/LoadingSpinner';
import { IconHome2, IconMessage } from '@tabler/icons-react';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [feedbacks, setFeedbacks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredFeedbacks, setFilteredFeedbacks] = useState([]);

  async function initData() {
    const resp = await axios_api.get('/feedbacks/all').catch((err) => console.log(err));
    setFeedbacks(resp.data);
    setLoading(false);
  }

  useEffect(() => {
    initData();
  }, []);

  useEffect(() => {
    const filtered = feedbacks.filter(fd =>
      fd.subject.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredFeedbacks(filtered);
  }, [searchQuery, feedbacks]);

  return (
    <div>
      <Title mb={30} c="#222" style={{ display: "flex", alignItems: "center" }}>
        <IconHome2 size={32} /> <span style={{ marginLeft: "10px" }}>Home</span>
      </Title>
      <div>
        <TextInput
          placeholder="Search feedbacks by title"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          style={{ marginBottom: '20px' }}
        />
        {loading ? <LoadingSpinner /> :
          <>
            <Title
              fz={18}
              my={18}
              fw={400}
              ps={20}
              pr={50}
              py={6}
              c="#222"
              w="fit-content"
              style={{
                borderTopRightRadius: "60px",
                borderBottomRightRadius: "60px",
                border: "1px solid violet",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-evenly"
              }}
              bg="#b287ff29" ff="monospace">
              <IconMessage size={16} />
              <span style={{ marginLeft: '10px' }}>Feedbacks</span>
            </Title>
            <Grid mt={24} gutter={12}>
              {filteredFeedbacks.map((fd) => {
                return (
                  <Grid.Col key={fd.id}>
                    <Notification
                      withCloseButton={false}
                      color="cyan"
                      title={<Title fz={18}>{fd.subject}</Title>}>
                      <Title fz={16} fw={400} mt={16}>{fd.description}</Title>
                      <Group justify='end'>
                        <Text fz={12}>{fd.user_email}</Text>
                      </Group>
                    </Notification>
                  </Grid.Col>
                )
              })}
            </Grid>
          </>
        }
      </div>
    </div>
  )
}
