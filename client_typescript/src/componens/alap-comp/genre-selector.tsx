import { FC, useState, useCallback, useEffect } from "react";
import { TriangleDownIcon } from "@chakra-ui/icons";
import { Genre } from "../../models/genre";
import { GenreIcon } from "../alap-comp/genre-icon";
import {
  Box,
  Flex,
  BoxProps,
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

//const genreList = Object.values(Genre);

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

  const onChangeHandler = useCallback(
    (values: string[]) => {
      // console.log("values", values);
      // console.log("types", types);
      const result: Type[] = [];
      for (const type of types) {
        values.map((value) => {
          if (value === type.title) result.push(type);
        });
        //console.log(type);
      }
      console.log("result", result);
      onChange(result);
      setSelectedItems(result);
    },
    [onChange, types]
  );

  useEffect(() => {
    Array.isArray(value) && setSelectedItems(value);
  }, [value]);

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
          {/* value={selectedItems} onChange={onChangeHandler} */}
          <CheckboxGroup
            value={selectedItems.map((item) => item.title)}
            onChange={onChangeHandler}
          >
            <MenuList
              //rootProps={styles.checkboxRoot as BoxProps}
              sx={styles.checkboxList}
            >
              {types.map((type, id) => {
                //console.log(type)

                return (
                  <MenuItem
                    //bg="red"
                    as={Checkbox}
                    value={type.title}
                    // closeOnSelect={false}
                    key={type.title}
                    // colorScheme="red"
                  >
                    {type.title}
                  </MenuItem>
                );
              })}
            </MenuList>
          </CheckboxGroup>
        </Menu>
      </Box>
      <Box maxW="500px">
        {selectedItems?.map((li, id) => {
          return (
            <GenreIcon
              key={id}
              value={li.title}
              children
              onClick={(li) => {
                setSelectedItems(
                  selectedItems?.filter((genre) => li !== genre.title)
                );
              }}
            />
          );
        })}
      </Box>
    </Grid>
  );
};
