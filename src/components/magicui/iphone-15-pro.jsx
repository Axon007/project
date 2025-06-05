export default function Iphone15Pro({
  width = 433,
  height = 882,
  src,
  videoSrc,
  className,
  scale = 1,
  alt = "iPhone 15 Pro mockup",
  children,
  ...props
}) {
  // Calculate dimensions based on scale
  const scaledWidth = width * scale;
  const scaledHeight = height * scale;
  
  return (
    <div className="relative">
      {/* Image overlay for reflection effect */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden rounded-[70px] opacity-50 mix-blend-soft-light">
        <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-white/20 animate-subtle-pulse"></div>
      </div>
      
      <svg
        width={scaledWidth}
        height={scaledHeight}
        viewBox={`0 0 ${width} ${height}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        {...props}
      >      
        <path
          d="M2 73C2 32.6832 34.6832 0 75 0H357C397.317 0 430 32.6832 430 73V809C430 849.317 397.317 882 357 882H75C34.6832 882 2 849.317 2 809V73Z"
          className="fill-black" 
        />
        
        <path
          d="M0 171C0 170.448 0.447715 170 1 170H3V204H1C0.447715 204 0 203.552 0 203V171Z"
          className="fill-black" 
        />
        
        <path
          d="M1 234C1 233.448 1.44772 233 2 233H3.5V300H2C1.44772 300 1 299.552 1 299V234Z"
          className="fill-black" 
        />
        
        <path
          d="M1 319C1 318.448 1.44772 318 2 318H3.5V385H2C1.44772 385 1 384.552 1 384V319Z"
          className="fill-black" 
        />
        
        <path
          d="M430 279H432C432.552 279 433 279.448 433 280V384C433 384.552 432.552 385 432 385H430V279Z"
          className="fill-black" 
        />
        
        <path
          d="M6 74C6 35.3401 37.3401 4 76 4H356C394.66 4 426 35.3401 426 74V808C426 846.66 394.66 878 356 878H76C37.3401 878 6 846.66 6 808V74Z"
          className="fill-gray-100 dark:fill-gray-900" 
        />
        
        <path
          opacity="0.5"
          d="M174 5H258V5.5C258 6.60457 257.105 7.5 256 7.5H176C174.895 7.5 174 6.60457 174 5.5V5Z"
          className="fill-black" 
        />
        
        <path
          d="M21.25 75C21.25 44.2101 46.2101 19.25 77 19.25H355C385.79 19.25 410.75 44.2101 410.75 75V807C410.75 837.79 385.79 862.75 355 862.75H77C46.2101 862.75 21.25 837.79 21.25 807V75Z"
          className="fill-transparent stroke-black stroke-[0.5]" 
        />

        {/* Screen Content */}
        {src ? (
          <foreignObject x="21.25" y="19.25" width="389.5" height="843.5">
            <div className="size-full overflow-hidden rounded-[55.75px] bg-white dark:bg-black">
              <img 
                src={src} 
                alt={alt} 
                className="w-full h-full object-cover"
                style={{
                  borderRadius: '55.75px',
                }}
              />
            </div>
          </foreignObject>
        ) : videoSrc ? (
          <foreignObject x="21.25" y="19.25" width="389.5" height="843.5">
            <video
              className="size-full overflow-hidden rounded-[55.75px] object-cover"
              src={videoSrc}
              autoPlay
              loop
              muted
              playsInline 
            />
          </foreignObject>
        ) : (
          <foreignObject x="21.25" y="19.25" width="389.5" height="843.5">
            <div className="size-full overflow-hidden rounded-[55.75px] bg-white dark:bg-gray-900 flex items-center justify-center">
              {children || (
                <div className="flex flex-col items-center justify-center text-center p-8">
                  <div className="w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500"><path d="M12 20h9"></path><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"></path></svg>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">No content provided</p>
                </div>
              )}
            </div>
          </foreignObject>
        )}

        {/* Notch */}
        <path
          d="M154 48.5C154 38.2827 162.283 30 172.5 30H259.5C269.717 30 278 38.2827 278 48.5C278 58.7173 269.717 67 259.5 67H172.5C162.283 67 154 58.7173 154 48.5Z"
          className="fill-black" 
        />
        
        <path
          d="M249 48.5C249 42.701 253.701 38 259.5 38C265.299 38 270 42.701 270 48.5C270 54.299 265.299 59 259.5 59C253.701 59 249 54.299 249 48.5Z"
          className="fill-black" 
        />
        
        <path
          d="M254 48.5C254 45.4624 256.462 43 259.5 43C262.538 43 265 45.4624 265 48.5C265 51.5376 262.538 54 259.5 54C256.462 54 254 51.5376 254 48.5Z"
          className="fill-gray-800" 
        />
        
        <defs>
          <clipPath id="roundedCorners">
            <rect x="21.25" y="19.25" width="389.5" height="843.5" rx="55.75" ry="55.75" />
          </clipPath>
        </defs>
        
        <rect x="21.25" y="19.25" width="389.5" height="843.5" rx="55.75" ry="55.75" 
              className="fill-transparent stroke-black stroke-[1]" />

        {/* Dynamic island */}
        <path
          d="M196 48.5C196 42.701 200.701 38 206.5 38H226.5C232.299 38 237 42.701 237 48.5C237 54.299 232.299 59 226.5 59H206.5C200.701 59 196 54.299 196 48.5Z"
          className="fill-black" 
        />
      </svg>
      
      {/* Pass children outside the SVG for flexibility */}
      {children && <div className="absolute inset-0 pointer-events-none z-20">{children}</div>}
    </div>
  );
}
