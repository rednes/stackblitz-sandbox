import { type JSX, useState } from 'react';

import { Icon } from './icons/icon.tsx';

interface Props {
  mode?: 'light' | 'dark';
  variant?: 'default' | 'outline';
  lang?: 'japanese' | 'english';
}

export default function LoginIcon({
  mode = 'light',
  variant = 'default',
  lang = 'japanese',
}: Props): JSX.Element {
  const [hover, setHover] = useState<boolean>(false);

  return (
    <button
      type="button"
      style={{ backgroundColor: '#0017C1', color: '#FFFFFF' }}
      onMouseEnter={() => setHover(true)}
    >
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          columnGap: '3px',
        }}
      >
        <Icon color="#FFFFFF" />
        <p style={{ fontSize: '16px' }}>hoge</p>
      </div>
    </button>
  );
}
