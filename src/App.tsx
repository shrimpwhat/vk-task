import { useEffect, useReducer, useState } from "react";
import MockGroups from "./groups";
import reducer, { State, ActionType } from "./reducer";
import GroupCard from "./components/GroupCard";
import FilterForm from "./components/FilterForm";

const initailState: State = {
  groups: [],
  filteredGroups: [],
};

function App() {
  const [error, setError] = useState<string>("");
  const [state, dispatch] = useReducer(reducer, initailState);

  const fetchGroups = async (): Promise<GetGroupsResponse> => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return {
      result: 1,
      data: MockGroups,
    };
  };

  const getGroups = async () => {
    const response = await fetchGroups();
    if (response.result === 1 && response.data) {
      dispatch({ type: ActionType.loadGroups, payload: response.data });
    } else setError("Ошибка загрузки групп");
  };

  useEffect(() => {
    getGroups();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error) return <p className="error">{error}</p>;
  return (
    <>
      <FilterForm dispatch={dispatch} />
      <div className="groups-container">
        {!state.groups.length ? (
          <p className="loading">Загрузка...</p>
        ) : (
          state.filteredGroups.map((group) => (
            <GroupCard key={group.id} group={group} />
          ))
        )}
      </div>
    </>
  );
}

export default App;
