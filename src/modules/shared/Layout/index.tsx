import { Header } from './header';

export const Layout: React.FC<{}> = ({ children }) => {
  return (
    <div>
      <Header />
      <div style={{ maxWidth: 1000, margin: 'auto', padding: 20 }}>
        {children}
      </div>
    </div>
  );
};
