import { createTheme, ThemeProvider } from '@mui/material/styles';
import Image from "./Components/Image";
import CssBaseline from '@mui/material/CssBaseline';
import "./App.css"
import Layout from './Components/Layout';
import Footer from "./Components/Footer";


const App: React.FC = (): JSX.Element => {

  const theme = createTheme();


  return (


    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Layout>

        <Image />
        <Footer />
      </Layout>

    </ThemeProvider>
  )
}

export default App;