import React from 'react';
import StrobeScreen from '../strobe';

export default function ManualStrobeScreen() {
  return (
    <StrobeScreen autoStart={false} />
  );
}