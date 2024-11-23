import React from 'react';
import { StatusBar } from 'expo-status-bar';
import Navigation from './src/navigations/navigation';

export default function App() {
  return (
    <>
      {/* Render the Setup1 screen */}
      <Navigation />
      <StatusBar style="auto" />
    </>
  );
}