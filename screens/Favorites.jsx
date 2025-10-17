// screens/Favorites.jsx
import React, { useContext, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FavoritesContext } from "../FavoritesContext";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

export default function Favorites({ navigation }) {
  const { favorites, toggleFavorite } = useContext(FavoritesContext);
  const [viewMode, setViewMode] = useState("grid");

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <View style={styles.emptyIconContainer}>
        <MaterialCommunityIcons name="heart-broken" size={80} color="#475569" />
      </View>
      <Text style={styles.emptyTitle}>No Favorites Yet</Text>
      <Text style={styles.emptySubtitle}>
        Start adding movies to your favorites{"\n"}and they'll appear here
      </Text>
      <TouchableOpacity
        style={styles.browseButton}
        onPress={() => navigation.navigate("Home")}
      >
        <MaterialCommunityIcons name="movie-search" size={20} color="#FFFFFF" />
        <Text style={styles.browseButtonText}>Browse Movies</Text>
      </TouchableOpacity>
    </View>
  );

  const renderGridItem = ({ item }) => (
    <View style={styles.gridCard}>
      <TouchableOpacity activeOpacity={0.9}>
        <View style={styles.gridPosterContainer}>
          <Image
            source={{
              uri: item.poster_path
                ? `${IMAGE_BASE_URL}${item.poster_path}`
                : "https://via.placeholder.com/500x750?text=No+Image",
            }}
            style={styles.gridPoster}
            resizeMode="cover"
          />
          <View style={styles.gridGradient} />

          <TouchableOpacity
            style={styles.removeButton}
            onPress={() => toggleFavorite(item)}
          >
            <MaterialCommunityIcons name="heart" size={22} color="#FF6B9D" />
          </TouchableOpacity>

          <View style={styles.gridRatingBadge}>
            <MaterialCommunityIcons name="star" size={14} color="#FFD700" />
            <Text style={styles.gridRatingText}>
              {item.vote_average.toFixed(1)}
            </Text>
          </View>
        </View>

        <View style={styles.gridInfo}>
          <Text style={styles.gridTitle} numberOfLines={2}>
            {item.title}
          </Text>
          <View style={styles.gridMeta}>
            <MaterialCommunityIcons name="calendar" size={14} color="#A0AEC0" />
            <Text style={styles.gridYear}>
              {new Date(item.release_date).getFullYear()}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );

  const renderListItem = ({ item }) => (
    <TouchableOpacity style={styles.listCard} activeOpacity={0.9}>
      <Image
        source={{
          uri: item.poster_path
            ? `${IMAGE_BASE_URL}${item.poster_path}`
            : "https://via.placeholder.com/500x750?text=No+Image",
        }}
        style={styles.listPoster}
        resizeMode="cover"
      />

      <View style={styles.listInfo}>
        <View>
          <Text style={styles.listTitle} numberOfLines={2}>
            {item.title}
          </Text>
          <View style={styles.listMeta}>
            <View style={styles.listRating}>
              <MaterialCommunityIcons name="star" size={16} color="#FFD700" />
              <Text style={styles.listRatingText}>
                {item.vote_average.toFixed(1)}
              </Text>
            </View>
            <View style={styles.listYear}>
              <MaterialCommunityIcons
                name="calendar"
                size={16}
                color="#94A3B8"
              />
              <Text style={styles.listYearText}>
                {new Date(item.release_date).getFullYear()}
              </Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={styles.listRemoveButton}
          onPress={() => toggleFavorite(item)}
        >
          <MaterialCommunityIcons name="heart" size={24} color="#FF6B9D" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0F172A" />

      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.greeting}>Your Collection</Text>
            <Text style={styles.headerTitle}>
              {favorites.length} Favorite{favorites.length !== 1 ? "s" : ""}
            </Text>
          </View>

          <View style={styles.headerActions}>
            <TouchableOpacity
              style={[
                styles.viewModeButton,
                viewMode === "grid" && styles.viewModeButtonActive,
              ]}
              onPress={() => setViewMode("grid")}
            >
              <MaterialCommunityIcons
                name="view-grid"
                size={20}
                color={viewMode === "grid" ? "#3B82F6" : "#64748B"}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.viewModeButton,
                viewMode === "list" && styles.viewModeButtonActive,
              ]}
              onPress={() => setViewMode("list")}
            >
              <MaterialCommunityIcons
                name="view-list"
                size={20}
                color={viewMode === "list" ? "#3B82F6" : "#64748B"}
              />
            </TouchableOpacity>
          </View>
        </View>

        {favorites.length > 0 && (
          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <MaterialCommunityIcons name="movie" size={20} color="#3B82F6" />
              <Text style={styles.statNumber}>{favorites.length}</Text>
              <Text style={styles.statLabel}>Movies</Text>
            </View>

            <View style={styles.statCard}>
              <MaterialCommunityIcons name="star" size={20} color="#FFD700" />
              <Text style={styles.statNumber}>
                {favorites.length > 0
                  ? (
                      favorites.reduce((sum, m) => sum + m.vote_average, 0) /
                      favorites.length
                    ).toFixed(1)
                  : "0.0"}
              </Text>
              <Text style={styles.statLabel}>Avg Rating</Text>
            </View>

            <View style={styles.statCard}>
              <MaterialCommunityIcons name="clock" size={20} color="#FF6B9D" />
              <Text style={styles.statNumber}>{favorites.length * 120}</Text>
              <Text style={styles.statLabel}>Min</Text>
            </View>
          </View>
        )}
      </View>

      {favorites.length === 0 ? (
        renderEmptyState()
      ) : (
        <FlatList
          data={favorites}
          renderItem={viewMode === "grid" ? renderGridItem : renderListItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={viewMode === "grid" ? 2 : 1}
          key={viewMode}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F172A",
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
    backgroundColor: "#1E293B",
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  greeting: {
    fontSize: 14,
    color: "#94A3B8",
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#F1F5F9",
  },
  headerActions: {
    flexDirection: "row",
    gap: 8,
  },
  viewModeButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  viewModeButtonActive: {
    backgroundColor: "rgba(59, 130, 246, 0.15)",
    borderColor: "#3B82F6",
  },
  statsContainer: {
    flexDirection: "row",
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 16,
    padding: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  statNumber: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#F1F5F9",
    marginTop: 4,
  },
  statLabel: {
    fontSize: 12,
    color: "#94A3B8",
    marginTop: 2,
  },
  listContent: {
    padding: 16,
  },
  // Grid Mode Styles
  gridCard: {
    flex: 1,
    margin: 8,
    backgroundColor: "#1E293B",
    borderRadius: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 10,
  },
  gridPosterContainer: {
    position: "relative",
  },
  gridPoster: {
    width: "100%",
    height: 260,
    backgroundColor: "#334155",
  },
  gridGradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    backgroundColor: "rgba(15, 23, 42, 0.6)",
  },
  removeButton: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: "rgba(15, 23, 42, 0.8)",
    borderRadius: 20,
    padding: 8,
  },
  gridRatingBadge: {
    position: "absolute",
    top: 12,
    left: 12,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(15, 23, 42, 0.9)",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 4,
  },
  gridRatingText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#FFD700",
  },
  gridInfo: {
    padding: 14,
  },
  gridTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#F1F5F9",
    marginBottom: 8,
    lineHeight: 22,
  },
  gridMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  gridYear: {
    fontSize: 13,
    color: "#94A3B8",
    fontWeight: "500",
  },
  // List Mode Styles
  listCard: {
    flexDirection: "row",
    backgroundColor: "#1E293B",
    borderRadius: 16,
    marginBottom: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  listPoster: {
    width: 100,
    height: 140,
    backgroundColor: "#334155",
  },
  listInfo: {
    flex: 1,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  listTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#F1F5F9",
    marginBottom: 12,
  },
  listMeta: {
    flexDirection: "row",
    gap: 16,
  },
  listRating: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  listRatingText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFD700",
  },
  listYear: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  listYearText: {
    fontSize: 14,
    color: "#94A3B8",
  },
  listRemoveButton: {
    backgroundColor: "rgba(255, 107, 157, 0.15)",
    borderRadius: 12,
    padding: 10,
  },
  // Empty State Styles
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  emptyIconContainer: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: "rgba(71, 85, 105, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#F1F5F9",
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: "#94A3B8",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 32,
  },
  browseButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#3B82F6",
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 16,
    gap: 8,
    shadowColor: "#3B82F6",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  browseButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});
