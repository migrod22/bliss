import '../styles/globals.css'
import store from '../components/store'
import { Provider } from 'react-redux'
import Navbar from '../components/Navbar';
import { Toaster } from 'react-hot-toast';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Toaster />
      <Navbar />
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp;
