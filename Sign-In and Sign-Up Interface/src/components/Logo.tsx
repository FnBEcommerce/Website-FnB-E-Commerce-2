interface LogoProps {
  light?: boolean;
}

export function Logo({ light = false }: LogoProps) {
  const color = light ? "text-white" : "text-teal-500";
  
  return (
    <div className="flex items-center gap-2">
      <div className={`w-10 h-10 border-2 ${light ? "border-white" : "border-teal-500"} rounded flex items-center justify-center`}>
        <div className={`grid grid-cols-2 gap-0.5`}>
          <div className={`w-2 h-2 ${light ? "bg-white" : "bg-teal-500"} rounded-sm`}></div>
          <div className={`w-2 h-2 ${light ? "bg-white" : "bg-teal-500"} rounded-sm`}></div>
          <div className={`w-2 h-2 ${light ? "bg-white" : "bg-teal-500"} rounded-sm`}></div>
          <div className={`w-2 h-2 ${light ? "bg-white" : "bg-teal-500"} rounded-sm`}></div>
        </div>
      </div>
      <span className={color}>Diprella</span>
    </div>
  );
}
