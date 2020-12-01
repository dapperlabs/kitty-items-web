import {useCurrentUser} from "../hooks/use-current-user.hook"
import {Button, Bar, Label} from "../display/bar.comp"

export function AuthCluster() {
  const [user, loggedIn, {signUp, logIn, logOut}] = useCurrentUser()

  return loggedIn ? (
    <Bar>
      <Button onClick={logOut}>Log Out</Button>
      <Label>{user.addr}</Label>
    </Bar>
  ) : (
    <Bar>
      <Button onClick={logIn}>Log In</Button>
      <Button onClick={signUp}>Sign Up</Button>
    </Bar>
  )
}
