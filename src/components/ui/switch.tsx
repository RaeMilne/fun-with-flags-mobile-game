"use client";

import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"
import "./switch.css"

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => {
  React.useEffect(() => {
    // Debug: Log the actual DOM structure
    const switchElement = document.querySelector('[role="switch"]');
    if (switchElement) {
      console.log('Switch element found:', switchElement);
      console.log('Switch attributes:', switchElement.getAttributeNames());
      console.log('Switch data-state:', switchElement.getAttribute('data-state'));
      
      const thumb = switchElement.querySelector('span');
      if (thumb) {
        console.log('Thumb element found:', thumb);
        console.log('Thumb attributes:', thumb.getAttributeNames());
      }
    }
  }, []);

  return (
    <SwitchPrimitives.Root
      className="peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-0 transition-all duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:cursor-not-allowed disabled:opacity-50"
      style={{
        backgroundColor: 'var(--switch-bg, #d1d5db)',
        height: '24px',
        width: '44px',
        borderRadius: '9999px',
        border: 'none',
        transition: 'background-color 0.3s ease-in-out',
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        cursor: 'pointer',
      }}
      {...props}
      ref={ref}
    >
      <SwitchPrimitives.Thumb
        className="pointer-events-none block h-5 w-5 rounded-full bg-white shadow-md ring-0 transition-all duration-300 ease-in-out"
        style={{
          height: '20px',
          width: '20px',
          borderRadius: '50%',
          backgroundColor: 'white',
          boxShadow: '0 2px 4px -1px rgba(0, 0, 0, 0.1)',
          transition: 'transform 0.3s ease-in-out',
          transform: 'translateX(2px)',
          pointerEvents: 'none',
          display: 'block',
        }}
      />
    </SwitchPrimitives.Root>
  );
})
Switch.displayName = SwitchPrimitives.Root.displayName

export default Switch
