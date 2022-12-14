import logoImg from "../../assets/logo-nlw-esports.png";
import React, { useEffect, useState } from "react";
import { FlatList, Image } from "react-native";
import { styles } from "./styles";
import { Header } from "../../components/Header";
import { GameCard, GameCardProps } from "../../components/GameCard";
import { SafeAreaView } from "react-native-safe-area-context";
import { Background } from "../../components/Background";
import { useNavigation } from "@react-navigation/native";
import { api } from "../../lib/axios";

export function Home() {
  const [games, setGames] = useState<GameCardProps[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    api.get("/games").then((r) => setGames(r.data));
  }, []);

  function handleOpenGamePage({ id, title, bannerUrl }: GameCardProps) {
    navigation.navigate("game", {
      id,
      title,
      bannerUrl,
    });
  }

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <Image source={logoImg} style={styles.logo} />

        <Header
          title="Encontre seu duo"
          subtitle="Selecione o game que deseja jogar..."
        />

        <FlatList
          data={games}
          contentContainerStyle={styles.contentList}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <GameCard data={item} onPress={() => handleOpenGamePage(item)} />
          )}
          showsHorizontalScrollIndicator={false}
          horizontal
        />
      </SafeAreaView>
    </Background>
  );
}
