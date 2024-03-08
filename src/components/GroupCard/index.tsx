import { useState } from "react";
import "./styles.scss";

const GroupCard = ({ group }: { group: Group }) => {
  const [showFriends, setShowFriends] = useState(false);

  return (
    <div className="group">
      {group.avatar_color && (
        <div
          className="group__avatar"
          style={{ backgroundColor: group.avatar_color }}
        ></div>
      )}
      <h2 className="group__name">{group.name}</h2>
      <p className="group__privacy">{group.closed ? "Закрытая" : "Открытая"}</p>
      <p className="group__member-count">
        Количество подписчиков: {group.members_count}
      </p>
      {group.friends?.length && (
        <>
          <p
            className="group__friends-count"
            onClick={() => setShowFriends(!showFriends)}
          >
            Количество друзей: {group.friends?.length || 0}
          </p>
          {showFriends && (
            <ol>
              {group.friends?.map((friend) => (
                <li key={friend.first_name + friend.last_name}>
                  {friend.first_name} {friend.last_name}
                </li>
              ))}
            </ol>
          )}
        </>
      )}
    </div>
  );
};

export default GroupCard;
