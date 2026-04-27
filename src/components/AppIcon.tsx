interface AppIconProps {
  letter: string;
  color: string;
  size?: number;
}

export const AppIcon = ({ letter, color, size = 40 }: AppIconProps) => {
  return (
    <div
      className="flex items-center justify-center rounded-xl font-display font-bold text-white shrink-0 shadow-soft"
      style={{
        width: size,
        height: size,
        background: `linear-gradient(135deg, ${color}, ${color}dd)`,
        fontSize: size * 0.42,
      }}
      aria-hidden="true"
    >
      {letter}
    </div>
  );
};
