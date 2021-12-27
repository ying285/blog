async function getAuthSession(context) {
  return context.req.session.get("user");
}

const ProtectedSSRoute = ({ authenticated, user }) => {
  if (!authenticated) {
    return (
      <div>
        <span>You are not authenticated :(</span>
      </div>
    );
  }
  return (
    <div>
      <span>You are authenticated as: {user} :)</span>
    </div>
  );
};

export function getServerSideProps(context) {
  const authSession = getAuthSession(context);
  if (!authSession) {
    return {
      props: {
        authenticated: false,
      },
    };
  }

  return {
    props: {
      authenticated: true,
      user: authSession.user,
    },
  };
}

export default ProtectedSSRoute;
