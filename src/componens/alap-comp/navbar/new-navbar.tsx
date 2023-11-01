"use client";
import { FC, useEffect } from "react";
import { UserMenu } from "./user_menu";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { showLogin } from "../../../store/news/login-slice";
import { useNewsTypes } from "../../../store/hooks/use-news-types";
import { setNewsTypeId } from "../../../store/news/news-slice";
import { useAuthUser, useSignOut, useAuthHeader } from "react-auth-kit";
import {
  Box,
  Flex,
  Text,
  FormControl,
  Input,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";
import { selectOnlineUser } from "../../../store/news/auth-user-slice";
import { showReg } from "../../../store/news/reg-slice";
import { setUser, outUser } from "../../../store/news/auth-user-slice";
import { FaNewspaper } from "react-icons/fa";
import { Type } from "../../../models/type";
import { useHeaderSearch } from "../use-header-search";
import { setNews } from "../../../store/news/editor-slice";
import { setEditUser } from "../../../store/news/users-slice";

interface MenuItem {
  label: string;
  children: NavMenuItem[];
  //  path?:string;
}
interface prop {
  arr: MenuItem[];
}

export const NewNavbar: FC = () => {
  const { isOpen, onToggle } = useDisclosure();
  const user = useSelector(selectOnlineUser);

  const auth = useAuthUser();
  const authUser = auth();
  const singOut = useSignOut();
  const { searchQuery, onChange, onSubmit } = useHeaderSearch();

  const dispach = useDispatch();
  const navigate = useNavigate();
  // scrollozás
  const { isLoading, error, types } = useNewsTypes();
  const type: MenuItem[] = [{ label: "TÉMÁK", children: [...types] }];
  const actions: MenuItem[] = [{ label: "MŰVELETEK", children: [...ACTIONS] }];
  return (
    <Box style={{ position: "sticky", top: "0", zIndex: "10" }} pb={5}>
      <Flex
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Flex
          alignItems={"center"}
          flex={{ base: 1 }}
          justify={{ base: "center", md: "start" }}
        >
          <Box
            display={"flex"}
            textAlign={useBreakpointValue({ base: "center", md: "left" })}
            fontFamily={"heading"}
            color={useColorModeValue("gray.800", "white")}
          >
            <Link onClick={() => dispach(setNewsTypeId(-1))} to={"/"}>
              <Flex
                display={"flex"}
                fontSize={"2xl"}
                padding={2}
                alignItems={"center"}
              >
                <Icon as={FaNewspaper} marginRight={3} />
                FAKE NEWS
              </Flex>
            </Link>
          </Box>

          <Flex display={{ base: "none", md: "flex" }} ml={10}>
            <DesktopNav arr={type} />
            {user?.laws?.find((law) => law.title === "ADMIN") ? (
              <DesktopNav arr={actions} />
            ) : (
              ""
            )}

            <form onSubmit={onSubmit}>
              <Box ml={3} mt={1} display="flex">
                <Input
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  size="sm"
                  aria-label="Search"
                  value={searchQuery}
                  onChange={onChange}
                />
                <Button
                  as="button"
                  type="submit"
                  variant="outline-success"
                  size="sm"
                >
                  Keresés
                </Button>
              </Box>
            </form>
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={"flex-end"}
          direction={"row"}
          spacing={6}
        >
          {user ? (
            <Box display={{ lg: "flex", md: "block" }}>
              <Text
                display={{ base: "none", md: "none", lg: "flex" }}
                ms={2}
                me={2}
                fontSize={"xl"}
                style={{ whiteSpace: "nowrap" }}
              >
                Üdvözllek, {user.chatName}
              </Text>

              <Box textAlign={"end"}>
                <UserMenu
                  showProfile={() => {
                    dispach(setEditUser(user))
                    navigate("/user");
                  }}
                  onExit={() => {
                    singOut();
                    dispach(outUser());
                  }}
                  userId={1}
                />
              </Box>
            </Box>
          ) : (
            <>
              <Button
                fontSize={"sm"}
                fontWeight={600}
                onClick={() => dispach(showLogin())}
              >
                Sign In
              </Button>
              <Button
                onClick={() => {
                  dispach(showReg());
                }}
                display={{ base: "none", md: "inline-flex" }}
                fontSize={"sm"}
                fontWeight={600}
              >
                Sign Up
              </Button>
            </>
          )}
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav arr={type} />
        <MobileNav arr={actions} />
        <form onSubmit={onSubmit}>
          <Box
            bg={useColorModeValue("white", "gray.800")}
            p={4}
            display={{ base: "flex", md: "none" }}
            mt={1}
          >
            <Input
              type="search"
              placeholder="Search"
              className="me-2"
              size="sm"
              aria-label="Search"
              value={searchQuery}
              onChange={onChange}
            />
            <Button
              as="button"
              type="submit"
              variant="outline-success"
              size="sm"
            >
              Keresés
            </Button>
          </Box>
        </form>
      </Collapse>
    </Box>
  );
};

const DesktopNav = ({ arr }: { arr: MenuItem[] }) => {
  const linkColor = useColorModeValue("gray.600", "gray.200");
  const linkHoverColor = useColorModeValue("gray.800", "white");
  const popoverContentBgColor = useColorModeValue("white", "gray.800");

  return (
    <Stack direction={"row"} spacing={4} alignItems={"center"}>
      {arr.map((type) => (
        <Box key={type.label}>
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger>
              <Box
                // as="a"
                p={2}
                fontSize={"lg"}
                fontWeight={500}
                color={linkColor}
                _hover={{
                  textDecoration: "none",
                  color: linkHoverColor,
                }}
              >
                <Text>{type.label}</Text>
              </Box>
            </PopoverTrigger>

            {type.children && (
              <PopoverContent
                border={0}
                boxShadow={"xl"}
                bg={popoverContentBgColor}
                p={4}
                rounded={"xl"}
                minW={"sm"}
              >
                <Stack>
                  {type.children.map((child) => (
                    <DesktopSubNav
                      key={child.title}
                      label={child.title}
                      id={child.id}
                      href={child.path}
                      subLabel=""
                    />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel, id }: NavItem) => {
  const dispach = useDispatch();
  const navigate = useNavigate();
  return (
    <Box
      as="a"
      // href={}
      role={"group"}
      display={"block"}
      p={2}
      rounded={"md"}
      _hover={{ bg: useColorModeValue("pink.50", "gray.900") }}
    >
      <Stack direction={"row"} align={"center"}>
        <Box>
          <Text
            transition={"all .6s ease"}
            _groupHover={{ color: "pink.400" }}
            fontWeight={500}
            onClick={() => {
              if (id >= 0) {
                dispach(setNewsTypeId(id));
              } else {
                dispach(setNews(null));
                navigate(`/${href}`);
              }
            }}
          >
            {label}
          </Text>
          <Text fontSize={"sm"}>{subLabel}</Text>
        </Box>
        <Flex
          transition={"all .3s ease"}
          transform={"translateX(-10px)"}
          opacity={0}
          _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
          justify={"flex-end"}
          align={"center"}
          flex={1}
        >
          {/* <Icon color={"pink.400"} w={5} h={5} as={ChevronRightIcon} /> */}
        </Flex>
      </Stack>
    </Box>
  );
};

const MobileNav = ({ arr }: prop) => {
  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      p={4}
      display={{ md: "none" }}
    >
      {arr.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children }: MenuItem) => {
  const { isOpen, onToggle } = useDisclosure();
  const dispach = useDispatch();
  const navigate = useNavigate();
  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Box
        py={2}
        as="a"
        // href="#"
        justifyContent="space-between"
        alignItems="center"
        _hover={{
          textDecoration: "none",
        }}
      >
        <Text
          fontWeight={600}
          color={useColorModeValue("gray.600", "gray.200")}
        >
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={"all .25s ease-in-out"}
            transform={isOpen ? "rotate(180deg)" : ""}
            w={6}
            h={6}
          />
        )}
      </Box>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.700")}
          align={"start"}
        >
          {children &&
            children.map((child) => (
              <Box
                as="a"
                key={child.title}
                py={2}
                onClick={() =>
                  child.id >= 0
                    ? dispach(setNewsTypeId(child.id))
                    : navigate(`/${child.path}`)
                }
              >
                {child.title}
              </Box>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

interface NavItem {
  id: number;
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
}

interface NavMenuItem extends Type {
  path?: string;
}

const ACTIONS: Array<NavMenuItem> = [
  {
    id: -1,
    title: "ÚJ CIKK HOZZÁADÁSA",
    path: "edit",
  },
  {
    id: -1,
    title: "FELLHASZNÁLÓK",
    path: "users",
  },
];

// const NAV_ITEMS: Array<NavItem> = [
//   {
//     label: "Kategóriák",
//     children: [],
//   },
//   {
//     label: "Find Work",
//     children: [
//       {
//         label: "Job Board",
//         subLabel: "Find your dream design job",
//         href: "#",
//       },
//       {
//         label: "Freelance Projects",
//         subLabel: "An exclusive list for contract work",
//         href: "#",
//       },
//     ],
//   },
//   {
//     label: "Learn Design",
//     href: "#",
//   },
//   {
//     label: "Hire Designers",
//     href: "#",
//   },
// ];
