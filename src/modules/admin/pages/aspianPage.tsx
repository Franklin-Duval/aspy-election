import { Button, Space } from 'antd';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { AspianEntity } from 'server/modules/aspians/entities/aspian.entity';
import { ButtonWithModal } from 'src/modules/shared/ButtonWithModal/ButtonWithModal';
import { Layout } from 'src/modules/shared/Layout';
import { ROUTES } from 'src/routes';
import { AspianForm } from '../components/aspianForm';
import { MatriculeContainer } from '../components/matriculeContainer';
import { fetchAspians } from '../network/admin.network';

export const AspianPage = () => {
  const router = useRouter();
  const [aspians, setAspians] = useState<AspianEntity[]>([]);
  useEffect(() => {
    fetchAspians().then((aspians) => setAspians(aspians));
  }, []);

  return (
    <Layout>
      <Space style={{ flexWrap: 'wrap' }}>
        <Button onClick={() => router.push(ROUTES.ADMIN.USER_PAGE)}>
          View Users
        </Button>
        <Button onClick={() => router.push(ROUTES.ADMIN.RESULT_PAGE)}>
          View Results
        </Button>
        <Button onClick={() => router.push(ROUTES.ADMIN.ASPIANS)}>
          View Aspians
        </Button>
        <Button onClick={() => router.push(ROUTES.ADMIN.POST)}>
          View Posts
        </Button>
      </Space>
      <div style={{ margin: 10 }}></div>
      <Space>
        <h2 style={{ margin: 0 }}>List of matricules of all Aspians</h2>
        <ButtonWithModal
          buttonText='Add a new Aspian'
          modalProps={{ title: 'Add a new Aspian' }}
        >
          {(closeModal) => (
            <AspianForm
              closeModal={closeModal}
              onAdd={(aspian: AspianEntity) => {
                setAspians([...aspians, aspian]);
              }}
            />
          )}
        </ButtonWithModal>
      </Space>

      <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: 30 }}>
        {aspians.map((aspian) => (
          <MatriculeContainer key={aspian._id} matricule={aspian.matricule} />
        ))}
      </div>
    </Layout>
  );
};
