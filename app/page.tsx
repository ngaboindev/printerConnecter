import ConnectBluetooth from '@/components/ConnectBluetooth';

export default function Home() {
  return (
    <div className="font-sans max-w-xl mx-auto py-3">
      <h3 className="text-xl uppercase py-5">
        Connect to Nearby bluetooth printer
      </h3>
      <ConnectBluetooth />
    </div>
  );
}
