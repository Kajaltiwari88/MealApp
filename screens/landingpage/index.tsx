import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import { useThemeContext } from "@/context/ThemeContext";
import ThemeToggle from "@/components/ThemeToggle";


export default function LandingScreen() {
  const router = useRouter();
  const { theme, mode } = useThemeContext();

  return (
    <View style={[styles.container, { backgroundColor: theme.bg }]}>
      
      <ImageBackground
        source={{
          uri: "https://images.unsplash.com/photo-1498837167922-ddd27525d352",
        }}
        style={styles.image}
        resizeMode="cover"
      >
        {/* Overlay */}
        <View
          style={[
            styles.overlay,
            {
              backgroundColor:
                mode === "dark"
                  ? "rgba(0,0,0,0.6)"
                  : "rgba(0,0,0,0.3)",
            },
          ]}
        >
          
          {/* Top */}
          <View style={styles.top}>
            <ThemeToggle />
          </View>

          {/* Bottom Content */}
          <View style={styles.bottom}>
            <Text style={styles.title}>Eat Smart 🍽️</Text>

            <Text style={styles.subtitle}>
              Generate meals, track calories, and stay healthy —
              all in one app.
            </Text>

            <TouchableOpacity
              style={[styles.button, { backgroundColor: theme.primary }]}
              onPress={() => router.push("/(auth)/login")}
            >
              <Text style={styles.buttonText}>Get Started</Text>
            </TouchableOpacity>
          </View>

        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 24,
  },
  top: {
    marginTop: 60,
    alignItems: "flex-end",
  },
  bottom: {
    marginBottom: 60,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#fff",
  },
  subtitle: {
    fontSize: 16,
    color: "#ddd",
    marginTop: 12,
    lineHeight: 22,
  },
  button: {
    marginTop: 24,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});