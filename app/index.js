import { useState } from "react";
import {
  View,
  Text,
  Button,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

export default function App() {
  const [images, setImages] = useState([]);

  // 選圖片
  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      alert("需要相簿權限！");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      const newImage = {
        id: Date.now().toString(),
        uri: result.assets[0].uri,
        date: new Date().toLocaleDateString(),
      };

      setImages([newImage, ...images]);
    }
  };

  // 🗑️ 刪除圖片
  const deleteImage = (id) => {
    const filtered = images.filter((item) => item.id !== id);
    setImages(filtered);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📷今日照片</Text>

      <Button title="新增照片" onPress={pickImage} />

      <FlatList
        data={images}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.date}>{item.date}</Text>

            <Image source={{ uri: item.uri }} style={styles.image} />

            {/* 刪除按鈕 */}
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => deleteImage(item.id)}
            >
              <Text style={styles.deleteText}>刪除</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  card: {
    marginTop: 15,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#f5f5f5",
    padding: 10,
  },
  date: {
    marginBottom: 5,
    fontSize: 14,
    color: "#555",
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
  deleteButton: {
    marginTop: 10,
    backgroundColor: "#ff4d4d",
    padding: 8,
    borderRadius: 8,
    alignItems: "center",
  },
  deleteText: {
    color: "#fff",
    fontWeight: "bold",
  },
});