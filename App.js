import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, Image, FlatList, StyleSheet, ImageBackground, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const images = {
  salad: require('./assets/food/salad.jpeg'),
  soup: require('./assets/food/soup.jpeg'),
  bruschetta: require('./assets/food/bruschetta.jpeg'),
  steak: require('./assets/food/steak.jpeg'),
  pasta: require('./assets/food/pasta.jpeg'),
  stirfry: require('./assets/food/stirfry.jpeg'),
  iceCream: require('./assets/food/iceCream.jpeg'),
  cake: require('./assets/food/cake.jpeg'),
  fruitSalad: require('./assets/food/fruitSalad.jpeg'),
  background: require('./assets/food/background.jpeg'),
  userProfile: require('./assets/user-profile.jpg'), // Profile image
};

const MenuScreen = ({ navigation }) => (
  <ImageBackground source={images.background} style={styles.background}>
    <View style={styles.container}>
      <Text style={styles.title}>Select a Course:</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Starters')}>
        <Image source={images.salad} style={styles.courseImage} />
        <Text style={styles.courseText}>Starters</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('MainCourse')}>
        <Image source={images.steak} style={styles.courseImage} />
        <Text style={styles.courseText}>Main Course</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Desserts')}>
        <Image source={images.iceCream} style={styles.courseImage} />
        <Text style={styles.courseText}>Desserts</Text>
      </TouchableOpacity>
      <Button title="View Cart" onPress={() => navigation.navigate('Cart')} />
      <Button title="User Profile" onPress={() => navigation.navigate('UserProfile')} />
      <Button title="User Settings" onPress={() => navigation.navigate('UserSettings')} />
    </View>
  </ImageBackground>
);

const UserProfileScreen = ({ navigation }) => {
  const [username, setUsername] = useState('Asataluli');
  const [email, setEmail] = useState('madimaastaluli606@gmail.com');

  return (
    <ImageBackground source={images.background} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>User Profile</Text>
        <Image source={images.userProfile} style={styles.profileImage} />
        <Text style={styles.description}>Username: {username}</Text>
        <Text style={styles.description}>Email: {email}</Text>
        <Button title="Edit Profile" onPress={() => navigation.navigate('EditProfile', { username, email, setUsername, setEmail })} />
        <Button title="Back" onPress={() => navigation.goBack()} />
      </View>
    </ImageBackground>
  );
};

const EditProfileScreen = ({ route, navigation }) => {
  const { username, email, setUsername, setEmail } = route.params;

  return (
    <ImageBackground source={images.background} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Edit Profile</Text>
        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          style={styles.input}
        />
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
        />
        <Button title="Save Changes" onPress={() => navigation.navigate('UserProfile')} />
        <Button title="Back" onPress={() => navigation.goBack()} />
      </View>
    </ImageBackground>
  );
};

const UserSettingsScreen = ({ navigation }) => {
  return (
    <ImageBackground source={images.background} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>User Settings</Text>
        <Text style={styles.description}>Change your settings here.</Text>
        <Button title="Back" onPress={() => navigation.goBack()} />
      </View>
    </ImageBackground>
  );
};

const CourseScreen = ({ navigation, courseItems, addToCart }) => (
  <ImageBackground source={images.background} style={styles.background}>
    <View style={styles.container}>
      <FlatList
        data={courseItems}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('MealDetails', { item, addToCart })}>
            <View style={styles.itemContainer}>
              <Image source={item.image} style={styles.image} />
              <Text style={styles.itemText}>{item.name}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.name}
      />
      <Button title="Back" onPress={() => navigation.goBack()} />
    </View>
  </ImageBackground>
);

const MealDetailsScreen = ({ route, navigation }) => {
  const { item, addToCart } = route.params;

  return (
    <ImageBackground source={images.background} style={styles.background}>
      <View style={styles.container}>
        <Image source={item.image} style={styles.dishImage} />
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.price}>Price: R{item.price}</Text>
        <Button title="Add to Cart" onPress={() => {
          addToCart(item);
          navigation.navigate('Cart');
        }} />
        <Button title="Back" onPress={() => navigation.goBack()} />
        <Button title="Logout" onPress={() => navigation.replace('Login')} />
      </View>
    </ImageBackground>
  );
};

const CartScreen = ({ cartItems, navigation, setCartItems }) => {
  const removeFromCart = (itemToRemove) => {
    setCartItems((prevItems) => prevItems.filter(item => item.name !== itemToRemove.name));
    alert(`${itemToRemove.name} removed from cart!`);
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    const total = cartItems.reduce((acc, item) => acc + item.price, 0);
    Alert.alert("Checkout", `Your total is R${total}. Thank you for your order!`, [
      { text: "OK", onPress: () => setCartItems([]) }, // Clear cart on confirmation
    ]);
  };

  return (
    <ImageBackground source={images.background} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Cart Items</Text>
        {cartItems.length > 0 ? (
          <FlatList
            data={cartItems}
            renderItem={({ item }) => (
              <View style={styles.itemContainer}>
                <Image source={item.image} style={styles.image} />
                <Text style={styles.itemText}>{item.name} - R{item.price}</Text>
                <Button title="Remove" onPress={() => removeFromCart(item)} />
              </View>
            )}
            keyExtractor={(item) => item.name}
          />
        ) : (
          <Text style={styles.description}>Your cart is empty.</Text>
        )}
        <Button title="Checkout" onPress={handleCheckout} />
        <Button title="Back" onPress={() => navigation.goBack()} />
        <Button title="Logout" onPress={() => navigation.replace('Login')} />
      </View>
    </ImageBackground>
  );
};

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username && password) {
      navigation.replace('Menu');
    }
  };

  return (
    <ImageBackground source={images.background} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />
        <Button title="Login" onPress={handleLogin} />
      </View>
    </ImageBackground>
  );
};

export default function App() {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    setCartItems((prevItems) => [...prevItems, item]);
    alert(`${item.name} added to cart!`);
  };

  const starters = [
    { name: 'Salad', image: images.salad, description: 'Fresh mixed salad with a variety of vegetables.', price: 25 },
    { name: 'Soup', image: images.soup, description: 'Warm and hearty vegetable soup.', price: 40 },
    { name: 'Bruschetta', image: images.bruschetta, description: 'Grilled bread topped with diced tomatoes and basil.', price: 36 },
  ];

  const mainCourses = [
    { name: 'Steak', image: images.steak, description: 'Juicy grilled steak served with sides.', price: 160 },
    { name: 'Pasta', image: images.pasta, description: 'Pasta served with a rich tomato sauce.', price: 110 },
    { name: 'Vegetable Stir Fry', image: images.stirfry, description: 'Mixed vegetables stir-fried with soy sauce.', price: 10 },
  ];

  const desserts = [
    { name: 'Ice Cream', image: images.iceCream, description: 'Creamy vanilla ice cream.', price: 15 },
    { name: 'Cake', image: images.cake, description: 'Rich chocolate cake with frosting.', price: 55 },
    { name: 'Fruit Salad', image: images.fruitSalad, description: 'Fresh seasonal fruit salad.', price: 64 },
  ];

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Menu" component={MenuScreen} />
        <Stack.Screen name="Starters">
          {(props) => <CourseScreen {...props} courseItems={starters} addToCart={addToCart} />}
        </Stack.Screen>
        <Stack.Screen name="MainCourse">
          {(props) => <CourseScreen {...props} courseItems={mainCourses} addToCart={addToCart} />}
        </Stack.Screen>
        <Stack.Screen name="Desserts">
          {(props) => <CourseScreen {...props} courseItems={desserts} addToCart={addToCart} />}
        </Stack.Screen>
        <Stack.Screen name="MealDetails">
          {(props) => <MealDetailsScreen {...props} addToCart={addToCart} />}
        </Stack.Screen>
        <Stack.Screen name="Cart">
          {(props) => <CartScreen {...props} cartItems={cartItems} setCartItems={setCartItems} />}
        </Stack.Screen>
        <Stack.Screen name="UserProfile" component={UserProfileScreen} />
        <Stack.Screen name="EditProfile" component={EditProfileScreen} />
        <Stack.Screen name="UserSettings" component={UserSettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    width: '100%',
    paddingHorizontal: 10,
  },
  courseImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
    borderRadius: 10,
  },
  courseText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  dishImage: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#fff',
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
    color: '#fff',
    textAlign: 'center',
  },
  price: {
    fontSize: 18,
    marginBottom: 20,
    color: '#fff',
  },
  itemText: {
    fontSize: 18,
    color: '#fff',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
});
 