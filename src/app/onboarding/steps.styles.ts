import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
        alignItems: "flex-start",
        justifyContent: "center",
        paddingHorizontal: 20,
    },
    text: {
        fontSize: 16,
        color: "#000000",
        textAlign: "center",
        marginBottom: 4,
        fontWeight: "bold",
    },
    description: {
        fontSize: 16,
        color: "#222823B3",
        textAlign: "center",
        marginBottom: 4,
    },
    stepIndicator: {
        flexDirection: "row",
        marginBottom: 30,
    },
    circle: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: "#2962FF",
        opacity: 0.4,
        marginHorizontal: 6,
        marginTop: 24,
    },
    activeCircle: {
        opacity: 1,
        width: 28
    },
    buttonContainer: {
        flexDirection: "column",
        width: "100%",
        justifyContent: "space-between",
        marginTop: 20,
        gap: 16,
    },
    image: {
        width: 480,
        height: 480,


    },
    containerButton: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "flex-end",
    },
    skipButton: {
        paddingBottom: 20,

    },

    skipText: {
        color: "#222823",
        fontWeight: "medium",
        fontSize: 16,
    },
});

export default styles;
