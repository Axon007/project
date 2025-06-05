import { CSSProperties } from 'react';

export default function Android({
  width = 280,
  height = 560,
  screenshotUrl,
  src,
  className = '',
  scale = 1,
  alt = "Android smartphone mockup",
  children,
  ...props
}) {
  // Calculate dimensions based on scale
  const scaledWidth = width * scale;
  const scaledHeight = height * scale;
  
  // Use either screenshotUrl or src (for backward compatibility)
  const imageUrl = screenshotUrl || src;

  // Define the container styles
  const containerStyle = {
    width: scaledWidth,
    height: scaledHeight,
    position: 'relative',
    borderRadius: 40,
    overflow: 'hidden',
    border: '10px solid #111',
    backgroundColor: '#111',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  };

  // Define the screen styles
  const screenStyle = {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    overflow: 'hidden',
    position: 'relative',
    borderRadius: 30,
  };

  // Define the notch styles
  const notchStyle = {
    width: '60px',
    height: '20px',
    backgroundColor: '#111',
    position: 'absolute',
    top: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    borderBottomLeftRadius: '10px',
    borderBottomRightRadius: '10px',
    zIndex: 10,
  };

  // Define status bar styles
  const statusBarStyle = {
    width: '100%',
    height: '25px',
    backgroundColor: 'rgba(0,0,0,0.1)',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 5,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: '0 10px',
  };
  
  // Define button styles
  const powerButtonStyle = {
    width: '4px',
    height: '40px',
    backgroundColor: '#222',
    position: 'absolute',
    right: '-14px',
    top: '90px',
    borderTopRightRadius: '2px',
    borderBottomRightRadius: '2px',
  };
  
  const volumeButtonsStyle = {
    width: '4px',
    height: '80px',
    backgroundColor: '#222',
    position: 'absolute',
    left: '-14px',
    top: '100px',
    borderTopLeftRadius: '2px',
    borderBottomLeftRadius: '2px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  };
  
  const volumeUpButtonStyle = {
    width: '4px',
    height: '35px',
    backgroundColor: '#222',
    borderRadius: '2px',
  };
  
  const volumeDownButtonStyle = {
    width: '4px',
    height: '35px',
    backgroundColor: '#222',
    borderRadius: '2px',
  };
  
  // Define bottom nav styles
  const bottomNavStyle = {
    width: '100%',
    height: '40px',
    backgroundColor: 'rgba(0,0,0,0.1)',
    position: 'absolute',
    bottom: 0,
    left: 0,
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    zIndex: 5,
  };
  
  const navButtonStyle = {
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    backgroundColor: 'rgba(0,0,0,0.2)',
  };

  return (
    <div className={`android-mockup ${className}`} style={containerStyle} {...props}>
      {/* Power button */}
      <div style={powerButtonStyle}></div>
      
      {/* Volume buttons */}
      <div style={volumeButtonsStyle}>
        <div style={volumeUpButtonStyle}></div>
        <div style={volumeDownButtonStyle}></div>
      </div>
      
      {/* Screen */}
      <div style={screenStyle} className="dark:bg-gray-900">
        {/* Notch */}
        <div style={notchStyle}></div>
        
        {/* Status bar */}
        <div style={statusBarStyle} className="dark:bg-black/30">
          <div className="flex gap-1 mr-1">
            <div className="w-2 h-2 rounded-full bg-gray-600"></div>
            <div className="w-2 h-2 rounded-full bg-gray-600"></div>
            <div className="w-2 h-2 rounded-full bg-gray-600"></div>
          </div>
        </div>
        
        {/* Screenshot or content */}
        {imageUrl ? (
          <div className="h-full w-full pt-[25px] pb-[40px]">
            <img 
              src={imageUrl} 
              alt={alt} 
              className="w-full h-full object-cover"
            />
          </div>
        ) : children ? (
          <div className="h-full w-full pt-[25px] pb-[40px]">
            {children}
          </div>
        ) : (
          <div className="h-full w-full pt-[25px] pb-[40px] flex items-center justify-center">
            <div className="flex flex-col items-center justify-center text-center p-8">
              <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
                  <path d="M5 19a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1 7 7 0 0 0-7-7h0a7 7 0 0 0-7 7Z"></path>
                  <path d="M5 5a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1 7 7 0 0 1-7 7h0a7 7 0 0 1-7-7Z"></path>
                </svg>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Android content</p>
            </div>
          </div>
        )}
        
        {/* Bottom navigation */}
        <div style={bottomNavStyle} className="dark:bg-black/30">
          <div className="w-6 h-1 rounded-full bg-gray-600"></div>
        </div>
      </div>
      
      {/* Child elements overlay */}
      {children && imageUrl && (
        <div className="absolute inset-0 pointer-events-none z-20">{children}</div>
      )}
    </div>
  );
}
