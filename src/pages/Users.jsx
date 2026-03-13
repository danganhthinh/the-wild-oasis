import SignupForm from "../features/authentication/SignupForm";
import UserTable from "../features/users/UserTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function NewUsers() {
  return (
    <>
      <Row>
        <Heading as="h1">All users</Heading>
        <UserTable />
      </Row>

      <Row>
        <Heading as="h1">Create a new user</Heading>
        <SignupForm />
      </Row>
    </>
  );
}

export default NewUsers;
