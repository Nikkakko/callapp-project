import { Table, Button } from 'antd';
import userStore from '../store';
import styled from 'styled-components';
import { Person } from '../PersonType';
import { deleteUser } from '../api/fetchApi';
import { useState } from 'react';
import SelectedPersonModal from './SelectedPersonModal';

const UsersTable = () => {
  const { users } = userStore(state => state);
  const [selectedRow, setSelectedRow] = useState<Person>();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleDelete = (record: Person) => {
    deleteUser(record.id);
  };

  const handleOpenEditModal = (record: Person) => {
    console.log(record);
  };

  const handleRowClick = (record: Person) => {
    setSelectedRow(record);
    setIsModalVisible(true);
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
    },

    {
      title: 'Address',
      children: [
        {
          title: 'Street',
          dataIndex: ['address', 'street'],
          key: 'street',
        },
        {
          title: 'City',
          dataIndex: ['address', 'city'],
          key: 'city',
        },
      ],
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text: string, record: Person) => (
        <>
          <Button onClick={() => handleDelete(record)} danger type='primary'>
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <Container>
      <Table
        dataSource={users}
        columns={columns}
        rowKey={(record: Person) => record.id}
        loading={users.length === 0}
        footer={() => `Total users: ${users.length}`}
        onRow={record => ({
          onClick: () => handleRowClick(record),
        })}
        tableLayout='fixed'
      />

      <SelectedPersonModal
        person={selectedRow}
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
      />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  padding: 20px;
`;

const StyledTable = styled(Table)`
  width: 100%;
`;

export default UsersTable;
