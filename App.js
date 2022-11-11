import React, { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, Button, Image } from 'react-native'
import * as ImagePicker from 'expo-image-picker'

export default function App() {
  const [selectedImage, setSelectedImage] = useState(null)

  const fetchImageFromUri = async (uri) => {
    const response = await fetch(uri)
    const blob = await response.data.blob()
    return blob
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    console.log(result.assets[0].uri)

    if (result.canceled) {
      return
    }
    // const fetch = await fetchImageFromUri()
    // const link = await photoLink(fetch)
    // console.log(link)
    setSelectedImage({ localUri: result.assets[0].uri })
  }
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Text>Загрузка файла:</Text>
      <Button title="Прикрепить файл" onPress={pickImage} />
      {selectedImage && (
        <Image
          source={{ uri: selectedImage.localUri }}
          style={styles.thumbnail}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  thumbnail: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
})
