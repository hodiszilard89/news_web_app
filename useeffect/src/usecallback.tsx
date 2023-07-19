import { useCallback, useState } from "react";
//import { shuffle } from "@/utils";
import Search from "./search";

interface UseCallbackDemoProps {}

function shuffle<T>(array: T[]): T[] {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

const allUsers = ["john", "alex", "george", "simon", "james"];

export const UseCallbackDemo = ({}: UseCallbackDemoProps) => {
  const [users, setUsers] = useState(allUsers);

  //   const handleSearch = (text: string) => {
  //     const filteredUsers = allUsers.filter((user) => {
  //       user.includes(text);
  //     });
  //     setUsers(filteredUsers);
  //   };

  const handleSearch = useCallback(
    (text: string) => {
      console.log(users[0]);
      const filteredUsers = allUsers.filter((user) => user.includes(text));

      setUsers(filteredUsers);
    },
    [users]
  );

  return (
    <div>
      <div className="align-center mb-2 flex">
        <button onClick={() => setUsers(shuffle(allUsers))}>Shuffel</button>

        <Search onChange={handleSearch} />
      </div>
      <ul>
        {users.map((user) => (
          <li key={user}>{user}</li>
        ))}
      </ul>
    </div>
  );
};
