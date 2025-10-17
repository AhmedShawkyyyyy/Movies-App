import React, { useState, useEffect, useContext } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
  TextInput,
  RefreshControl,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import axios from "axios";
import { FavoritesContext } from "../FavoritesContext";

const API_KEY = "9813ce01a72ca1bd2ae25f091898b1c7";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

export default function Home({ navigation }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("popular");

  const { favorites, toggleFavorite } = useContext(FavoritesContext);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async (filterType = "popular") => {
    try {
      setLoading(true);
      let url = "";
      switch (filterType) {
        case "popular":
          url = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}`;
          break;
        case "top_rated":
          url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`;
          break;
        case "upcoming":
          url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}`;
          break;
        case "now_playing":
          url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}`;
          break;
        default:
          url = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}`;
      }
      const response = await axios.get(url);
      setMovies(response.data.results);
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchMovies(selectedFilter);
  };

  const handleFilter = (filterType) => {
    setSelectedFilter(filterType);
    setShowFilterMenu(false);
    setSearchQuery("");
    fetchMovies(filterType);
  };

  const handleSearch = async (query) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      fetchMovies(selectedFilter);
      return;
    }
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`
      );
      setMovies(response.data.results);
    } catch (error) {
      console.error("Error searching movies:", error);
    }
  };

  const getFilterLabel = (filter = selectedFilter) => {
    switch (filter) {
      case "popular":
        return "Popular";
      case "top_rated":
        return "Top Rated";
      case "upcoming":
        return "Upcoming";
      case "now_playing":
        return "Now Playing";
      default:
        return "Popular";
    }
  };

  const getFilterIcon = (filter) => {
    switch (filter) {
      case "popular":
        return "fire";
      case "top_rated":
        return "star";
      case "upcoming":
        return "calendar-clock";
      case "now_playing":
        return "movie-open";
      default:
        return "movie";
    }
  };

  const renderMovieCard = ({ item }) => {
    const isFavorite = favorites.some((fav) => fav.id === item.id);

    return (
      <TouchableOpacity style={styles.movieCard} activeOpacity={0.9}>
        <View style={styles.posterContainer}>
          <Image
            source={{
              uri: item.poster_path
                ? `${IMAGE_BASE_URL}${item.poster_path}`
                : "https://via.placeholder.com/500x750?text=No+Image",
            }}
            style={styles.moviePoster}
            resizeMode="cover"
          />
          <View style={styles.gradientOverlay} />

          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={() => toggleFavorite(item)}
          >
            <MaterialCommunityIcons
              name={isFavorite ? "heart" : "heart-outline"}
              size={22}
              color={isFavorite ? "#FF6B9D" : "#FFF"}
            />
          </TouchableOpacity>

          <View style={styles.ratingBadge}>
            <MaterialCommunityIcons name="star" size={14} color="#FFD700" />
            <Text style={styles.ratingText}>
              {item.vote_average.toFixed(1)}
            </Text>
          </View>
        </View>

        <View style={styles.movieInfo}>
          <Text style={styles.movieTitle} numberOfLines={2}>
            {item.title}
          </Text>
          <View style={styles.movieMeta}>
            <MaterialCommunityIcons name="calendar" size={14} color="#A0AEC0" />
            <Text style={styles.releaseDate}>
              {item.release_date
                ? new Date(item.release_date).getFullYear()
                : "-"}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <StatusBar barStyle="light-content" backgroundColor="#0F172A" />
        <View style={styles.loadingContent}>
          <View style={styles.loaderWrapper}>
            <ActivityIndicator size="large" color="#3B82F6" />
          </View>
          <Text style={styles.loadingText}>Loading Movies...</Text>
          <Text style={styles.loadingSubtext}>Getting the best for you</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0F172A" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.greeting}>Discover</Text>
            <Text style={styles.headerTitle}>{getFilterLabel()} Movies</Text>
          </View>
          <View style={styles.headerIcons}>
            <TouchableOpacity style={styles.iconButton}>
              <MaterialCommunityIcons name="bell" size={24} color="#CBD5E0" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.searchRow}>
          <View style={styles.searchContainer}>
            <MaterialCommunityIcons name="magnify" size={22} color="#64748B" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search movies..."
              placeholderTextColor="#64748B"
              value={searchQuery}
              onChangeText={handleSearch}
            />
            {searchQuery !== "" && (
              <TouchableOpacity onPress={() => handleSearch("")}>
                <MaterialCommunityIcons
                  name="close-circle"
                  size={20}
                  color="#64748B"
                />
              </TouchableOpacity>
            )}
          </View>

          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => setShowFilterMenu(!showFilterMenu)}
          >
            <MaterialCommunityIcons
              name="tune-variant"
              size={24}
              color="#FFFFFF"
            />
          </TouchableOpacity>
        </View>

        {showFilterMenu && (
          <View style={styles.filterMenu}>
            {["popular", "top_rated", "upcoming", "now_playing"].map((f) => (
              <TouchableOpacity
                key={f}
                style={[
                  styles.filterItem,
                  selectedFilter === f && styles.filterItemActive,
                ]}
                onPress={() => handleFilter(f)}
              >
                <View style={styles.filterItemContent}>
                  <MaterialCommunityIcons
                    name={getFilterIcon(f)}
                    size={20}
                    color={selectedFilter === f ? "#3B82F6" : "#94A3B8"}
                  />
                  <Text
                    style={[
                      styles.filterText,
                      selectedFilter === f && styles.filterTextActive,
                    ]}
                  >
                    {getFilterLabel(f)}
                  </Text>
                </View>
                {selectedFilter === f && (
                  <View style={styles.checkCircle}>
                    <MaterialCommunityIcons
                      name="check"
                      size={16}
                      color="#FFFFFF"
                    />
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      <FlatList
        data={movies}
        renderItem={renderMovieCard}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.moviesGrid}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#3B82F6"]}
            tintColor="#3B82F6"
          />
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0F172A" },
  loadingContainer: { flex: 1, backgroundColor: "#0F172A" },
  loadingContent: { flex: 1, justifyContent: "center", alignItems: "center" },
  loaderWrapper: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(59, 130, 246, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: "600",
    color: "#F1F5F9",
  },
  loadingSubtext: { marginTop: 5, fontSize: 14, color: "#64748B" },
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
  headerTitle: { fontSize: 32, fontWeight: "bold", color: "#F1F5F9" },
  headerIcons: { flexDirection: "row", gap: 12 },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    justifyContent: "center",
    alignItems: "center",
  },
  searchRow: { flexDirection: "row", alignItems: "center", gap: 12 },
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 56,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  searchInput: { flex: 1, marginLeft: 12, fontSize: 16, color: "#F1F5F9" },
  filterButton: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: "#3B82F6",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#3B82F6",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  filterMenu: {
    marginTop: 16,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  filterItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.05)",
  },
  filterItemActive: { backgroundColor: "rgba(59, 130, 246, 0.1)" },
  filterItemContent: { flexDirection: "row", alignItems: "center", gap: 12 },
  filterText: { fontSize: 16, color: "#94A3B8", fontWeight: "500" },
  filterTextActive: { color: "#3B82F6", fontWeight: "600" },
  checkCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#3B82F6",
    justifyContent: "center",
    alignItems: "center",
  },
  moviesGrid: { padding: 16 },
  movieCard: {
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
  posterContainer: { position: "relative" },
  moviePoster: { width: "100%", height: 260, backgroundColor: "#334155" },
  gradientOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    backgroundColor: "rgba(15, 23, 42, 0.6)",
  },
  favoriteButton: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: "rgba(15, 23, 42, 0.8)",
    borderRadius: 20,
    padding: 8,
  },
  ratingBadge: {
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
  ratingText: { fontSize: 13, fontWeight: "700", color: "#FFD700" },
  movieInfo: { padding: 14 },
  movieTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#F1F5F9",
    marginBottom: 8,
    lineHeight: 22,
  },
  movieMeta: { flexDirection: "row", alignItems: "center", gap: 6 },
  releaseDate: { fontSize: 13, color: "#94A3B8", fontWeight: "500" },
});
