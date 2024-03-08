export type Filter = Partial<{
  closed: boolean;
  color: string;
  friends: boolean;
}>;

export type State = {
  groups: Group[];
  filteredGroups: Group[];
}

export enum ActionType {
  loadGroups = 'loadGroups',
  filterGroups = 'filterGroups',
}

type LoadGroupsAction = {
  type: ActionType.loadGroups;
  payload: Group[];
}

type FilterGroupsAction = {
  type: ActionType.filterGroups;
  payload: Filter;
}

export type Action = LoadGroupsAction | FilterGroupsAction;

const getFilteredGroups = (groups: Group[], filter: Filter): Group[] => {
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

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionType.loadGroups:
      return { groups: action.payload, filteredGroups: action.payload };
    case ActionType.filterGroups: {
      return {
        groups: state.groups,
        filteredGroups: getFilteredGroups(state.groups, action.payload)
      };
    }
    default:
      return state;
  }
}

export default reducer;