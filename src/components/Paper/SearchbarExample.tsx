import * as React from 'react';
import { Searchbar } from 'react-native-paper';

const SearchbarExample = () => {
  const [searchQuery, setSearchQuery] = React.useState('');

  return (
    <Searchbar
      placeholder="Search"
      onChangeText={setSearchQuery}
      value={searchQuery}
      icon={'account-search'}
      clearIcon={'close-circle-outline'}
      // loading
      iconColor="green"
      onIconPress={() => null}
    />
  );
};

export default SearchbarExample;
