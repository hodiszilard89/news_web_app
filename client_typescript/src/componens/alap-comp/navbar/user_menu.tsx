import { FC } from "react";
import {
  Box,
  BoxProps,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  MenuProps,
  useDisclosure,
  useMultiStyleConfig,
} from "@chakra-ui/react";
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import { FaSignInAlt } from "react-icons/fa";

export interface UserMenuProps
  extends BoxProps,
    Pick<MenuProps, "placement" | "offset"> {
  userId: number;
  onExit: () => void;
}

export const UserMenu: FC<UserMenuProps> = ({
  placement,
  offset = [0, -32],
  userId,
  onExit,
  ...props
}) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const style = useMultiStyleConfig("MovueItemMenu", {});

  return (
    <Menu
      placement={placement}
      offset={offset}
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      autoSelect={false}
    >
      <Box>
        <MenuButton
          as={IconButton}
          icon={isOpen ? <CloseIcon /> : <FaSignInAlt />}
          isRound={true}
          size="sm"
          sx={style.menuButton}
        />

        <MenuList onMouseLeave={onClose} sx={style.menuList}>
          <MenuItem onClick={onClose} sx={style.closeIcon}>
            <CloseIcon fontSize="sm" />
          </MenuItem>
          <MenuItem sx={style.menuItem} onClick={onExit}>
            Kilépés
          </MenuItem>
        </MenuList>
      </Box>
    </Menu>
  );
};
