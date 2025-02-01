import { StyleSheet, View } from "react-native";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import { PexelsWallpapers } from "./pexelsWallpapers";


const queryClient = new QueryClient();

 export default function Select() {
    return <QueryClientProvider client = {queryClient}>
        <PexelsWallpapers/>
     </QueryClientProvider>;
}

const styles = StyleSheet.create ({
    container: { 
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "center",
    }
});