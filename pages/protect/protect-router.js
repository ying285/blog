import { useAuthSession } from "../../.next/lib/hooks/user";

const ProtectedPage = () => {
  const user = useAuthSession();

  if (!user) return null;
  return (
    <div>
      <span>You are authenticated as: {user}</span>
    </div>
  );
};

export default ProtectedPage;
