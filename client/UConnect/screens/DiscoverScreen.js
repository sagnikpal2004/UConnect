// screens/DiscoverScreen.js

import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Keyboard, // Import Keyboard
} from 'react-native';
import {
  useTheme,
  Text,
  TextInput,
  Button,
  Card,
  Modal,
  Portal,
} from 'react-native-paper';
import { fetchClassCommunity, createClassCommunity } from '../services/courses.js';
import { joinClassCommunity } from '../services/user2.js';

export default function DiscoverScreen() {
  const { colors } = useTheme();

  const [classesData, setClassesData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredClasses, setFilteredClasses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [joiningClassId, setJoiningClassId] = useState(null);

  // State for Create Class Modal
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newClassName, setNewClassName] = useState('');
  const [NewClassSubject, setNewClassSubject] = useState('');
  const [creatingClass, setCreatingClass] = useState(false);

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
    setJoiningClassId(classId);
    try {
      await joinClassCommunity(classId);
      Alert.alert('Success', `You have joined ${className}!`);
      // Refresh the class list or update UI as needed
      loadClasses();
    } catch (error) {
      console.error("Error joining class:", error);
      Alert.alert('Error', `Failed to join the class. ${error.message}`);
    } finally {
      setJoiningClassId(null);
    }
  };

  const handleCreateClass = async () => {
    if (!newClassName) {
      Alert.alert('Validation Error', 'Class name is required.');
      return;
    }

    setCreatingClass(true);
    try {
      const newClass = {
        course_name: newClassName,
        course_subject: NewClassSubject,
      };
      const createdClass = await createClassCommunity(newClass);
      Alert.alert('Success', `Class "${newClassName}" created successfully!`);
      // Refresh the class list to include the new class
      loadClasses();
      // Reset form fields
      setNewClassName('');
      setNewClassSubject('');
      setIsModalVisible(false);
      Keyboard.dismiss(); // Dismiss the keyboard after creation
    } catch (error) {
      console.error("Error creating class:", error);
      Alert.alert('Error', `Failed to create class community. ${error.message}`);
    } finally {
      setCreatingClass(false);
    }
  };

  const renderClassItem = ({ item }) => (
    <Card style={[styles.card, { backgroundColor: colors.surface }]}>
      <Card.Title 
        title={`${item.course_subject} ${item.course_name}`} 
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
          onPress={() => handleJoin(item.id, `${item.course_subject} ${item.course_name}`)}
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
        {/* Create Class Button */}
        <Button
          mode="contained"
          onPress={() => setIsModalVisible(true)}
          style={{ marginBottom: 16, backgroundColor: colors.accent }}
        >
          Create Class Community
        </Button>

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

        {/* Create Class Modal */}
        <Portal>
          <Modal
            visible={isModalVisible}
            onDismiss={() => setIsModalVisible(false)}
            contentContainerStyle={[styles.modalContainer, { backgroundColor: colors.surface, borderWidth: 3, borderColor: "gray"}]}
          >
            <Text style={[styles.modalTitle, { color:"white" }]}>Create New Class</Text>
            <TextInput
              value={newClassName}
              onChangeText={setNewClassName}
              mode="outlined"
              outlineColor='gray'
              style={styles.input}
              placeholder='Course Number...'
              placeholderTextColor="gray"
              returnKeyType="next"
              textColor='white'
              theme={{
                colors: {
                  primary: colors.primary,
                  background: colors.surface,
                  text: '#FFFFFF',
                  placeholder: '#FFFFFF',
                  surface: colors.surface,
                },
              }}
            />
            <TextInput
              value={NewClassSubject}
              onChangeText={setNewClassSubject}
              mode="outlined"
              outlineColor='gray'
              style={styles.input}
              placeholder='Course Subject...'
              placeholderTextColor="gray"
              returnKeyType="done"
              onSubmitEditing={Keyboard.dismiss}
              textColor='white'
              theme={{
                colors: {
                  primary: colors.primary,
                  background: colors.surface,
                  text: '#FFFFFF',
                  placeholder: '#FFFFFF',
                  surface: colors.surface,
                },
              }}
            />
            <Button
              mode="contained"
              onPress={handleCreateClass}
              style={{ backgroundColor: colors.primary, marginTop: 16 }}
              loading={creatingClass}
              disabled={creatingClass}
            >
              Create
            </Button>
            </Modal>
          </Portal>
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
  modalContainer: {
    margin: 20,
    padding: 20,
    borderRadius: 8,
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    marginBottom: 12,
  },
});
