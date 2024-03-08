import { useEffect, useState, useMemo } from "react";
import GroupCard from "./components/GroupCard";
import FilterForm from "./components/FilterForm";
import fetchGroups from "./api";

const debounce = (fn: (filter?: Filter) => void, ms: number) => {
  let timeout: number;
  return function (filter?: Filter) {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(filter), ms);
  };
};

function App() {
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [groups, setGroups] = useState<Group[]>([]);

  const getGroups = useMemo(
    () =>
      debounce((filter?: Filter) => {
        setError("");
        setIsLoading(true);
        fetchGroups(filter).then((res) => {
          if (res.result === 1 && res.data) setGroups(res.data);
          else setError("Ошибка загрузки групп");
          setIsLoading(false);
        });
      }, 500),
    []
  );

  useEffect(() => {
    getGroups();
  }, []);

  if (error) return <p className="error">{error}</p>;
  return (
    <>
      <FilterForm dispatch={getGroups} />
      <div className="groups-container">
        {isLoading ? (
          <p className="loading">Загрузка...</p>
        ) : (
          groups.map((group) => <GroupCard key={group.id} group={group} />)
        )}
      </div>
    </>
  );
}

export default App;
