import { FC, useState, useCallback, useEffect } from "react";
import { TriangleDownIcon } from "@chakra-ui/icons";
import { GenreIcon } from "./genre-icon";
import {
  Box,
  Grid,
  Button,
  Checkbox,
  CheckboxGroup,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useMultiStyleConfig,
} from "@chakra-ui/react";
import { Type } from "../../models/type";


export interface GenreSelectorProps {
  types: Type[];
  value?: Type[];
  onChange: (genres: Type[] | undefined) => void;
}

export const GenreSelector: FC<GenreSelectorProps> = ({
  types,
  value,
  onChange,
}) => {
  const [selectedItems, setSelectedItems] = useState<Type[]>([]);

  const styles = useMultiStyleConfig("GenreSelector", {});

  useEffect(() => {
    onChange(selectedItems);
  }, [selectedItems]);

  const onChangeHandler = useCallback(
    (values: string[]) => {
      const result: Type[] = [];
      for (const type of types) {
        for(const value of values){
          if (value === type.title) result.push(type);
        }
      }
      setSelectedItems(result);
    },
    []
  );

  useEffect(() => {
    Array.isArray(value) && setSelectedItems(value);
  }, []);

  return (
    <Grid templateColumns="repeat(2, 1fr)" gap={4}>
      <Box>
        <Menu
          placement="bottom-start"
          autoSelect={false}
          isLazy={true}
          lazyBehavior="unmount"
          offset={[4, 3]}
        >
          <MenuButton
            as={Button}
            rightIcon={<TriangleDownIcon color="text.highlighted" />}
            sx={styles.button}
          >
            {selectedItems.length > 0 ? (
              <Box sx={styles.itemsList}>
                {selectedItems.map((item) => item.title + ", ")}
              </Box>
            ) : (
              <Text sx={styles.placeholder}>Select Genre</Text>
            )}
          </MenuButton>

          <CheckboxGroup
            value={selectedItems.map((item) => item.title)}
            onChange={onChangeHandler}
          >
            <MenuList maxW={200} sx={styles.checkboxList}>
              {types.map((type, id) => {
                return (
                  <MenuItem as={Checkbox} value={type.title} key={type.title}>
                    {type.title}
                  </MenuItem>
                );
              })}
            </MenuList>
          </CheckboxGroup>
        </Menu>
      </Box>
      <Box maxW="500px">
        {selectedItems.map((li, id) => {
          return (
            <GenreIcon
              key={id}
              value={li.title}
              children
              onClick={() =>
                setSelectedItems(
                  selectedItems.filter((genre) => {
                    return li.title !== genre.title;
                  })
                )
              }
            />
          );
        })}
      </Box>
    </Grid>
  );
};
