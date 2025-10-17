import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Home from "../screens/Home";
import Favorites from "../screens/Favorites";

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={styles.drawerContent}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.drawerHeader}>
        <View style={styles.logoContainer}>
          <View style={styles.logoBackground}>
            <MaterialCommunityIcons
              name="movie-open"
              size={40}
              color="#3B82F6"
            />
          </View>
        </View>
        <Text style={styles.appName}>MoviesApp</Text>
        <Text style={styles.appTagline}>Discover Your Next Favorite</Text>
      </View>

      <View style={styles.userSection}>
        <View style={styles.avatarContainer}>
          <Image
            source={{ uri: "https://i.pravatar.cc/150?img=12" }}
            style={styles.avatar}
          />
          <View style={styles.onlineIndicator} />
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.userName}>Movie Lover</Text>
          <Text style={styles.userEmail}>cinema@fan.com</Text>
        </View>
      </View>

      <View style={styles.menuSection}>
        <Text style={styles.sectionTitle}>MENU</Text>
        <DrawerItemList {...props} />
      </View>

      <View style={styles.statsSection}>
        <View style={styles.statCard}>
          <MaterialCommunityIcons name="movie" size={24} color="#3B82F6" />
          <Text style={styles.statNumber}>127</Text>
          <Text style={styles.statLabel}>Watched</Text>
        </View>
        <View style={styles.statCard}>
          <MaterialCommunityIcons name="heart" size={24} color="#FF6B9D" />
          <Text style={styles.statNumber}>42</Text>
          <Text style={styles.statLabel}>Favorites</Text>
        </View>
      </View>

      <View style={styles.bottomSection}>
        <TouchableOpacity style={styles.settingsButton}>
          <MaterialCommunityIcons name="cog" size={20} color="#94A3B8" />
          <Text style={styles.settingsText}>Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutButton}>
          <MaterialCommunityIcons name="logout" size={20} color="#EF4444" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.version}>v1.0.0</Text>
    </DrawerContentScrollView>
  );
}

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerStyle: {
          backgroundColor: "#1E293B",
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 1,
          borderBottomColor: "rgba(255, 255, 255, 0.1)",
        },
        headerTintColor: "#F1F5F9",
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 20,
        },
        drawerStyle: {
          backgroundColor: "#0F172A",
          width: 280,
        },
        drawerActiveTintColor: "#3B82F6",
        drawerInactiveTintColor: "#94A3B8",
        drawerActiveBackgroundColor: "rgba(59, 130, 246, 0.15)",
        drawerItemStyle: {
          borderRadius: 12,
          marginVertical: 4,
          paddingVertical: 4,
        },
        drawerLabelStyle: {
          fontSize: 16,
          fontWeight: "600",
          marginLeft: -16,
        },
      }}
    >
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{
          title: "Home",
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Favorites"
        component={Favorites}
        options={{
          title: "Favorites",
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="heart" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Trending"
        component={Home} // غيّرها للكومبوننت الصح لاحقاً
        options={{
          title: "Trending",
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="trending-up"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="WatchLater"
        component={Home} // غيّرها للكومبوننت الصح لاحقاً
        options={{
          title: "Watch Later",
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="clock" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  drawerHeader: {
    padding: 20,
    paddingTop: 40,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.1)",
    marginBottom: 20,
  },
  logoContainer: {
    marginBottom: 16,
  },
  logoBackground: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: "rgba(59, 130, 246, 0.15)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "rgba(59, 130, 246, 0.3)",
  },
  appName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#F1F5F9",
    marginBottom: 4,
  },
  appTagline: {
    fontSize: 12,
    color: "#64748B",
    letterSpacing: 0.5,
  },
  userSection: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    marginHorizontal: 12,
    marginBottom: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  avatarContainer: {
    position: "relative",
    marginRight: 12,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "#3B82F6",
  },
  onlineIndicator: {
    position: "absolute",
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#10B981",
    borderWidth: 2,
    borderColor: "#0F172A",
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#F1F5F9",
    marginBottom: 2,
  },
  userEmail: {
    fontSize: 13,
    color: "#94A3B8",
  },
  menuSection: {
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: "700",
    color: "#64748B",
    letterSpacing: 1,
    marginLeft: 16,
    marginBottom: 8,
    marginTop: 8,
  },
  statsSection: {
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 12,
    marginTop: 20,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  statNumber: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#F1F5F9",
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 11,
    color: "#94A3B8",
  },
  bottomSection: {
    paddingHorizontal: 12,
    paddingBottom: 20,
    gap: 8,
  },
  settingsButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    borderRadius: 12,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    gap: 12,
  },
  settingsText: {
    fontSize: 15,
    color: "#94A3B8",
    fontWeight: "500",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    borderRadius: 12,
    backgroundColor: "rgba(239, 68, 68, 0.1)",
    gap: 12,
  },
  logoutText: {
    fontSize: 15,
    color: "#EF4444",
    fontWeight: "500",
  },
  version: {
    textAlign: "center",
    fontSize: 11,
    color: "#475569",
    paddingBottom: 20,
  },
});
