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
import React, { useCallback, VFC } from "react";
import { useDispatch } from "react-redux";
import { useNewsChancages } from "../../store/hooks/use-news-chancages";
import { setNews, showEditor, setId } from "../../store/news/editor-slice";
import { serializNews } from "../../utils/news_factory";
import { News } from "../../models";
import { useNavigate } from "react-router-dom";
import { selectNews } from "../../store/news/news-slice";

export interface MovieItemMenuProps
  extends BoxProps,
    Pick<MenuProps, "placement" | "offset"> {
 // news: News;
  //newsId:number
  //onDelete: () => void;
  stateId:number;
}

export const NewsItemMenu: FC<MovieItemMenuProps> = ({
  placement,
  offset = [0, -32],
  // news: news,
  // newsId,
  stateId,
  //onDelete: onDelete,
  ...props
}) => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const style = useMultiStyleConfig("MovieItemMenu", {});
  const { deleteNews } = useNewsChancages();

  const news = useSelector(selectNews)[stateId]

  // const onDeleteHandel = useCallback(() => {
  //   onDelete();
  // }, []);

  const dispatch = useDispatch();

  const onDelete = useCallback(async () => {
    if (window.confirm("Are you sure you want to delete this news?")) {
      // newsId && onDelete(newsId);
      await deleteNews(news.id!);
    }
  }, [deleteNews]);

  

  const onEdit = useCallback(() => {
    //console.log("fut alakítani kíván news news formában", news);
    dispatch(setNews(news));
    //3 helyről is kapja a state ID-t
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
            Edit
          </MenuItem>
          <MenuItem  key={Math.random()}  sx={style.menuItem} onClick={onDelete}>
            Delete
          </MenuItem>
        </MenuList>
      </Box>
    </Menu>
  );
};
