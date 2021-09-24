import { AuthGuard } from '../AuthGuard';
import { Header } from './header';

export const Layout: React.FC<{}> = ({ children }) => {
  return (
    <AuthGuard>
      <Header />
      <div style={{ maxWidth: 1000, margin: 'auto', padding: 20 }}>
        {children}
      </div>
    </AuthGuard>
  );
};
