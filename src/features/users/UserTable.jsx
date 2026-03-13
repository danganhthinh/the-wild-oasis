import styled from "styled-components";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Spinner from "../../ui/Spinner";
import { useUsers } from "../authentication/useUsers";
import UserRow from "./UserRow";
import Empty from "../../ui/Empty";

function UserTable() {
  const { isLoading, users } = useUsers();

  if (isLoading) return <Spinner />;
  if (!users?.length) return <Empty resourceName="users" />;

  return (
    <Menus>
      <Table columns="1fr 2fr 2fr 1.2fr">
        <Table.Header>
          <div>Avatar</div>
          <div>User</div>
          <div>Email</div>
          <div>Role</div>
        </Table.Header>

        <Table.Body
          data={users}
          render={(user) => <UserRow user={user} key={user._id || user.id} />}
        />
      </Table>
    </Menus>
  );
}

export default UserTable;
