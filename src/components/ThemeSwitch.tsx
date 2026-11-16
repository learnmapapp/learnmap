import { setThemePreference, useTheme, type ThemePreference } from '../theme';
import { Icon, type IconName } from './Icon';

export function ThemeButton({ compact = false }: { compact?: boolean }) {
  const { theme } = useTheme();
  const next = theme === 'dark' ? 'light' : 'dark';
  const label = `Switch to ${next} mode`;
  return (
    <button
      type="button"
      className={compact ? 'icon-btn' : 'dash-link dash-theme'}
      aria-label={label}
      title={label}
      onClick={() => setThemePreference(next)}
    >
      <Icon name={next === 'light' ? 'sun' : 'moon'} size={compact ? 20 : 22} />
      {!compact && <span>{next === 'light' ? 'Light' : 'Dark'}</span>}
    </button>
  );
}

const OPTIONS: { value: ThemePreference; label: string; icon: IconName }[] = [
  { value: 'light', label: 'Light', icon: 'sun' },
  { value: 'dark', label: 'Dark', icon: 'moon' },
  { value: 'system', label: 'System', icon: 'monitor' },
];

export function ThemeChoices() {
  const { preference } = useTheme();
  return (
    <div className="theme-options" role="radiogroup" aria-label="Appearance">
      {OPTIONS.map((option) => (
        <label key={option.value} className="theme-option">
          <input
            type="radio"
            name="appearance"
            value={option.value}
            checked={preference === option.value}
            onChange={() => setThemePreference(option.value)}
          />
          <Icon name={option.icon} size={18} />
          {option.label}
        </label>
      ))}
    </div>
  );
}
