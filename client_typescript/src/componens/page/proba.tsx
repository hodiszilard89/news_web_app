import { FC, useState } from "react";

import { useMultiStyleConfig, useSafeLayoutEffect } from "@chakra-ui/react";
import { GenreIcon } from "../alap-comp/genre-icon";
import { GenreSelector } from "../alap-comp/genre-selector";
import { Genre } from "../../models/genre";

export const Proba: FC = () => {
  const style = useMultiStyleConfig("GenreLabel");
  const [list, setList] = useState<Genre[] | undefined>();
  const genreList = Object.values(Genre);

  const onClick = (value: string) => {
    console.log("provider", value);
  };

  return (
    <>
      <br />
      {/* <GenreSelector /> */}
    </>
  );
};
