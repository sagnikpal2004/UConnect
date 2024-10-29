import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {
  useTheme,
  Text,
  TextInput,
  Button,
  Card,
} from 'react-native-paper';
import { fetchClassCommunity } from '../services/courses.js';

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
      console.log("Fetched Classes Data:", data); // For debugging
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
    if (query.trim() === '') {
      setFilteredClasses(classesData);
    } else {
      const lowerCaseQuery = query.toLowerCase();
      const filtered = classesData.filter((cls) =>
        (cls.course_subject || '').toLowerCase().includes(lowerCaseQuery)
      );
      setFilteredClasses(filtered);
    }
  };

  const handleJoin = async (classId, className) => {
    Alert.alert('Success', `You have joined ${className}!`);
  };


  const renderClassItem = ({ item }) => (
    <Card style={[styles.card, { backgroundColor: colors.surface }]}>
      <Card.Title 
        title={`${item.course_subject} ${item.course_number}`} 
        titleStyle={{ color: colors.text }} 
      />
      {item.description ? (
        <Card.Content>
          <Text style={{ color: colors.text }}>{item.description}</Text>
        </Card.Content>
      ) : null}
      <Card.Actions>
        <Button
          mode="contained"
          onPress={() => handleJoin(item.id, `${item.course_subject} ${item.course_number}`)}
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
  <KeyboardAvoidingView
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    style={{ flex: 1 }}
  >
  <View style={[styles.container, { backgroundColor: colors.background }]}>
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
    {loading ? (
      <ActivityIndicator size="large" color={colors.primary} style={{ marginTop: 20 }} />
    ) : 
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
    }
  </View>
</KeyboardAvoidingView>

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
  input: {
    marginBottom: 12,
  },
});
