import { FC } from "react";
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
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
import { useSelector } from "react-redux";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useNewsChancages } from "../../store/hooks/use-news-chancages";
import { setNews, showEditor, setId } from "../../store/news/editor-slice";
import { useNavigate } from "react-router-dom";
import { selectNews } from "../../store/news/news-slice";

export interface NewsItemMenuProps
  extends BoxProps,
    Pick<MenuProps, "placement" | "offset"> {

  stateId:number;
}

export const NewsItemMenu: FC<NewsItemMenuProps> = ({
  placement,
  offset = [0, -32],
  stateId,
  ...props
}) => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const style = useMultiStyleConfig("NewsItemMenu", {});
  const { deleteNews } = useNewsChancages();

  const news = useSelector(selectNews)[stateId]


  const dispatch = useDispatch();

  const onDelete = useCallback(async () => {
    if (window.confirm("Are you sure you want to delete this news?")) {

      await deleteNews(news.id!);
    }
  }, [deleteNews, news]);

  

  const onEdit = useCallback(() => {
    dispatch(setNews(news));
    dispatch(setId(stateId))
    dispatch(showEditor(stateId));
    navigate(`/edit/${stateId}`);
  }, [dispatch, news]);

  return (
    <Menu
      placement={placement}
      offset={offset}
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      autoSelect={false}
    >
      <Box {...props}>
        <MenuButton
          as={IconButton}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          isRound={true}
          size="sm"
          sx={style.menuButton}
        />
        <MenuList onMouseLeave={onClose} sx={style.menuList}>
          <MenuItem key={Math.random()} onClick={onClose} sx={style.closeIcon}>
            <CloseIcon fontSize="sm" />
          </MenuItem>
          <MenuItem key={Math.random()} sx={style.menuItem} onClick={onEdit}>
            Szerkesztés
          </MenuItem>
          <MenuItem  key={Math.random()}  sx={style.menuItem} onClick={onDelete}>
            Törlés
          </MenuItem>
        </MenuList>
      </Box>
    </Menu>
  );
};
