import { Children, FC } from "react";
import { Text, TagLabel, useMultiStyleConfig } from "@chakra-ui/react";
import { Icon } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { Genre } from "../../models/genre";

interface GenreIconParmas {
  value?: string;
  children: any;
  onClick: (value: string) => void;
}

export const GenreIcon: FC<GenreIconParmas> = ({
  value,
  children,
  onClick,
}) => {
  const genreList = Object.values(Genre);

  const style = useMultiStyleConfig("GenresLable", {});
  return (
    <Text sx={style.tag}>
      {value}
      <a>
        <Icon
          as={CloseIcon}
          color="black"
          sx={style.tagRemowe}
          onClick={() => value && onClick(value)}
        />
      </a>{" "}
    </Text>
  );
};
