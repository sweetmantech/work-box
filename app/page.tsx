import { ConnectButton } from "./components/ConnectButton";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-8">
      <main className="flex flex-col items-center gap-8">
        <h1 className="text-4xl font-bold">Welcome to Team in a Box</h1>
        <ConnectButton />
      </main>
    </div>
  );
}
