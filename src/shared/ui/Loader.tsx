import { ActivityIndicator } from "react-native";

const Loader = ({ size }: { size: "large" | "small" }) => {
  return <ActivityIndicator size={size} />;
};

export default Loader;
