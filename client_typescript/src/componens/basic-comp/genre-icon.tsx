import { FC } from "react";
import { useMultiStyleConfig } from "@chakra-ui/react";
import { Icon, Button } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";

interface GenreIconParmas {
  value?: string;
  children: any;
  onClick: (value: string) => void;
}

export const GenreIcon: FC<GenreIconParmas> = ({ value, onClick }) => {
  const style = useMultiStyleConfig("GenresLable", {});
  return (
    <Button sx={style.tag} as={"div"} width={"auto"} border={"solid"}>
      {value}

      <Icon
        as={CloseIcon}
        sx={style.tagRemowe}
        onClick={() => value && onClick(value)}
      />
    </Button>
  );
};
