import { FC } from 'react';
import { Modal, Input, Radio, Button, Form } from 'antd';

import { createUser } from '../api/fetchApi';
import userStore from '../store';

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddUserModal: FC<AddUserModalProps> = ({ isOpen, onClose }) => {
  const { fetchUsers } = userStore(state => state);

  const [form] = Form.useForm();

  const handleAddUser = async () => {
    //get values from form
    const values = form.getFieldsValue();
    //create user
    await createUser(values);
    //fetch users
    fetchUsers();
    //close modal
    onClose();
  };
  return (
    <Modal open={isOpen} onCancel={onClose} footer={null} title='Add user'>
      <Form
        name='basic'
        form={form}
        layout='horizontal'
        autoComplete='off'
        onFinish={handleAddUser}
        onFinishFailed={() => console.log('failed')}
      >
        <Form.Item
          label='Name'
          name='name'
          rules={[
            { required: true, message: 'Please input your username!' },
            {
              pattern: /^[a-zA-Z\s]*$/,
              message: 'Please enter a valid name',
            },
          ]}
        >
          <Input placeholder='name' />
        </Form.Item>
        <Form.Item
          label='Email'
          name='email'
          rules={[
            {
              required: true,
              message: 'Please input your email!',
            },
            {
              pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: 'Please enter a valid email address',
            },
          ]}
        >
          <Input placeholder='email' />
        </Form.Item>

        <Form.Item
          label='Gender'
          name='gender'
          rules={[{ required: true, message: 'Please select a gender' }]}
        >
          <Radio.Group>
            <Radio value='male'>Male</Radio>
            <Radio value='female'>Female</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          label='Street'
          name={['address', 'street']}
          rules={[{ required: true, message: 'Please input your street!' }]}
        >
          <Input placeholder='street' />
        </Form.Item>
        <Form.Item
          label='City'
          name={['address', 'city']}
          rules={[{ required: true, message: 'Please input your city!' }]}
        >
          <Input placeholder='city' />
        </Form.Item>
        <Form.Item
          label='Phone'
          name='phone'
          rules={[
            {
              required: true,
              message: 'Please input your phone!',
            },

            {
              pattern: /^(\+)?([ 0-9]){10,14}$/,
              message: 'Please enter a valid phone number',
            },
          ]}
        >
          <Input placeholder='phone' />
        </Form.Item>

        <Form.Item
          style={{ display: 'flex', justifyContent: 'center' }}
          wrapperCol={{ span: 24 }}
          htmlFor='submit'
        >
          <Button type='primary' htmlType='submit'>
            Add user
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddUserModal;
