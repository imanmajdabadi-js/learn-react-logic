import { createRoot } from 'react-dom/client';
import './index.css';
import Users from './user-management/components/Users';
import ConfirmDialogProvider from './user-management/confirm-dialog-provider';

createRoot(document.getElementById('root')!).render(
  <ConfirmDialogProvider>
    <Users />
  </ConfirmDialogProvider>
);
