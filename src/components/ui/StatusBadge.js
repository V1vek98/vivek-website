import { Award, Trophy, GraduationCap, Plane } from 'lucide-react';

const iconMap = { award: Award, trophy: Trophy, 'graduation-cap': GraduationCap, plane: Plane };
const colorMap = {
  green: 'bg-green-50 text-green-700 border-green-200',
  blue: 'bg-blue-50 text-blue-700 border-blue-200',
  yellow: 'bg-yellow-50 text-yellow-700 border-yellow-200',
  purple: 'bg-purple-50 text-purple-700 border-purple-200',
  red: 'bg-red-50 text-red-700 border-red-200',
};

export default function StatusBadge({ label, color = 'blue', icon, pulse = false }) {
  const Icon = icon ? iconMap[icon] : null;

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${colorMap[color] || colorMap.blue}`}>
      {pulse && (
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
        </span>
      )}
      {Icon && <Icon size={12} />}
      {label}
    </span>
  );
}
