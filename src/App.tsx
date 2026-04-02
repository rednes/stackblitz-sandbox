import './App.css';

import { css } from '@bprogress/core';
import type { SpinnerPosition } from '@bprogress/react';
import { useProgress } from '@bprogress/react';
import { useCallback, useState } from 'react';

const COLORS = [
  { label: 'Blue', value: '#0A2FFF' },
  { label: 'Green', value: '#22c55e' },
  { label: 'Pink', value: '#ec4899' },
  { label: 'Orange', value: '#f97316' },
];

const HEIGHTS = ['2px', '3px', '4px', '6px'];

const SPEEDS = [
  { label: 'Slow', value: 800 },
  { label: 'Normal', value: 400 },
  { label: 'Fast', value: 200 },
];

const EASINGS = [
  { label: 'linear', value: 'linear' },
  { label: 'ease', value: 'ease' },
  { label: 'ease-in-out', value: 'ease-in-out' },
  { label: 'cubic-bezier', value: 'cubic-bezier(0.34, 1.56, 0.64, 1)' },
];

const SPINNER_POSITIONS: SpinnerPosition[] = [
  'top-right',
  'top-left',
  'bottom-right',
  'bottom-left',
];

const TRICKLE_SPEEDS = [
  { label: 'Fast', value: 100 },
  { label: 'Normal', value: 200 },
  { label: 'Slow', value: 500 },
];

const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

function applyProgressCss(
  color: string,
  height: string,
  spinnerPosition: SpinnerPosition
) {
  const id = 'bprogress-custom';
  let el = document.getElementById(id) as HTMLStyleElement | null;
  if (!el) {
    el = document.createElement('style');
    el.id = id;
    document.head.appendChild(el);
  }
  el.textContent = css({ color, height, spinnerPosition });
}

const INITIAL_COLOR: string = '#0A2FFF';
const INITIAL_HEIGHT: string = '3px';
const INITIAL_SPINNER_POS: SpinnerPosition = 'top-right';

// Apply CSS on module load (before first render)
applyProgressCss(INITIAL_COLOR, INITIAL_HEIGHT, INITIAL_SPINNER_POS);

const DIRECTION_OPTIONS = ['ltr', 'rtl'] as const;

// rendering-hoist-jsx: static JSX hoisted outside component to avoid re-creation
const appHeader = (
  <header className="header">
    <h1>@bprogress/react</h1>
    <p className="subtitle">progress bar demo</p>
  </header>
);
const controlsTitle = <h3 className="col-title">Controls</h3>;
const designTitle = <h3 className="col-title">Design</h3>;
const fetchDescription = <p className="description">start → 2s → stop</p>;

function App() {
  const { start, stop, pause, resume, setOptions } = useProgress();
  const [isFetching, setIsFetching] = useState(false);

  const [color, setColor] = useState(INITIAL_COLOR);
  const [height, setHeight] = useState(INITIAL_HEIGHT);
  const [speed, setSpeed] = useState(200);
  const [easing, setEasing] = useState('linear');
  const [showSpinner, setShowSpinner] = useState(true);
  const [spinnerPos, setSpinnerPos] =
    useState<SpinnerPosition>(INITIAL_SPINNER_POS);
  const [direction, setDirection] = useState<'ltr' | 'rtl'>('ltr');
  const [trickle, setTrickle] = useState(true);
  const [trickleSpeed, setTrickleSpeed] = useState(200);

  const handleColorChange = useCallback(
    (c: string) => {
      setColor(c);
      applyProgressCss(c, height, spinnerPos);
    },
    [height, spinnerPos]
  );

  const handleHeightChange = useCallback(
    (h: string) => {
      setHeight(h);
      applyProgressCss(color, h, spinnerPos);
    },
    [color, spinnerPos]
  );

  const handleSpeedChange = useCallback(
    (s: number) => {
      setSpeed(s);
      setOptions({ speed: s });
    },
    [setOptions]
  );

  const handleEasingChange = useCallback(
    (e: string) => {
      setEasing(e);
      setOptions({ easing: e });
    },
    [setOptions]
  );

  const handleSpinnerToggle = useCallback(() => {
    setShowSpinner((prev) => {
      setOptions({ showSpinner: !prev });
      return !prev;
    });
  }, [setOptions]);

  const handleSpinnerPosChange = useCallback(
    (pos: SpinnerPosition) => {
      setSpinnerPos(pos);
      applyProgressCss(color, height, pos);
    },
    [color, height]
  );

  const handleDirectionChange = useCallback(
    (d: 'ltr' | 'rtl') => {
      setDirection(d);
      setOptions({ direction: d });
    },
    [setOptions]
  );

  const handleTrickleToggle = useCallback(() => {
    setTrickle((prev) => {
      setOptions({ trickle: !prev });
      return !prev;
    });
  }, [setOptions]);

  const handleTrickleSpeedChange = useCallback(
    (s: number) => {
      setTrickleSpeed(s);
      setOptions({ trickleSpeed: s });
    },
    [setOptions]
  );

  const simulateFetch = useCallback(async () => {
    setIsFetching(true);
    start();
    await sleep(2000);
    stop();
    setIsFetching(false);
  }, [start, stop]);

  return (
    <div className="layout">
      {appHeader}

      <div className="columns">
        {/* --- Left: Controls --- */}
        <div className="col">
          {controlsTitle}

          <section>
            <h2>Basic controls</h2>
            <div className="btn-row">
              <button type="button" onClick={() => start()}>
                start()
              </button>
              <button type="button" onClick={() => stop()}>
                stop()
              </button>
              <button type="button" onClick={() => pause()}>
                pause()
              </button>
              <button type="button" onClick={() => resume()}>
                resume()
              </button>
            </div>
          </section>

          <section>
            <h2>Simulated fetch</h2>
            {fetchDescription}
            <button type="button" onClick={simulateFetch} disabled={isFetching}>
              {isFetching ? 'Loading…' : 'Fetch data'}
            </button>
          </section>
        </div>

        {/* --- Right: Design --- */}
        <div className="col">
          {designTitle}

          <section>
            <h2>Color</h2>
            <div className="btn-row">
              {COLORS.map((c) => (
                <button
                  key={c.value}
                  type="button"
                  className={`color-btn${color === c.value ? ' active' : ''}`}
                  style={{ '--c': c.value } as React.CSSProperties}
                  onClick={() => handleColorChange(c.value)}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </section>

          <section>
            <h2>Height</h2>
            <div className="btn-row">
              {HEIGHTS.map((h) => (
                <button
                  key={h}
                  type="button"
                  className={`seg-btn${height === h ? ' active' : ''}`}
                  onClick={() => handleHeightChange(h)}
                >
                  {h}
                </button>
              ))}
            </div>
          </section>

          <section>
            <h2>Speed</h2>
            <div className="btn-row">
              {SPEEDS.map((s) => (
                <button
                  key={s.value}
                  type="button"
                  className={`seg-btn${speed === s.value ? ' active' : ''}`}
                  onClick={() => handleSpeedChange(s.value)}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </section>

          <section>
            <h2>Easing</h2>
            <div className="btn-row">
              {EASINGS.map((e) => (
                <button
                  key={e.value}
                  type="button"
                  className={`seg-btn${easing === e.value ? ' active' : ''}`}
                  onClick={() => handleEasingChange(e.value)}
                >
                  {e.label}
                </button>
              ))}
            </div>
          </section>

          <section>
            <h2>Spinner</h2>
            <div className="btn-row">
              <button
                type="button"
                className={`toggle-btn${showSpinner ? ' on' : ''}`}
                onClick={handleSpinnerToggle}
              >
                <span className="toggle-track">
                  <span className="toggle-thumb" />
                </span>
                <span className="toggle-label">
                  {showSpinner ? 'ON' : 'OFF'}
                </span>
              </button>
              {SPINNER_POSITIONS.map((pos) => (
                <button
                  key={pos}
                  type="button"
                  className={`seg-btn${spinnerPos === pos ? ' active' : ''}`}
                  disabled={!showSpinner}
                  onClick={() => handleSpinnerPosChange(pos)}
                >
                  {pos}
                </button>
              ))}
            </div>
          </section>

          <section>
            <h2>Direction</h2>
            <div className="btn-row">
              {DIRECTION_OPTIONS.map((d) => (
                <button
                  key={d}
                  type="button"
                  className={`seg-btn${direction === d ? ' active' : ''}`}
                  onClick={() => handleDirectionChange(d)}
                >
                  {d.toUpperCase()}
                </button>
              ))}
            </div>
          </section>

          <section>
            <h2>Trickle</h2>
            <div className="btn-row">
              <button
                type="button"
                className={`toggle-btn${trickle ? ' on' : ''}`}
                onClick={handleTrickleToggle}
              >
                <span className="toggle-track">
                  <span className="toggle-thumb" />
                </span>
                <span className="toggle-label">{trickle ? 'ON' : 'OFF'}</span>
              </button>
              {TRICKLE_SPEEDS.map((s) => (
                <button
                  key={s.value}
                  type="button"
                  className={`seg-btn${trickleSpeed === s.value ? ' active' : ''}`}
                  disabled={!trickle}
                  onClick={() => handleTrickleSpeedChange(s.value)}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default App;
