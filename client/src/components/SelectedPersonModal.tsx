import { Modal, Input, Radio, Button, Form, Typography } from 'antd';
import { Person } from '../PersonType';
import { updateUser } from '../api/fetchApi';
import userStore from '../store';
import { useEffect } from 'react';

interface Props {
  person: Person | undefined;
  visible: boolean;
  onClose: () => void;
}
const SelectedPersonModal: React.FC<Props> = ({ person, visible, onClose }) => {
  const { fetchUsers } = userStore(state => state);
  const [form] = Form.useForm();
  const handleSubmit = async () => {
    //get values from form
    const values = form.getFieldsValue();
    //update user
    await updateUser(person?.id as number, values);
    //fetch users
    fetchUsers();
    //close modal
    onClose();
  };

  useEffect(() => {
    // set form values

    if (person) {
      form.setFieldsValue({
        name: person?.name,
        email: person?.email,
        phone: person?.phone,
        address: {
          city: person?.address.city,
          street: person?.address.street,
        },
        gender: person?.gender,
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [person]);

  return (
    <Modal open={visible} onCancel={onClose} footer={null} title='Edit user'>
      {person && (
        <Typography.Title
          level={5}
          style={{ textAlign: 'center', marginBottom: '20px' }}
        >
          {person.name}
        </Typography.Title>
      )}

      <Form
        name='basic'
        form={form}
        layout='horizontal'
        autoComplete='off'
        onFinish={handleSubmit}
        onFinishFailed={() => console.log('failed')}
      >
        <Form.Item
          label='Name'
          name='name'
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input placeholder='name' />
        </Form.Item>
        <Form.Item
          label='Email'
          name='email'
          rules={[{ required: true, message: 'Please input your email!' }]}
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
            Save changes
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default SelectedPersonModal;
