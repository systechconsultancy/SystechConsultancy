export default function PasswordStrengthMeter ({ score }){
  const strength = {
    0: { text: 'Weak', color: 'bg-red-500' },
    1: { text: 'Fair', color: 'bg-orange-500' },
    2: { text: 'Good', color: 'bg-yellow-500' },
    3: { text: 'Strong', color: 'bg-lime-500' },
    4: { text: 'Very Strong', color: 'bg-green-500' },
  };

  return (
    <div>
      <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
        <div className={`h-2 rounded-full ${strength[score].color} transition-all`} style={{ width: `${(score + 1) * 20}%` }}></div>
      </div>
      <p className="text-xs text-right mt-1 text-gray-500">{strength[score].text}</p>
    </div>
  );
};