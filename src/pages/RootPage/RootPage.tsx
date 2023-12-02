import './RootPage.scss'
import Logo from '../../components/Logo'
import CountButton from '../../components/CountButton'

export default function RootPage() {
  return (
    <>
      <Logo />
      <h1>Web Service for LEGO Lovers and Sellers.</h1>

      <CountButton />
      <p>Logo link returns to the RootPage</p>
    </>
  )
}
