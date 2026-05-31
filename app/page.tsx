'use client';

import { useState, ChangeEvent } from 'react';
import dynamic from 'next/dynamic';

const Map = dynamic(() => import('../components/Map'), { ssr: false });

export default function Page() {
  const [flightData, setFlightData] = useState<any>(null);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const text = await file.text();
    setFlightData({ raw: text });
  };

  return (
    <main>
      <h1>Flight Visualizer</h1>
      <input type="file" accept=".igc,.gpx,.kml" onChange={handleFileChange} />
      <Map flightData={flightData} />
    </main>
  );
}
