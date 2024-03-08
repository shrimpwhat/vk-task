import groups from "../groups";

const getFilteredGroups = (filter: Filter): Group[] => {
  return groups.filter((group) => {
    if (filter.closed !== undefined && group.closed !== filter.closed) {
      return false;
    }
    if (filter.color) {
      const pattern = new RegExp(filter.color, `i`)
      if (!(group.avatar_color ?? "").match(pattern))
        return false;
    }
    if (filter.friends !== undefined)
      if (filter.friends && !group.friends?.length) {
        return false;
      } else if (!filter.friends && group.friends?.length) {
        return false;
      }
    return true;
  });
}

const fetchGroups = async (filter?: Filter): Promise<GetGroupsResponse> => {
  const sleep = new Promise((resolve) => setTimeout(resolve, 1000));
  const filteredGroups = filter ? getFilteredGroups(filter) : groups;
  await sleep;

  return {
    result: 1,
    data: filteredGroups,
  };
};

export default fetchGroups;