'use client';

import { useState } from 'react';

const ConnectBluetooth = () => {
  const [bluetoothDevice, setBluetoothDevice] = useState(null);

  const connectToBluetooth = async () => {
    try {
      //@ts-ignore
      const device = await navigator.bluetooth.requestDevice({
        acceptAllDevices: true,
        optionalServices: ['00001801-0000-1000-8000-00805f9b34fb'], // GATT service UUID
      });

      setBluetoothDevice(device);
      console.log('Connected to Bluetooth printer');
    } catch (error) {
      console.error('Error connecting to Bluetooth device:', error);
    }
  };

  const sendPDF = async () => {
    if (!bluetoothDevice) {
      console.error('Bluetooth device not connected');
      return;
    }

    try {
      const response = await fetch('example.pdf'); // Replace with your file path or URL
      const pdfData = await response.arrayBuffer();
      //@ts-ignore
      await bluetoothDevice.gatt.writeCharacteristic(
        '00001802-0000-1000-8000-00805f9b34fb',
        pdfData
      );

      console.log('PDF sent for printing');
    } catch (error) {
      console.error('Error sending PDF for printing:', error);
    }
  };

  const startPrintingProcess = async () => {
    try {
      await connectToBluetooth();
      await sendPDF();
    } catch (error) {
      console.error('Printing process failed:', error);
    }
  };

  return (
    <div>
      <button
        type="button"
        onClick={startPrintingProcess}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        Connect & Print
      </button>
    </div>
  );
};

export default ConnectBluetooth;
