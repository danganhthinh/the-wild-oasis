import styled from "styled-components";
import Table from "../../ui/Table";

const User = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Img = styled.img`
  display: block;
  width: 4rem;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  outline: 2px solid var(--color-grey-100);
`;

const Role = styled.div`
  text-transform: uppercase;
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--color-grey-500);
`;

function UserRow({ user }) {
  const { fullName, email, role, avatar } = user;

  return (
    <Table.Row>
      <Img src={avatar || "default-user.jpg"} />
      <User>{fullName}</User>
      <div>{email}</div>
      <Role>{role}</Role>
    </Table.Row>
  );
}

export default UserRow;
