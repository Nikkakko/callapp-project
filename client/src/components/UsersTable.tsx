import { Table, Button } from 'antd';
import userStore from '../store';
import styled from 'styled-components';
import { Person } from '../PersonType';
import { deleteUser } from '../api/fetchApi';

const UsersTable = () => {
  const { users } = userStore(state => state);

  const handleDelete = (record: Person) => {
    deleteUser(record.id);
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
      <Table dataSource={users} columns={columns} />
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
