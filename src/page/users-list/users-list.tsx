import { FC, useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ViewIcon,
  DeleteIcon,
  SettingsIcon,
  NotAllowedIcon,
} from "@chakra-ui/icons";
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
  useFocusEffect,
} from "@chakra-ui/react";

import {setEditUser} from '../../store/news/users-slice'
import { useGetUsers } from "../../store/hooks/use-get-users";
import { useUserChancages } from "../../store/hooks/use-user-chancages";
import MyNavbar from "../../componens/alap-comp/navbar/navbar";
import { useDispatch } from "react-redux";
import { User } from "../../models/user";

export const UsersList: FC = () => {
  const dispatch= useDispatch();
  const { deleteUser } = useUserChancages();
  const ICON_SIZE = 25;
  const style = useMultiStyleConfig("MovieItemMenu", {});
  const users = useGetUsers();
  const [data, setData]= useState<User[]>();
  
  const onDelete = useCallback(async (id: number) => {
    if (window.confirm("Are you sure you want to delete this news?")) {
      // newsId && onDelete(newsId);
      await deleteUser(id);
    }
  }, []);
  useEffect(()=>{users&&setData(users)},[users])
  return (
    <div>
      {" "}
      <MyNavbar />
      <Box maxWidth={"90%"} margin={"auto"}>
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


                        <Link to={`/user`}>
                          <Icon
                            onClick={() => {
                              dispatch(setEditUser(user))
                              console.log("hello");
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
    </div>
  );
};
