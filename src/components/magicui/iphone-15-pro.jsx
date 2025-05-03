import React from "react";

export const Iphone15Pro = ({
  width = 433,
  height = 882,
  src,
  videoSrc,
  className,
  ...props
}) => {
  return (
    <div
      style={{
        width,
        height,
        position: "relative",
      }}
      className={className}
    >
      <svg
        width={width}
        height={height}
        viewBox="0 0 433 882"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <rect
          x="0.5"
          y="0.5"
          width="432"
          height="881"
          rx="72.5"
          fill="black"
          stroke="rgb(var(--color-ring))"
        />
        <rect
          x="16.5"
          y="16.5"
          width="400"
          height="849"
          rx="56.5"
          stroke="black"
        />
        <path
          d="M16 74C16 42.567 41.567 17 73 17H360C391.433 17 417 42.567 417 74V808C417 839.433 391.433 865 360 865H73C41.567 865 16 839.433 16 808V74Z"
          fill="black"
        />
        {src && (
          <foreignObject
            x="16"
            y="74"
            width="401"
            height="734"
            clipPath="inset(0% 0% 0% 0% round 40px)"
          >
            <img
              src={src}
              alt="App screenshot"
              className="w-full h-full object-cover"
            />
          </foreignObject>
        )}
        {videoSrc && (
          <foreignObject
            x="16"
            y="74"
            width="401"
            height="734"
            clipPath="inset(0% 0% 0% 0% round 40px)"
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              src={videoSrc}
              className="w-full h-full object-cover"
            />
          </foreignObject>
        )}
        <path
          d="M174 56C174 53.7909 175.791 52 178 52H255C257.209 52 259 53.7909 259 56V56C259 58.2091 257.209 60 255 60H178C175.791 60 174 58.2091 174 56V56Z"
          fill="#141414"
        />
        <rect x="194" y="34" width="45" height="9" rx="4.5" fill="#141414" />
        <circle cx="255" cy="43" r="8" fill="#141414" />
      </svg>
    </div>
  );
};