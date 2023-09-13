import { FC, useCallback } from "react";
import { Link } from "react-router-dom";
import { ViewIcon, DeleteIcon, SettingsIcon, NotAllowedIcon } from "@chakra-ui/icons";
import {
  Icon,
  Box,
  Button,
  TableContainer,
  Thead,
  useMultiStyleConfig,
  Tr,
  Th,
  Table,
  Tbody,
  Td,
  Image,
} from "@chakra-ui/react";
import { useGetUsers } from "../../store/hooks/use-get-users";
import { useUserChancages } from "../../store/hooks/use-user-chancages";

export const UsersList: FC = () => {
  const { deleteUser } = useUserChancages();
  const ICON_SIZE = 25;
  const style = useMultiStyleConfig("MovieItemMenu", {});
  const data = useGetUsers();

  const onDelete = useCallback(async (id: number) => {
    if (window.confirm("Are you sure you want to delete this news?")) {
      // newsId && onDelete(newsId);
      await deleteUser(id);
    }
  }, []);
  return (
    <Box maxWidth={"75%"} margin={"auto"}>
      <TableContainer>
        <Table variant="simple" colorScheme="cian">
          <Thead>
            <Tr>
              <Th></Th>
              <Th textAlign={"center"}>chatname</Th>
              <Th textAlign={"center"}>email</Th>
              <Th textAlign={"center"}>firstname</Th>
              <Th></Th>
              <Th></Th>
              <Th textAlign={"center"}>Edit</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data &&
              data.map((user, id) => {
                return (
                  <Tr key={id}>
                    <Td textAlign={"center"}>
                      <Image
                        textAlign={"center"}
                        style={{ width: 75, height: 75 }}
                        src={user.imagePath}
                        borderRadius={"full"}
                      ></Image>
                    </Td>
                    <Td textAlign={"center"}>{user.chatName}</Td>
                    <Td textAlign={"center"}>{user.id}</Td>
                    <Td textAlign={"center"}>{user.chatName}</Td>
                    <Td textAlign={"center"}>{user.email}</Td>
                    <Td textAlign={"center"}>{user.firstName}</Td>
                    <Td textAlign={"center"}>
                      {/* <Link to={`/users/${user.id}`}>
                        <Icon
                          onClick={() => {
                            console.log("hello");
                          }}
                          fontSize={ICON_SIZE}
                          style={{ margin: "0 20px" }}
                          _hover={{ cursor: "pointer" }}
                          as={ViewIcon}
                        ></Icon>
                      </Link> */}
                      
                      <Link to={`/users`}>
                        <Icon
                          onClick={() => {
                            //console.log("hello");
                          }}
                          fontSize={ICON_SIZE}
                          style={{ margin: "0 20px" }}
                          _hover={{ cursor: "pointer" }}
                          as={ViewIcon}
                        ></Icon>
                      </Link>
                      <Icon
                        onClick={() => {
                          user.id && onDelete(user.id);
                        }}
                        fontSize={ICON_SIZE}
                        style={{ margin: "0 20px" }}
                        _hover={{ cursor: "pointer" }}
                        as={NotAllowedIcon}
                      ></Icon>
                      <Icon
                        onClick={() => {}}
                        fontSize={ICON_SIZE}
                        style={{ margin: "0 20px" }}
                        _hover={{ cursor: "pointer" }}
                        as={SettingsIcon}
                      ></Icon>
                    </Td>
                  </Tr>
                );
              })}
          </Tbody>
        </Table>
      </TableContainer>
      <Button mt={"5"} size={"md"} as={Link} to="/">
        {" "}
        Főoldal
      </Button>
      <Button ms={"5"} mt={"5"} size={"md"} as={Link} to="/">
        {" "}
        Add User
      </Button>
     
    </Box>
  );
};
