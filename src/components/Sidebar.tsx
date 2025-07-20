import { currentUser } from '@clerk/nextjs/server'
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { Button } from "./ui/button";
async function Sidebar() {
  const authUser = await currentUser();
  if (!authUser) return <UnAuthenticatedSidebar />;  //로그인하지 않으면 UnAuthenticatedSidebar 표시
  return (
    <div>
      
    </div>
  )
}

export default Sidebar


const UnAuthenticatedSidebar = () => (
    <div className="sticky top-20">
      <Card>
        <CardHeader>
          <CardTitle className="text-center text-xl font-semibold">Welcome Back!</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground mb-4">
            로그인하세요
          </p>
          <SignInButton mode="modal">
            <Button className="w-full" variant="outline">
              로그인
            </Button>
          </SignInButton>
          <SignUpButton mode="modal">
            <Button className="w-full mt-2" variant="default">
              회원가입
            </Button>
          </SignUpButton>
        </CardContent>
      </Card>
    </div>
  );