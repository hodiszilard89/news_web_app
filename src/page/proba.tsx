import { FC, useState } from "react";

import { useMultiStyleConfig, useSafeLayoutEffect } from "@chakra-ui/react";

import { Genre } from "../models/genre";

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
