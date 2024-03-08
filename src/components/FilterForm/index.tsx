import { useState, useRef, useEffect, memo } from "react";
import "./style.scss";

const FilterForm = memo(
  ({ dispatch }: { dispatch: (filter?: Filter) => void }) => {
    const [filter, setFilter] = useState<Filter>({});
    const colorRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      dispatch(filter);
    }, [filter, dispatch]);

    const handlePrivacyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setFilter((prev) => ({
        ...prev,
        closed: e.target.value ? e.target.value === "closed" : undefined,
      }));
    };

    const handleColorChange = () => {
      if (colorRef.current!.dataset.error)
        colorRef.current!.dataset.error = "false";
      try {
        new RegExp(colorRef.current!.value);
        setFilter((prev) => ({
          ...prev,
          color: colorRef.current!.value || undefined,
        }));
      } catch (e) {
        colorRef.current!.dataset.error = "true";
      }
    };

    const handleFriendsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setFilter((prev) => ({
        ...prev,
        friends: e.target.value ? e.target.value === "with" : undefined,
      }));
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
          <label htmlFor="friends">Друзья в группе</label>
          <select
            id="friends"
            onChange={handleFriendsChange}
            className="filter__input"
          >
            <option value="">Не выбрано</option>
            <option value="with">Есть</option>
            <option value="without">Без друзей</option>
          </select>
        </div>
      </div>
    );
  }
);

export default FilterForm;
