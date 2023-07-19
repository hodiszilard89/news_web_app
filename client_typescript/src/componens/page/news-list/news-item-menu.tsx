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
import React, { useCallback, VFC } from "react";
import { useDispatch } from "react-redux";
import { useNewsChancages } from "../../../store/hooks/use-news-chancages";
import { setNews, showEditor } from "../../../store/news/editor-slice";
import { serializeNews } from "../../../utils/news_factory";
import { News } from "../../../models";
import { useNavigate } from "react-router-dom";

export interface MovieItemMenuProps
  extends BoxProps,
    Pick<MenuProps, "placement" | "offset"> {
  news: News;
  //onDelete: () => void;
  newsId: number;
}

export const NewsItemMenu: FC<MovieItemMenuProps> = ({
  placement,
  offset = [0, -32],
  news: news,
  newsId: newsId,
  //onDelete: onDelete,
  ...props
}) => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const style = useMultiStyleConfig("MovieItemMenu", {});
  const { deleteNews } = useNewsChancages();

  // const onDeleteHandel = useCallback(() => {
  //   onDelete();
  // }, []);

  const dispatch = useDispatch();

  const onDelete = useCallback(async () => {
    if (window.confirm("Are you sure you want to delete this news?")) {
      // newsId && onDelete(newsId);
      await deleteNews(newsId!);
    }
  }, [deleteNews, newsId]);

  const onEdit = useCallback(() => {
    console.log("fut", newsId);
    dispatch(setNews(serializeNews(news)));
    dispatch(showEditor(newsId));
    navigate(`/edit/${newsId}`);
  }, [dispatch, newsId, news]);

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
          <MenuItem onClick={onClose} sx={style.closeIcon}>
            <CloseIcon fontSize="sm" />
          </MenuItem>
          <MenuItem sx={style.menuItem} onClick={onEdit}>
            Edit
          </MenuItem>
          <MenuItem sx={style.menuItem} onClick={onDelete}>
            Delete
          </MenuItem>
        </MenuList>
      </Box>
    </Menu>
  );
};
