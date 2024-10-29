// screens/DiscoverScreen.js

import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Alert } from 'react-native';
import { useTheme, Text, TextInput, Button, Card } from 'react-native-paper';

export default function DiscoverScreen() {
  const { colors } = useTheme();

  const classesData = [
    { id: '1', name: 'CS 320' },
    { id: '2', name: 'CS 311' },
    { id: '3', name: 'CS 220' },
    { id: '4', name: 'CS 230' },
  ];

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredClasses, setFilteredClasses] = useState(classesData);

  // Handle search input changes
  const onChangeSearch = (query) => {
    setSearchQuery(query);
    if (query === '') {
      setFilteredClasses(classesData);
    } else {
      const filtered = classesData.filter((cls) =>
        cls.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredClasses(filtered);
    }
  };

  // Handle Join button press
  const handleJoin = (className) => {
    Alert.alert('Joined', `You have joined ${className}!`);
    // actual join functionality here
  };

  // Render each class card
  const renderClassItem = ({ item }) => (
    <Card style={[styles.card, { backgroundColor: colors.surface }]}>
      <Card.Title title={item.name} titleStyle={{ color: colors.text }} />
      <Card.Actions>
        <Button
          mode="contained"
          onPress={() => handleJoin(item.name)}
          style={{ backgroundColor: colors.primary }}
        >
          Join
        </Button>
      </Card.Actions>
    </Card>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <TextInput //Search bar
        placeholder="Search for classes..."
        value={searchQuery}
        onChangeText={onChangeSearch}
        mode="outlined"
        style={styles.searchBar}
        placeholderTextColor="gray"
        theme={{
          colors: {
            primary: colors.primary,
            background: colors.background,
            text: 'gray',
            placeholder: 'gray',
            surface: colors.surface,
          },
        }}
      />

      <FlatList
        data={filteredClasses}
        keyExtractor={(item) => item.id}
        renderItem={renderClassItem}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={{ color: colors.text, textAlign: 'center', marginTop: 20 }}>
            No classes found.
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  searchBar: {
    marginBottom: 16,
    borderColor: '#BB86FC',
  },
  list: {
    paddingBottom: 16,
  },
  card: {
    marginBottom: 12,
  },
});
