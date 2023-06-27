export interface ISearchInput {
    value: string;
    searchCharacter: () => void
    setSearchValue: (val: string) => void
}