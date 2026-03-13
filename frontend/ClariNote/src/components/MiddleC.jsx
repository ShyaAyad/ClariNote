import Typography from '@mui/material/Typography'
import { useUserStore } from '../store/User.store'
import Lectures from './Lectures'
import SearchInput from './SearchInput'

const MiddleC = () => {

  const user = useUserStore((state) => state.user)

  return (
    <div>
        <SearchInput />
        <Typography variant="h5" sx={{ marginTop: "20px" }}>My Lectures</Typography>
        <Typography variant="h6" sx={{ marginBottom: "20px", fontWeight: "300", fontFamily: "" }}>Welcome back, {user.name}!</Typography>
        <Lectures />
    </div>
  )
}

export default MiddleC