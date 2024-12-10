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
  CardContent,
  IconButton,
  FavoriteIcon,
  Typography,
  Modal,
  Portal,
} from 'react-native-paper';
import { fetchPosts } from '../services/posts.js';

export default function HomeScreen({ course }) {
  const { colors } = useTheme();

  const [postsData, setPostsData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    setLoading(true);
    try {
      const data = await fetchPosts();
      console.log("Fetched Posts Data:", data); // For debugging
      setPostsData(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
      Alert.alert('Error', `Failed to load posts. ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const renderPostItem = ({ item }) => (
    <Card style={[styles.card, { backgroundColor: colors.surface }]}>
      <Card.Title 
        title={`${item.updated_at.split("T")[0]}`} 
        titleStyle={{ color: colors.text }} 
      />
      {item.content ? (
        <Card.Content>
          <Text style={{ color: colors.text }}>{item.content}</Text>
        </Card.Content>
      ) : null}
    </Card>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <View style={[styles.container, { backgroundColor: colors.background }]}>

        {/* Loading Indicator */}
        {loading ? (
          <ActivityIndicator size="large" color={colors.primary} style={{ marginTop: 20 }} />
        ) : (
          /* Posts */
          <FlatList
            data={postsData}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderPostItem}
            contentContainerStyle={styles.list}
            ListEmptyComponent={
              <Text style={{ color: colors.text, textAlign: 'center', marginTop: 20 }}>
                No posts found.
              </Text>
            }
          />
        )}
        </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
});