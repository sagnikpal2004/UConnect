import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Alert, ActivityIndicator } from 'react-native';
import { useTheme, Text, TextInput, Button, Card } from 'react-native-paper';
import { fetchClassCommunity, createClassCommunity } from '../services/courses.js'; // Adjust the path as needed

export default function DiscoverScreen() {
  const { colors } = useTheme();

  const [classesData, setClassesData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredClasses, setFilteredClasses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [joiningClassId, setJoiningClassId] = useState(null);

  useEffect(() => {
    loadClasses();
  }, []);

  const loadClasses = async () => {
    setLoading(true);
    try {
      const data = await fetchClassCommunity();
      setClassesData(data);
      setFilteredClasses(data);
    } catch (error) {
      console.error("Error fetching classes:", error);
      Alert.alert('Error', `Failed to load classes. ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

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

  const handleJoin = async (classId, className) => {
    setJoiningClassId(classId);
    try {
      const response = await createClassCommunity({ classId, className });
      Alert.alert('Success', `You have joined ${className}!`);
      // Optionally, refresh the class list or update UI
    } catch (error) {
      Alert.alert('Error', 'Failed to join the class.');
    } finally {
      setJoiningClassId(null);
    }
  };

  const renderClassItem = ({ item }) => (
    <Card style={[styles.card, { backgroundColor: colors.surface }]}>
      <Card.Title title={item.name} titleStyle={{ color: colors.text }} />
      <Card.Actions>
        <Button
          mode="contained"
          onPress={() => handleJoin(item.id, item.name)}
          style={{ backgroundColor: colors.primary }}
          disabled={joiningClassId === item.id}
        >
          {joiningClassId === item.id ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            'Join'
          )}
        </Button>
      </Card.Actions>
    </Card>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Search Bar */}
      <TextInput
        placeholder="Search for classes..."
        value={searchQuery}
        onChangeText={onChangeSearch}
        mode="outlined"
        style={styles.searchBar}
        placeholderTextColor="#FFFFFF"
        theme={{
          colors: {
            primary: colors.primary,
            background: colors.background,
            text: '#FFFFFF',
            placeholder: '#FFFFFF',
            surface: colors.surface,
          },
        }}
      />

      {/* Loading Indicator */}
      {loading ? (
        <ActivityIndicator size="large" color={colors.primary} style={{ marginTop: 20 }} />
      ) : (
        /* Classes List */
        <FlatList
          data={filteredClasses}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderClassItem}
          contentContainerStyle={styles.list}
          ListEmptyComponent={
            <Text style={{ color: colors.text, textAlign: 'center', marginTop: 20 }}>
              No classes found.
            </Text>
          }
        />
      )}
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

