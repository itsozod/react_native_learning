import { UI } from "@shared/ui";
import { Text, View } from "@shared/ui/Themed";
import { Modal, StyleSheet } from "react-native";

const ResultModal = ({
  modalVisible,
  correctCount,
  questionDataLength,
  handleGoHome,
  handleCloseModal,
  restart,
}: {
  modalVisible: boolean;
  correctCount: number;
  questionDataLength: number | undefined;
  handleGoHome: () => void;
  handleCloseModal: () => void;
  restart: () => void;
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={handleCloseModal}
    >
      <View style={styles.modal_view}>
        <View style={styles.modal_container}>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            You solved {correctCount} out of {questionDataLength} questions
          </Text>
          <View style={{ flexDirection: "row", gap: 10 }}>
            <UI.Button
              onPress={handleGoHome}
              style={{ backgroundColor: "blue" }}
            >
              <Text style={{ color: "#fff", fontSize: 15 }}>Home</Text>
            </UI.Button>
            <UI.Button onPress={restart} style={{ backgroundColor: "green" }}>
              <Text style={{ color: "#fff", fontSize: 15 }}>Start again</Text>
            </UI.Button>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal_view: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modal_container: {
    width: "100%",
    maxWidth: 350,
    borderRadius: 12,
    gap: 15,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default ResultModal;
