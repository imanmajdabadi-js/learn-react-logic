import Users from './user-management/components/Users';
import ConfirmDialogProvider from './user-management/confirm-dialog-provider';

function App() {
  return (
    <div className="mt-4 mx-4 flex flex-col justify-center items-center gap-4">
      <ConfirmDialogProvider>
        <Users />
      </ConfirmDialogProvider>
    </div>
  );
}

export default App;
