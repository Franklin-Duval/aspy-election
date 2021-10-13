import { Button, Form, Input, notification } from 'antd';
import { useState } from 'react';
import { AspianEntity } from 'server/modules/aspians/entities/aspian.entity';
import { addAspian } from '../network/admin.network';

type LayoutType = Parameters<typeof Form>[0]['layout'];

export const AspianForm = ({
  closeModal,
  onAdd,
}: {
  closeModal: () => void;
  onAdd: (aspian: AspianEntity) => void;
}) => {
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState<LayoutType>('vertical');
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Form
      layout={formLayout}
      form={form}
      labelCol={{ span: 20 }}
      wrapperCol={{ span: 25 }}
      initialValues={{}}
      scrollToFirstError
      onFinish={async (data: AspianEntity) => {
        setIsLoading(true);
        const response = await addAspian(data);
        if (response._id) {
          notification.success({
            message: 'Success',
            description: 'You have added a new aspian',
            duration: 10,
          });
          closeModal();
          onAdd(response);
        } else {
          notification.error({
            message: 'Error',
            description: 'Sorry!!! An error has occured. Try again once more..',
            duration: 10,
          });
        }

        setIsLoading(false);
      }}
    >
      <Form.Item
        label="Aspian's matricule"
        name='matricule'
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Your matricule is necessary',
          },
        ]}
      >
        <Input placeholder='matricule' />
      </Form.Item>

      <Form.Item>
        <Button type='primary' htmlType='submit' loading={isLoading}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
