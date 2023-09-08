import { Spinner } from "@chakra-ui/spinner";

export default function Loading() {
  return (
    <div
      style={{
        backgroundColor: "#f1f1f1",
        display: "flex",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Spinner color="var(--chakra-colors-brand-500)" />
    </div>
  );
}
