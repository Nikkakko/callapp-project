import { Table, Button, Space } from 'antd';
import userStore from '../store';
import styled from 'styled-components';
import { Person } from '../PersonType';
import { deleteUser } from '../api/fetchApi';
import { useState } from 'react';
import SelectedPersonModal from './SelectedPersonModal';
import AddUserModal from './AddUserModal';
import { useNavigate } from 'react-router-dom';

const UsersTable = () => {
  const { users, fetchUsers } = userStore(state => state);
  const [selectedRow, setSelectedRow] = useState<Person>();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isAddUserModalVisible, setIsAddUserModalVisible] =
    useState<boolean>(false);

  const navigate = useNavigate();

  const handleDelete = async (record: Person) => {
    await deleteUser(record.id);
    fetchUsers();
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
      render: (record: Person) => (
        <Space>
          <Button onClick={() => handleDelete(record)} danger type='primary'>
            Delete
          </Button>
        </Space>
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
        footer={() => {
          return (
            <Space style={{}}>
              <Button
                onClick={() => {
                  setIsAddUserModalVisible(true);
                }}
                type='primary'
              >
                Add User
              </Button>

              <Button onClick={() => navigate('/userschart')}>Charts</Button>
            </Space>
          );
        }}
        onRow={record => ({
          onDoubleClick: () => handleRowClick(record),
        })}
        tableLayout='fixed'
        style={{
          cursor: 'pointer',
        }}
      />

      <SelectedPersonModal
        person={selectedRow}
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
      />

      <AddUserModal
        isOpen={isAddUserModalVisible}
        onClose={() => setIsAddUserModalVisible(false)}
      />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  padding: 20px;
`;

export default UsersTable;
