import { useEffect, useRef } from 'react';

export default function Toast({ message, type, visible }) {
  return (
    <div className={`toast toast-${type}${visible ? ' toast-visible' : ''}`}>
      {message}
    </div>
  );
}
