import "../styles/globals.css";
import Layout from "../components/Layout/Layout";
import { AuthContextProvider } from "../components/store/auth-context";

function MyApp({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthContextProvider>
  );
}

export default MyApp;
