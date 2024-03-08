import { useState, useMemo, useRef, Dispatch, useEffect, memo } from "react";
import { Filter, ActionType, Action } from "../../reducer";
import "./style.scss";

const debounce = (fn: () => void, ms: number) => {
  let timeout: number;
  return function () {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(), ms);
  };
};

const FilterForm = memo(({ dispatch }: { dispatch: Dispatch<Action> }) => {
  const [filter, setFilter] = useState<Filter>({});
  const colorRef = useRef<HTMLInputElement>(null);

  useEffect(
    () => dispatch({ type: ActionType.filterGroups, payload: filter }),
    [filter, dispatch]
  );

  const handlePrivacyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter((prev) => ({
      ...prev,
      closed: e.target.value ? e.target.value === "closed" : undefined,
    }));
  };

  const updateColorFilter = useMemo(
    () =>
      debounce(() => {
        try {
          new RegExp(colorRef.current!.value);
          setFilter((prev) => ({
            ...prev,
            color: colorRef.current!.value || undefined,
          }));
        } catch (e) {
          colorRef.current!.dataset.error = "true";
        }
      }, 500),
    []
  );

  const handleColorChange = () => {
    if (colorRef.current!.dataset.error)
      colorRef.current!.dataset.error = "false";
    updateColorFilter();
  };

  return (
    <div className="filter">
      <div className="filter__field">
        <label htmlFor="privacy">Приватность</label>
        <select
          id="privacy"
          onChange={handlePrivacyChange}
          className="filter__input"
        >
          <option value="">Не выбрано</option>
          <option value="closed">Закрытая</option>
          <option value="open">Открытая</option>
        </select>
      </div>

      <div className="filter__field">
        <label htmlFor="color">Цвет</label>
        <input
          id="color"
          ref={colorRef}
          onChange={handleColorChange}
          className="filter__input"
        />
      </div>

      <div className="filter__field">
        <label htmlFor="friends">Друзья</label>
        <input
          type="checkbox"
          id="friends"
          onChange={(e) => setFilter({ ...filter, friends: e.target.checked })}
          className="filter__checkbox"
        />
      </div>
    </div>
  );
});

export default FilterForm;
